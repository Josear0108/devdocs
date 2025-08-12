import React, { useState, useMemo, useEffect, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { PlaygroundConfig, PlaygroundControl, ControlValue } from '../../types/component';
import { PlaygroundControlFactory } from './PlaygroundControlFactory';
import { ControlRenderer } from './ControlRenderer';
import { CSSControlRenderer } from './CSSControlRenderer';
import { PlaygroundTabs } from './PlaygroundTabs';
import { CopyButton } from '../ui/CopyButton';

interface UniversalPlaygroundProps {
  config: PlaygroundConfig;
  onPropsChange?: (props: Record<string, unknown>) => void;
  externalProps?: Record<string, unknown>;
}

// Función genérica para procesar props con enums
const processEnumProps = (props: Record<string, unknown>, enumConfigs: PlaygroundConfig['enumConfigs']) => {
  if (!enumConfigs || enumConfigs.length === 0) {
    return props;
  }

  const processed = { ...props };
  
  enumConfigs.forEach(enumConfig => {
    const { prop, enumObject, conversionMap } = enumConfig;
    const propValue = processed[prop];
    
    if (!propValue) return;
    
    // Si es un array (para enabledOptions), convertir cada elemento
    if (Array.isArray(propValue)) {
      processed[prop] = propValue.map((item: string) => {
        if (typeof item === 'string' && conversionMap?.[item]) {
          const enumKey = conversionMap[item];
          const convertedValue = enumObject[enumKey];
          return convertedValue;
        }
        return item;
      });
    }
    
    // Si es un string con comas (desde select-check), convertir a array y luego procesar
    else if (typeof propValue === 'string' && propValue.includes(',')) {
      const itemsArray = propValue.split(',').map(item => item.trim()).filter(Boolean);
      processed[prop] = itemsArray.map((item: string) => {
        if (conversionMap?.[item]) {
          const enumKey = conversionMap[item];
          const convertedValue = enumObject[enumKey];
          return convertedValue;
        }
        return item;
      });
    }
    
    // Si es un string simple, convertir a valor enum
    else if (typeof propValue === 'string') {
      if (conversionMap?.[propValue]) {
        const enumKey = conversionMap[propValue];
        processed[prop] = enumObject[enumKey];
      }
    }
  });
  
  return processed;
};

export const UniversalPlayground: React.FC<UniversalPlaygroundProps> = ({ 
  config,
  onPropsChange,
  externalProps 
}) => {
  const { 
    component: Component, 
    componentName,
    groups = [], 
    mockData = {}, 
    excludeProps = [], 
    customControls = {},
    cssControls = [],
    enumConfigs = [] // Nueva propiedad para configuración de enums
  } = config;

  // Ref para la función callback para evitar recreaciones innecesarias
  const onPropsChangeRef = useRef(onPropsChange);
  onPropsChangeRef.current = onPropsChange;

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

  // Aplicar props externas cuando cambien (para recipes)
  useEffect(() => {
    if (externalProps && Object.keys(externalProps).length > 0) {
      setProps(currentProps => {
        const newProps = { ...currentProps, ...externalProps };
        onPropsChangeRef.current?.(newProps);
        return newProps;
      });
    }
  }, [externalProps]);

  // Actualizar prop y notificar cambios
  const updateProp = (propName: string, value: ControlValue | null) => {
    const newProps = { ...props };
    
    if (value === null || value === '' || value === undefined) {
      delete newProps[propName];
    } else if (propName === 'acceptedFileTypes') {
      // Manejar tanto strings (desde controles) como arrays (desde recipes)
      if (typeof value === 'string') {
        newProps[propName] = value.split(',').map(ext => ext.trim());
      } else if (Array.isArray(value)) {
        newProps[propName] = value; // Ya es un array, usarlo directamente
      } else {
        newProps[propName] = value;
      }
    } else if (propName === 'enabledOptions') {
      // Para enabledOptions, mantener como array para que SelectCheck funcione correctamente
      if (Array.isArray(value)) {
        newProps[propName] = value; // Mantener como array
      } else if (typeof value === 'string') {
        // Si viene como string (desde entrada de usuario), convertir a array
        newProps[propName] = value.split(',').map(opt => opt.trim()).filter(Boolean);
      } else {
        newProps[propName] = value;
      }
    } else if (propName === 'mode') {
      // Para mode, mantener como string para que se procese después
      newProps[propName] = value;
    } else if (propName === 'children' && typeof value === 'string') {
      newProps[propName] = value || 'Contenido de ejemplo';
    } else {
      newProps[propName] = value;
    }
    
    setProps(newProps);
    onPropsChangeRef.current?.(newProps);
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
    if (key === 'enabledOptions') {
      // Si es string con comas, convertir a array
      let optionsArray: string[] = [];
      if (typeof value === 'string') {
        optionsArray = value.split(',').map(opt => opt.trim()).filter(Boolean);
      } else if (Array.isArray(value)) {
        optionsArray = value.map(opt => String(opt));
      }
      
      // Convertir números de enum de vuelta a nombres si es necesario
      const formattedOptions = optionsArray.map(opt => {
        // Si es un número, convertir de vuelta a nombre de enum
        if (/^\d+$/.test(opt)) {
          const enumConfig = enumConfigs?.find(config => config.prop === 'enabledOptions');
          if (enumConfig) {
            // Buscar en el enum object por valor numérico
            const enumEntries = Object.entries(enumConfig.enumObject);
            const matchingEntry = enumEntries.find(([, enumValue]) => String(enumValue) === opt);
            if (matchingEntry) {
              return `PdfViewerOption.${matchingEntry[0]}`;
            }
          }
        }
        // Si ya tiene el formato correcto, mantenerlo
        if (opt.startsWith('PdfViewerOption.')) {
          return opt;
        }
        // Si no tiene el prefijo pero es un nombre válido, agregarlo
        return `PdfViewerOption.${opt}`;
      });
      
      const formattedOptionsString = formattedOptions.map(opt => `       ${opt},`).join('\n');
      return `     ${key}={[\n${formattedOptionsString}\n     ]}`;
    }
    
    if (key === 'mode') {
      let modeValue = String(value);
      // Si es un número, convertir de vuelta a nombre de enum
      if (/^\d+$/.test(modeValue)) {
        const enumConfig = enumConfigs?.find(config => config.prop === 'mode');
        if (enumConfig) {
          const enumEntries = Object.entries(enumConfig.enumObject);
          const matchingEntry = enumEntries.find(([, enumValue]) => String(enumValue) === modeValue);
          if (matchingEntry) {
            modeValue = `PdfViewerMode.${matchingEntry[0]}`;
          }
        }
      }
      // Si ya tiene el formato correcto, mantenerlo
      if (!modeValue.startsWith('PdfViewerMode.')) {
        modeValue = `PdfViewerMode.${modeValue}`;
      }
      return `     ${key}={${modeValue}}`;
    }
    
    if (typeof value === 'string') {
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
      'EdeskFileUpload': 'EdeskFileUpload',
      'EdeskLayout': 'EdeskLayout',
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
    
    // Procesar enums usando configuración genérica
    if (enumConfigs && enumConfigs.length > 0) {
      const processedProps = processEnumProps(merged, enumConfigs);
      Object.assign(merged, processedProps);
    }
    
    // Procesar children especialmente
    if (merged.children && typeof merged.children === 'string' && merged.children.trim()) {
      // Crear un elemento div con el contenido string para componentes que esperan React nodes
      const currentComponentName = Component.displayName || Component.name || '';
      if (currentComponentName === 'EdeskLayout') {
        merged.children = React.createElement('div', {}, merged.children);
      }
    }

    return merged;
  }, [mockData, props, Component, enumConfigs]);

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
            {(() => {
              try {
                const componentName = Component.displayName || Component.name || '';
                
                // Crear una key única basada en las props para forzar re-render
                const componentKey = `${componentName}-${JSON.stringify(finalProps.mode)}-${JSON.stringify(finalProps.enabledOptions)}`;
                
                // Para componentes que no requieren children como prop separada
                if (componentName === 'EdeskViewerPDF' || componentName === 'ViewerPDF' || componentName.includes('ViewerPDF')) {
                  return <Component key={componentKey} {...finalProps} />;
                }
                
                // Para componentes que esperan children como prop separada
                return (
                  <Component key={componentKey} {...finalProps}>
                    {finalProps.children}
                  </Component>
                );
              } catch (error) {
                console.error('[UniversalPlayground] Error al renderizar componente:', error);
                const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
                return (
                  <div style={{ color: 'red', padding: '1rem' }}>
                    Error al renderizar el componente: {errorMessage}
                  </div>
                );
              }
            })()}
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
