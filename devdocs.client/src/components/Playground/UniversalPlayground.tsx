import React, { useState, useMemo, useEffect, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { PlaygroundConfig, PlaygroundControl, ControlValue } from '../../types/component';
import { PlaygroundControlFactory } from './PlaygroundControlFactory';
import { ControlRenderer } from './ControlRenderer';
import { CSSControlRenderer } from './CSSControlRenderer';
import { PlaygroundTabs } from './PlaygroundTabs';
import { CopyButton } from '../ui/CopyButton';
import { PdfViewerMode, PdfViewerOption } from 'edesk-components';

// Debug: verificar que los enums se importen correctamente
console.log('[UniversalPlayground] PdfViewerMode:', PdfViewerMode);
console.log('[UniversalPlayground] PdfViewerOption:', PdfViewerOption);

interface UniversalPlaygroundProps {
  config: PlaygroundConfig;
  onPropsChange?: (props: Record<string, unknown>) => void;
  externalProps?: Record<string, unknown>;
}

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
    cssControls = [] 
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

    console.log('🎯 [UniversalPlayground] Props iniciales:', initialProps);
    return initialProps;
  });

  // Aplicar props externas cuando cambien (para recipes)
  useEffect(() => {
    if (externalProps && Object.keys(externalProps).length > 0) {
      console.log('🎯 [UniversalPlayground] Aplicando props externas:', externalProps);
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
    
    console.log('🎮 [UniversalPlayground] Actualizando prop:', propName, '=', value, typeof value);
    
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
      // Para enabledOptions, siempre mantener como string para que se procese después
      if (typeof value === 'string') {
        newProps[propName] = value;
      } else if (Array.isArray(value)) {
        // Si viene un array (desde recipes), convertir a string separado por comas
        newProps[propName] = value.join(', ');
      } else {
        newProps[propName] = value;
      }
      console.log('🎮 [UniversalPlayground] enabledOptions actualizado a:', newProps[propName]);
    } else if (propName === 'mode') {
      // Para mode, mantener como string para que se procese después
      newProps[propName] = value;
      console.log('🎮 [UniversalPlayground] mode actualizado a:', newProps[propName]);
    } else if (propName === 'children' && typeof value === 'string') {
      newProps[propName] = value || 'Contenido de ejemplo';
    } else {
      newProps[propName] = value;
    }
    
    console.log('🎮 [UniversalPlayground] Props actualizadas:', newProps);
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

  // Función auxiliar para procesar props de ViewerPDF
  const processViewerPDFProps = (props: Record<string, unknown>) => {
    const processed = { ...props };
    
    console.log('🔍 [UniversalPlayground] Procesando props de ViewerPDF:', processed);
    console.log('🔍 [UniversalPlayground] PdfViewerMode disponible:', PdfViewerMode);
    console.log('🔍 [UniversalPlayground] PdfViewerOption disponible:', PdfViewerOption);
    
    // Convertir mode string a enum value
    if (processed.mode && typeof processed.mode === 'string') {
      console.log('🔍 [UniversalPlayground] Convirtiendo mode:', processed.mode, typeof processed.mode);
      const originalMode = processed.mode;
      
      if (processed.mode === 'PdfViewerMode.Light') {
        processed.mode = PdfViewerMode.Light;
        console.log('✅ [UniversalPlayground] Mode convertido de', originalMode, 'a:', processed.mode, typeof processed.mode);
      } else if (processed.mode === 'PdfViewerMode.Dark') {
        processed.mode = PdfViewerMode.Dark;
        console.log('✅ [UniversalPlayground] Mode convertido de', originalMode, 'a:', processed.mode, typeof processed.mode);
      } else if (processed.mode === 'PdfViewerMode.Basic') {
        processed.mode = PdfViewerMode.Basic;
        console.log('✅ [UniversalPlayground] Mode convertido de', originalMode, 'a:', processed.mode, typeof processed.mode);
      } else {
        console.log('❌ [UniversalPlayground] Mode no reconocido:', processed.mode);
      }
    }
    
    // Convertir enabledOptions strings a enum values  
    if (processed.enabledOptions) {
      console.log('🔍 [UniversalPlayground] EnabledOptions antes:', processed.enabledOptions, typeof processed.enabledOptions);
      
      // Si es un string, convertir a array
      if (typeof processed.enabledOptions === 'string') {
        const optionsArray = processed.enabledOptions.split(',').map(opt => opt.trim()).filter(Boolean);
        processed.enabledOptions = optionsArray;
        console.log('🔍 [UniversalPlayground] EnabledOptions convertido a array:', processed.enabledOptions);
      }
      
      // Si es un array, convertir cada elemento
      if (Array.isArray(processed.enabledOptions)) {
        processed.enabledOptions = processed.enabledOptions.map((option: string) => {
          console.log('🔍 [UniversalPlayground] Convirtiendo opción:', option);
          switch (option) {
            case 'PdfViewerOption.Print': 
              console.log('✅ [UniversalPlayground] → Print enum:', PdfViewerOption.Print);
              return PdfViewerOption.Print;
            case 'PdfViewerOption.Download': 
              console.log('✅ [UniversalPlayground] → Download enum:', PdfViewerOption.Download);
              return PdfViewerOption.Download;
            case 'PdfViewerOption.EditorHighlight': 
              console.log('✅ [UniversalPlayground] → EditorHighlight enum:', PdfViewerOption.EditorHighlight);
              return PdfViewerOption.EditorHighlight;
            case 'PdfViewerOption.EditorFreeText': 
              console.log('✅ [UniversalPlayground] → EditorFreeText enum:', PdfViewerOption.EditorFreeText);
              return PdfViewerOption.EditorFreeText;
            case 'PdfViewerOption.EditorInk': 
              console.log('✅ [UniversalPlayground] → EditorInk enum:', PdfViewerOption.EditorInk);
              return PdfViewerOption.EditorInk;
            case 'PdfViewerOption.EditorStamp': 
              console.log('✅ [UniversalPlayground] → EditorStamp enum:', PdfViewerOption.EditorStamp);
              return PdfViewerOption.EditorStamp;
            default: 
              console.log('❌ [UniversalPlayground] → Opción no reconocida, mantener como string:', option);
              return option;
          }
        });
        console.log('✅ [UniversalPlayground] EnabledOptions finales:', processed.enabledOptions);
      }
    }
    
    console.log('🎯 [UniversalPlayground] Props procesadas finales para ViewerPDF:', processed);
    return processed;
  };

  // Preparar props finales para el componente (incluyendo mockData)
  const finalProps = useMemo(() => {
    const merged = { ...mockData, ...props };
    const currentComponentName = Component.displayName || Component.name || '';
    
    console.log('🔍 [UniversalPlayground] Nombre del componente detectado:', currentComponentName);
    console.log('🔍 [UniversalPlayground] Comparando con "EdeskViewerPDF":', currentComponentName === 'EdeskViewerPDF');
    
    // Procesar enums para ViewerPDF - Verificar múltiples nombres posibles
    if (currentComponentName === 'EdeskViewerPDF' || currentComponentName === 'ViewerPDF' || currentComponentName.includes('ViewerPDF')) {
      console.log('✅ [UniversalPlayground] Detectado componente ViewerPDF, procesando enums...');
      const processedProps = processViewerPDFProps(merged);
      Object.assign(merged, processedProps);
    } else {
      console.log('❌ [UniversalPlayground] Componente NO es ViewerPDF, saltando procesamiento de enums');
    }
    
    // Procesar children especialmente
    if (merged.children && typeof merged.children === 'string' && merged.children.trim()) {
      // Crear un elemento div con el contenido string para componentes que esperan React nodes
      if (currentComponentName === 'EdeskLayout') {
        merged.children = React.createElement('div', {}, merged.children);
      }
    }

    // Debug: log de las props finales para diagnosticar problemas
    console.log(`[UniversalPlayground] ${currentComponentName} - Props finales:`, merged);
    
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
            {(() => {
              try {
                const componentName = Component.displayName || Component.name || '';
                console.log(`🎯 [UniversalPlayground] Renderizando ${componentName} con props:`, finalProps);
                
                // Debug específico para ViewerPDF
                if (componentName === 'EdeskViewerPDF' || componentName === 'ViewerPDF' || componentName.includes('ViewerPDF')) {
                  console.log('🔍 [ViewerPDF Debug] Mode final:', finalProps.mode, typeof finalProps.mode);
                  console.log('🔍 [ViewerPDF Debug] EnabledOptions final:', finalProps.enabledOptions, typeof finalProps.enabledOptions);
                  console.log('🔍 [ViewerPDF Debug] Todas las props finales:', JSON.stringify(finalProps, null, 2));
                }
                
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
