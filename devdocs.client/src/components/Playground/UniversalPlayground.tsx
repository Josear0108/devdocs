import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { PlaygroundConfig, PlaygroundControl, ControlValue } from '../../types/component';
import { PlaygroundControlFactory } from './PlaygroundControlFactory';
import { ControlRenderer } from './ControlRenderer';
import { CSSControlRenderer } from './CSSControlRenderer';
import { PlaygroundTabs } from './PlaygroundTabs';
import { CopyButton } from '../ui/CopyButton';
import { getComponentSpecificConfig } from '../../config/playground-specific';

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
  const calculateDependentVariables = useCallback((baseVariables: Record<string, string>) => {
    const componentName = Component.displayName || Component.name || '';
    const specificConfig = getComponentSpecificConfig(componentName);
    
    let dependentVars: Record<string, string> = { ...baseVariables };
    
    // Aplicar dependencias específicas del componente si existen
    if (specificConfig?.cssVariableDependencies) {
      specificConfig.cssVariableDependencies.forEach(dependency => {
        // Verificar si todas las variables fuente están presentes
        const hasAllSourceVars = dependency.sourceVariables.every(varName => 
          baseVariables[varName] !== undefined
        );
        
        if (hasAllSourceVars) {
          const calculatedVars = dependency.calculator(baseVariables);
          dependentVars = { ...dependentVars, ...calculatedVars };
        }
      });
    }
    
    return dependentVars;
  }, [Component]);

  // Generar controles automáticamente si no se proporcionan grupos
  const playgroundGroups = useMemo(() => {
    if (groups.length > 0) return groups;

    // Crear controles basados en props comunes y configuraciones personalizadas
    const componentControls = PlaygroundControlFactory.createComponentControls(customControls);
    
    // Combinar controles personalizados con los específicos del componente
    const allCustomControls = { ...componentControls, ...customControls };
    
    // Crear controles para todas las props personalizadas
    const autoControls: PlaygroundControl[] = Object.keys(allCustomControls)
      .filter(prop => !excludeProps.includes(prop))
      .map(prop => 
        PlaygroundControlFactory.createControl(prop, undefined, allCustomControls[prop])
      );

    // Agrupar controles automáticamente, respetando la configuración explícita
    return PlaygroundControlFactory.groupControlsAutomatically(autoControls, groups);
  }, [groups, customControls, excludeProps]);

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
    const componentName = Component.displayName || Component.name || '';
    const specificConfig = getComponentSpecificConfig(componentName);
    const newProps = { ...props };
    
    if (value === null || value === '' || value === undefined) {
      delete newProps[propName];
    } else {
      // Buscar procesador específico para esta prop
      const processor = specificConfig?.propProcessors?.find(p => p.prop === propName);
      
      if (processor) {
        // Usar procesador específico
        newProps[propName] = processor.processor(value, newProps);
      } else if (propName === 'children' && typeof value === 'string') {
        // Procesamiento genérico para children
        newProps[propName] = value || 'Contenido de ejemplo';
      } else {
        // Procesamiento estándar
        newProps[propName] = value;
      }
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

  // Función auxiliar para formatear props usando configuraciones específicas
  const formatPropWithSpecificConfig = (key: string, value: unknown, allProps: Record<string, unknown>, componentName: string): string => {
    const specificConfig = getComponentSpecificConfig(componentName);
    
    // Buscar formateador específico para esta prop
    const formatter = specificConfig?.propFormatters?.find(f => f.prop === key);
    
    if (formatter) {
      return formatter.formatter(value, allProps);
    }
    
    // Formateo estándar si no hay formateador específico
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
    const specificConfig = getComponentSpecificConfig(componentName);
    const finalComponentName = specificConfig?.componentName || componentName;
    
    const propsString = Object.entries(componentProps)
      .filter(([key, value]) => {
        if (value === undefined || value === null || value === '') return false;
        if (!shouldIncludePropInCode(key)) return false;
        return true;
      })
      .map(([key, value]) => {
        return formatPropWithSpecificConfig(key, value, componentProps, componentName);
      })
      .filter(Boolean)
      .join('\n');

    return `<${finalComponentName}${propsString ? '\n' + propsString + '\n' : ''} />`;
  };

  // Preparar props finales para el componente (incluyendo mockData)
  const finalProps = useMemo(() => {
    const componentName = Component.displayName || Component.name || '';
    const specificConfig = getComponentSpecificConfig(componentName);
    const merged = { ...mockData, ...props };
    
    // Procesar enums usando configuración genérica
    if (enumConfigs && enumConfigs.length > 0) {
      const processedProps = processEnumProps(merged, enumConfigs);
      Object.assign(merged, processedProps);
    }
    
    // Procesar children usando configuración específica si existe
    if (merged.children && typeof merged.children === 'string' && merged.children.trim()) {
      if (specificConfig?.childrenProcessor) {
        merged.children = specificConfig.childrenProcessor(merged.children, componentName);
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
  }, [cssVariables, calculateDependentVariables]);

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
                const specificConfig = getComponentSpecificConfig(componentName);
                
                // Crear una key única basada en las props para forzar re-render
                const componentKey = `${componentName}-${JSON.stringify(finalProps.mode)}-${JSON.stringify(finalProps.enabledOptions)}`;
                
                // Usar renderizador personalizado si existe
                if (specificConfig?.customRenderer) {
                  return specificConfig.customRenderer(Component, finalProps, componentKey);
                }
                
                // Usar estrategia de renderizado definida
                const renderStrategy = specificConfig?.renderStrategy || 'standard';
                
                switch (renderStrategy) {
                  case 'children-as-prop':
                    return <Component key={componentKey} {...finalProps} />;
                  
                  case 'standard':
                  default:
                    return (
                      <Component key={componentKey} {...finalProps}>
                        {finalProps.children}
                      </Component>
                    );
                }
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
