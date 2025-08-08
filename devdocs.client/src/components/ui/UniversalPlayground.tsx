import React, { useState, useMemo } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { PlaygroundConfig, PlaygroundControl, ControlValue } from '../../types/component';
import { PlaygroundControlFactory } from '../../lib/PlaygroundControlFactory';
import { ControlRenderer } from './ControlRenderer';
import { CSSControlRenderer } from './CSSControlRenderer';
import { PlaygroundTabs } from './PlaygroundTabs';
import { CopyButton } from './CopyButton';

interface UniversalPlaygroundProps {
  config: PlaygroundConfig;
  onPropsChange?: (props: Record<string, unknown>) => void;
}

export const UniversalPlayground: React.FC<UniversalPlaygroundProps> = ({ 
  config,
  onPropsChange 
}) => {
  const { 
    component: Component, 
    componentName,
    groups = [], 
    mockData = {}, 
    excludeProps = [], 
    customControls = {},
    cssControls = [] 
  } = config;

  // Estados
  const [activeTab, setActiveTab] = useState<'props' | 'css'>('props');
  const [cssVariables, setCssVariables] = useState<Record<string, string>>(() => {
    // Inicializar con valores por defecto de todos los controles CSS
    const initialVars: Record<string, string> = {};
    cssControls.forEach(group => {
      group.controls.forEach(control => {
        initialVars[control.variable] = control.defaultValue;
      });
    });
    return initialVars;
  });

  // Función para calcular variables CSS dependientes automáticamente
  const calculateDependentVariables = (baseVariables: Record<string, string>) => {
    const dependentVars: Record<string, string> = {};
    
    // Si hay un accent color definido, calcular variables dependientes
    const accentColor = baseVariables['--edeskFileUpload-accent'];
    const borderWidth = baseVariables['--edeskFileUpload-border-width'] || '2px';
    
    if (accentColor) {
      dependentVars['--edeskFileUpload-border-dashed'] = `${borderWidth} dashed ${accentColor}`;
      dependentVars['--edeskFileUpload-border-solid'] = `${borderWidth} solid ${accentColor}`;
    }
    
    return { ...baseVariables, ...dependentVars };
  };

  // Generar controles automáticamente si no se proporcionan grupos
  const playgroundGroups = useMemo(() => {
    if (groups.length > 0) return groups;

    // Crear controles basados en props comunes y configuraciones personalizadas
    const componentName = Component.displayName || Component.name || 'Unknown';
    const edeskControls = PlaygroundControlFactory.createEdeskComponentControls(componentName);
    
    // Combinar controles personalizados con los específicos de edesk
    const allCustomControls = { ...edeskControls, ...customControls };
    
    // Crear controles para todas las props personalizadas
    const autoControls: PlaygroundControl[] = Object.keys(allCustomControls)
      .filter(prop => !excludeProps.includes(prop))
      .map(prop => 
        PlaygroundControlFactory.createControl(prop, undefined, allCustomControls[prop])
      );

    // Agrupar controles automáticamente, respetando la configuración explícita
    return PlaygroundControlFactory.groupControlsAutomatically(autoControls, groups);
  }, [Component, groups, customControls, excludeProps]);

  // Estado inicial de props
  const [props, setProps] = useState<Record<string, unknown>>(() => {
    const initialProps = { ...mockData };
    
    // Establecer valores por defecto de los controles
    playgroundGroups.forEach(group => {
      group.controls.forEach(control => {
        if (initialProps[control.prop] === undefined && control.defaultValue !== undefined) {
          initialProps[control.prop] = control.defaultValue;
        }
      });
    });

    return initialProps;
  });

  // Actualizar prop y notificar cambios
  const updateProp = (propName: string, value: ControlValue | null) => {
    const newProps = { ...props };
    
    if (value === null || value === '' || value === undefined) {
      delete newProps[propName];
    } else if (propName === 'acceptedFileTypes' && typeof value === 'string') {
      newProps[propName] = value.split(',').map(ext => ext.trim());
    } else if (propName === 'enabledOptions' && typeof value === 'string') {
      // Para enabledOptions, mantener como string para el código generado pero también crear un array para el componente
      newProps[propName] = value;
    } else if (propName === 'children' && typeof value === 'string') {
      newProps[propName] = value || 'Contenido de ejemplo';
    } else {
      newProps[propName] = value;
    }
    
    setProps(newProps);
    onPropsChange?.(newProps);
  };

  // Filtrar controles basado en condiciones showWhen/enableWhen
  const getVisibleControls = (controls: PlaygroundControl[]) => {
    return controls.filter(control => {
      if (!control.showWhen) return true;
      
      // Si showWhen es un array de condiciones, todas deben cumplirse (AND)
      if (Array.isArray(control.showWhen)) {
        return control.showWhen.every(condition => {
          const currentValue = props[condition.prop];
          const expectedValue = condition.value;
          
          // Si expectedValue es un array, verificar si currentValue está incluido
          if (Array.isArray(expectedValue)) {
            return expectedValue.includes(currentValue as string);
          }
          
          // Comparación directa para valores únicos
          return currentValue === expectedValue;
        });
      }
      
      // Condición única
      const currentValue = props[control.showWhen.prop];
      const expectedValue = control.showWhen.value;
      
      // Si expectedValue es un array, verificar si currentValue está incluido
      if (Array.isArray(expectedValue)) {
        return expectedValue.includes(currentValue as string);
      }
      
      // Comparación directa para valores únicos
      return currentValue === expectedValue;
    });
  };

  const isControlEnabled = (control: PlaygroundControl) => {
    if (!control.enableWhen) return true;
    
    // Si enableWhen es un array de condiciones, todas deben cumplirse (AND)
    if (Array.isArray(control.enableWhen)) {
      return control.enableWhen.every(condition => {
        const currentValue = props[condition.prop];
        const expectedValue = condition.value;
        
        // Si expectedValue es un array, verificar si currentValue está incluido
        if (Array.isArray(expectedValue)) {
          return expectedValue.includes(currentValue as string);
        }
        
        // Comparación directa para valores únicos
        return currentValue === expectedValue;
      });
    }
    
    // Condición única
    const currentValue = props[control.enableWhen.prop];
    const expectedValue = control.enableWhen.value;
    
    // Si expectedValue es un array, verificar si currentValue está incluido
    if (Array.isArray(expectedValue)) {
      return expectedValue.includes(currentValue as string);
    }
    
    // Comparación directa para valores únicos
    return currentValue === expectedValue;
  };

  // Función auxiliar para verificar si una prop debe incluirse en el código generado
  const shouldIncludePropInCode = (propName: string): boolean => {
    // Buscar el control correspondiente a esta prop
    let control: PlaygroundControl | undefined;
    
    for (const group of playgroundGroups) {
      control = group.controls.find((c: PlaygroundControl) => c.prop === propName);
      if (control) break;
    }
    
    // Si no hay control definido, incluir la prop
    if (!control) return true;
    
    // Si el control no tiene condiciones showWhen, incluirlo
    if (!control.showWhen) return true;
    
    // Aplicar la misma lógica de visibilidad que en getVisibleControls
    if (Array.isArray(control.showWhen)) {
      return control.showWhen.every(condition => {
        const currentValue = props[condition.prop];
        const expectedValue = condition.value;
        
        if (Array.isArray(expectedValue)) {
          return expectedValue.includes(currentValue as string);
        }
        
        return currentValue === expectedValue;
      });
    }
    
    // Condición única
    const currentValue = props[control.showWhen.prop];
    const expectedValue = control.showWhen.value;
    
    if (Array.isArray(expectedValue)) {
      return expectedValue.includes(currentValue as string);
    }
    
    return currentValue === expectedValue;
  };

  // Función auxiliar para formatear props del ViewerPDF
  const formatViewerPDFProp = (key: string, value: unknown): string => {
    if (key === 'enabledOptions' && typeof value === 'string') {
      const options = value.split(',').map(opt => opt.trim()).filter(Boolean);
      const formattedOptions = options.map(opt => `       ${opt},`).join('\n');
      return `     ${key}={[\n${formattedOptions}\n     ]}`;
    }
    
    if (typeof value === 'string') {
      // Para props como mode que son enums, no usar comillas
      if (key === 'mode' && value.startsWith('PdfViewerMode.')) {
        return `     ${key}={${value}}`;
      }
      // Para URLs y strings normales
      return `     ${key}={"${value}"}`;
    }
    
    if (typeof value === 'boolean') {
      return value ? `     ${key}` : '';
    }
    
    return `     ${key}={${JSON.stringify(value)}}`;
  };

  // Función auxiliar para formatear props estándar
  const formatStandardProp = (key: string, value: unknown): string => {
    if (typeof value === 'string') {
      return `  ${key}="${value}"`;
    }
    if (typeof value === 'boolean') {
      return value ? `  ${key}` : '';
    }
    if (Array.isArray(value)) {
      return `  ${key}={${JSON.stringify(value)}}`;
    }
    return `  ${key}={${JSON.stringify(value)}}`;
  };

  // Generar código de preview
  const generateCodePreview = (componentName: string, componentProps: Record<string, unknown>): string => {
    // Mapear nombres de componentes para asegurar nombres correctos
    const componentNameMap: Record<string, string> = {
      'Ne': 'EdeskFileUpload',
      'FileUpload': 'EdeskFileUpload',
      'EdeskFileUpload': 'EdeskFileUpload',
      'EdeskLayout': 'EdeskLayout',
      'ViewerPDF': 'EdeskViewerPDF',
      'EdeskViewerPDF': 'EdeskViewerPDF'
    };
    
    const finalComponentName = componentNameMap[componentName] || componentName;
    const isViewerPDF = finalComponentName === 'EdeskViewerPDF';
    
    const propsString = Object.entries(componentProps)
      .filter(([key, value]) => {
        if (value === undefined || value === null || value === '') return false;
        if (!shouldIncludePropInCode(key)) return false;
        return true;
      })
      .map(([key, value]) => {
        return isViewerPDF 
          ? formatViewerPDFProp(key, value)
          : formatStandardProp(key, value);
      })
      .filter(Boolean)
      .join('\n');

    // Formato especial para ViewerPDF
    if (isViewerPDF) {
      return `<${finalComponentName}${propsString ? '\n' + propsString + '\n   ' : ''} />`;
    }
    
    // Formato estándar para otros componentes
    return `<${finalComponentName}${propsString ? '\n' + propsString + '\n' : ''} />`;
  };

  // Preparar props finales para el componente (incluyendo mockData)
  const finalProps = useMemo(() => {
    const merged = { ...mockData, ...props };
    
    // Procesar children especialmente
    if (merged.children && typeof merged.children === 'string' && merged.children.trim()) {
      // Crear un elemento div con el contenido string para componentes que esperan React nodes
      const componentName = Component.displayName || Component.name || '';
      if (componentName === 'EdeskLayout') {
        merged.children = React.createElement('div', {}, merged.children);
      }
    }
    
    return merged;
  }, [mockData, props, Component]);

  // Función para manejar cambios en CSS variables
  const handleCSSVariableChange = (variable: string, value: string) => {
    setCssVariables(prev => {
      const updated = {
        ...prev,
        [variable]: value
      };
      // Calcular variables dependientes automáticamente
      return calculateDependentVariables(updated);
    });
  };

  // Generar el style object para aplicar CSS variables
  const previewStyle = useMemo(() => {
    const style: Record<string, string> = {};
    const finalVariables = calculateDependentVariables(cssVariables);
    Object.entries(finalVariables).forEach(([variable, value]) => {
      style[variable] = value;
    });
    return style;
  }, [cssVariables]);

  return (
    <div className="universal-playground">
      <div className="playground-layout">
        {/* Panel de Controles con Tabs */}
        <div className="playground-controls">
          <PlaygroundTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            propsContent={
              <div className="props-controls">
                {playgroundGroups.map(group => {
                  const visibleControls = getVisibleControls(group.controls);
                  if (visibleControls.length === 0) return null;

                  return (
                    <div key={group.id} className="control-group">
                      {group.label && (
                        <h4 className="group-title">{group.label}</h4>
                      )}
                      {group.description && (
                        <p className="group-description">{group.description}</p>
                      )}
                      
                      <div className="controls-list">
                        {visibleControls.map(control => (
                          <ControlRenderer
                            key={control.prop}
                            control={control}
                            value={props[control.prop] as ControlValue}
                            onChange={(value) => updateProp(control.prop, value)}
                            disabled={!isControlEnabled(control)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            }
            cssContent={
              <div className="css-controls">
                {cssControls && cssControls.length > 0 ? (
                  cssControls.map(group => (
                    <CSSControlRenderer
                      key={group.id}
                      group={group}
                      values={cssVariables}
                      onChange={handleCSSVariableChange}
                      componentProps={props}
                    />
                  ))
                ) : (
                  <div className="no-css-controls">
                    <p>No hay controles CSS configurados para este componente.</p>
                    <p>Puedes agregar controles CSS en la configuración del playground.</p>
                  </div>
                )}
              </div>
            }
          />
        </div>

        {/* Panel de Preview */}
        <div className="playground-preview">
          <div className="preview-header">
            <h3>Vista Previa</h3>
          </div>
          
          <div className="preview-container" style={previewStyle}>
            <Component {...finalProps}>
              {finalProps.children}
            </Component>
          </div>
          
          <div className="code-preview">
            <div className="code-header">
              <h4>Código Generado</h4>
              <CopyButton 
                text={generateCodePreview(
                  componentName || Component.displayName || Component.name || 'Component', 
                  finalProps
                )}
              />
            </div>
            <div className="code-block-wrapper">
              <SyntaxHighlighter
                language="jsx"
                style={atomOneDark}
                showLineNumbers
                wrapLongLines
                customStyle={{
                  background: '#282c34',
                  borderRadius: '6px',
                  padding: '1rem'
                }}
              >
                {generateCodePreview(
                  componentName || Component.displayName || Component.name || 'Component', 
                  finalProps
                )}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
