import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { EdeskFileUpload } from "edesk-components";
import { cssVars, cssVarsDefaults, defaultProps as componentDefaultProps, maxFileSizeUnit, acceptedFileTypesPlaceholder, getMaxFileSizeValue, propSerializers } from '../../config/playgrounds/file-upload.config';
import { useState, useEffect } from "react";
import { CopyButton } from "../../components/ui/CopyButton";
import type { PlaygroundControl } from "../../types/component";

/**
 * Define la estructura de las props que el componente de ejemplo puede recibir.
 * Es un objeto donde cada clave es el nombre de una prop y su valor puede ser string, number, boolean o string[].
 */
type ComponentProps = Record<string, string | number | boolean | string[]>;

// --- Componentes Internos de la Página ---

/**
 * Props para el componente Playground.
 * @param controls - Array de configuraciones para los controles del playground.
 * @param onPropsChange - Función que se llama cuando las props del componente cambian.
 * @param initialProps - Estado inicial de las props para el componente visual.
 */
interface PlaygroundProps {
    component: React.ComponentType<any>;
    controls: PlaygroundControl[];
    onPropsChange: (props: ComponentProps) => void;
    initialProps: ComponentProps;
}

const Playground: React.FC<PlaygroundProps> = ({ controls, onPropsChange = () => {}, initialProps }) => {
    // Estado interno para gestionar las props del playground, estrictamente tipado.
    const [props, setProps] = useState<ComponentProps>({
        ...componentDefaultProps,
        ...initialProps,
        acceptedFileTypes: Array.isArray(componentDefaultProps.acceptedFileTypes)
            ? componentDefaultProps.acceptedFileTypes.join(', ')
            : componentDefaultProps.acceptedFileTypes,
    });

    // Efecto para sincronizar el estado si las props iniciales cambian (ej. al aplicar una receta).
    useEffect(() => {
        setProps({
            ...componentDefaultProps,
            ...initialProps,
            acceptedFileTypes: Array.isArray(componentDefaultProps.acceptedFileTypes)
                ? componentDefaultProps.acceptedFileTypes.join(', ')
                : componentDefaultProps.acceptedFileTypes,
        });
    }, [initialProps]);

    /**
     * Maneja el cambio en cualquier control del playground y actualiza el estado.
     * @param prop - El nombre de la prop del componente a modificar.
     * @param value - El nuevo valor para la prop.
     */
    const handleControlChange = (prop: string, value: string | number | boolean) => {
        // Permitir que los inputs number puedan ser string vacío
        let newValue: string | number | boolean | string[] = value;
        // Si el control es de tipo number y el valor es string vacío, guardar como ""
        const control = controls.find(c => c.prop === prop);
        if (control && control.type === 'number') {
            if (value === '') {
                newValue = '';
            } else if (typeof value === 'string' && value !== '') {
                // Solo convertir a número si no está vacío
                const parsed = parseInt(value, 10);
                newValue = isNaN(parsed) ? '' : parsed;
            }
        }
        // Si el control es acceptedFileTypes, siempre guardar como string
        if (prop === 'acceptedFileTypes' && Array.isArray(value)) {
            newValue = value.join(', ');
        }
        const newProps = { ...props, [prop]: newValue };
        setProps(newProps);
        onPropsChange(newProps);
    };

    /*
    /**
     * Determina si un control debe ser visible basado en sus condiciones
     */
    const isControlVisible = (control: PlaygroundControl): boolean => {
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
    };

    /**
     * Determina si un control debe estar habilitado basado en sus condiciones
     */
    const isControlEnabled = (control: PlaygroundControl): boolean => {
        // Si el control es minFiles o maxFiles, siempre está habilitado
        if (control.prop === 'minSelectFile' || control.prop === 'maxFiles') return true;
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

    /**
     * Función auxiliar para verificar si una prop debe incluirse en el código generado
     * basándose en las condiciones showWhen del control correspondiente
     */
    const shouldIncludePropInCode = (propName: string): boolean => {
        // Buscar el control correspondiente a esta prop
        const control = controls.find((c: PlaygroundControl) => c.prop === propName);
        
        // Si no hay control definido, incluir la prop
        if (!control) return true;
        
        // Si el control no tiene condiciones showWhen, incluirlo
        if (!control.showWhen) return true;
        
        // Aplicar la misma lógica de visibilidad que en isControlVisible
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

    /**
     * Genera dinámicamente el string de código JSX para mostrarlo en el panel de "Código en Vivo".
     * @returns Un string formateado del componente con sus props actuales.
     */
    const generateCodeString = (): string => {
        // Incluir props obligatorias que no están en los controles
        const allProps = { ...props };
        
        // Solo incluir acceptedFileTypes obligatoria si el input está vacío
        const acceptedFileTypesInput = typeof allProps.acceptedFileTypes === 'string'
            ? allProps.acceptedFileTypes.split(',').map(v => v.trim()).filter(Boolean)
            : [];
        const requiredProps = {
            uploadUrl: JSON.stringify(componentDefaultProps.uploadUrl),
            encryptedPath: JSON.stringify(componentDefaultProps.encryptedPath),
            ...(acceptedFileTypesInput.length === 0 ? { acceptedFileTypes: `{${JSON.stringify(componentDefaultProps.acceptedFileTypes)}}` } : {})
        };
        // Mostrar maxFileSize convertido y comentado la unidad original
        if (allProps.maxFileSize && (typeof allProps.maxFileSize === 'string' || typeof allProps.maxFileSize === 'number')) {
            const original = allProps.maxFileSize;
            const converted = getMaxFileSizeValue(original);
            allProps.maxFileSize = `${converted} // ${original}${maxFileSizeUnit}`;
        }

        const propsString = [
            ...Object.entries(allProps)
                .filter(([key, value]) => {
                    // Aplicar condiciones de visibilidad antes de procesar la prop
                    return shouldIncludePropInCode(key) && value !== undefined && value !== null && value !== '';
                })
                .map(([key, value]) => {
                    if (propSerializers[key]) {
                        return propSerializers[key](value, allProps);
                    }
                    if (typeof value === 'string') {
                        return `  ${key}="${value}"`;
                    }
                    if (typeof value === 'boolean') {
                        return value ? `  ${key}` : '';
                    }
                    if (typeof value === 'number') {
                        return `  ${key}={${value}}`;
                    }
                    return '';
                })
                .filter(Boolean),
            ...Object.entries(requiredProps).map(([key, value]) => `  ${key}=${value}`)
        ].filter(Boolean).join('\n');

        return `<EdeskFileUpload\n${propsString}\n/>`;
    };
    // Variables globales de CSS a mostrar y editar (importadas)

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

    // Estado para las variables CSS editables
    const [cssVarsState, setCssVarsState] = useState<Record<string, string>>(() => {
        if (typeof window === 'undefined') return cssVarsDefaults;
        const initial: Record<string, string> = {};
        cssVars.forEach((name) => {
            const computedValue = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
            // Usar valor computado si existe, sino usar el valor por defecto
            initial[name] = computedValue || cssVarsDefaults[name] || '';
        });
        return initial;
    });

    // Actualiza la variable CSS global y el estado local, forzando re-render
    const handleCssVarChange = (name: string, value: string) => {
        setCssVarsState((prev) => {
            const updated = { ...prev, [name]: value };
            // Calcular variables dependientes automáticamente
            const finalVariables = calculateDependentVariables(updated);
            
            if (typeof window !== 'undefined') {
                // Aplicar todas las variables CSS calculadas
                Object.entries(finalVariables).forEach(([varName, varValue]) => {
                    document.documentElement.style.setProperty(varName, varValue);
                });
            }
            return finalVariables;
        });
    };

    // Sincroniza el estado local con los valores globales si cambian (ej. recarga)
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const updated: Record<string, string> = {};
        cssVars.forEach((name) => {
            const computedValue = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
            // Usar valor computado si existe, sino usar el valor por defecto
            updated[name] = computedValue || cssVarsDefaults[name] || '';
        });
        setCssVarsState(updated);
    }, []);

    // Estado para la tab activa en el panel de controles
    const [activeTab, setActiveTab] = useState<'props' | 'css'>('props');

    return (
        <div className="playground-grid">
            {/* Panel de Visualización */}
            <div className="playground-visual-panel">
                {(() => {
                    // Convertir acceptedFileTypes a array si es string
                    const visualProps = { ...props };
                    if (typeof visualProps.acceptedFileTypes === 'string') {
                        visualProps.acceptedFileTypes = visualProps.acceptedFileTypes
                            .split(',')
                            .map((v: string) => v.trim())
                            .filter(Boolean);
                    }
                    
                    return (
                        <EdeskFileUpload
                            uploadUrl={componentDefaultProps.uploadUrl}
                            encryptedPath={componentDefaultProps.encryptedPath}
                            acceptedFileTypes={visualProps.acceptedFileTypes && Array.isArray(visualProps.acceptedFileTypes) && visualProps.acceptedFileTypes.length > 0
                                ? visualProps.acceptedFileTypes
                                : componentDefaultProps.acceptedFileTypes}
                            {...visualProps}
                            maxFileSize={typeof props.maxFileSize === 'string' || typeof props.maxFileSize === 'number' ? getMaxFileSizeValue(props.maxFileSize) : getMaxFileSizeValue(componentDefaultProps.maxFileSize)}
                        />
                    );
                })()}
            </div>


            {/* Panel de Controles con Tabs */}
            <div className="playground-controls-panel">
                <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <button
                        type="button"
                        className={`tab-button${activeTab === 'props' ? ' active' : ''}`}
                        onClick={() => setActiveTab('props')}
                    >
                        Props
                    </button>
                    <button
                        type="button"
                        className={`tab-button${activeTab === 'css' ? ' active' : ''}`}
                        onClick={() => setActiveTab('css')}
                    >
                        CSS
                    </button>
                </div>

                {activeTab === 'props' && (
                    <div className="controls-grid">
                        {(() => {
                            // Filtrar controles excepto acceptedFileTypes y allowedExtensionsText
                            const filteredControls = controls.filter(control => control.prop !== 'acceptedFileTypes' && control.prop !== 'allowedExtensionsText');
                            // Encontrar el control showExtensions y allowedExtensionsText
                            const showExtCtrl = controls.find(c => c.prop === 'showExtensions');
                            const allowedExtCtrl = controls.find(c => c.prop === 'allowedExtensionsText');
                            const result: React.JSX.Element[] = [];
                            filteredControls.filter(isControlVisible).forEach(control => {
                                const isEnabled = isControlEnabled(control);
                                const controlClass = `control-item ${!isEnabled ? 'disabled' : ''}`;
                                let inputNumberValue: string | number = '';
                                if (control.type === 'number') {
                                    if (typeof props[control.prop] === 'number' || typeof props[control.prop] === 'string') {
                                        inputNumberValue = props[control.prop] as string | number;
                                    }
                                }
                                result.push(
                                    <div key={control.prop} className={controlClass}>
                                        <label>{control.label}</label>
                                        {control.type === 'radio' && control.options && (
                                            <div className="radio-group">
                                                {control.options.map(opt => (
                                                    <label key={opt}>
                                                        <input
                                                            type="radio"
                                                            name={control.prop}
                                                            value={opt}
                                                            checked={props[control.prop] === opt}
                                                            onChange={() => handleControlChange(control.prop, opt)}
                                                            disabled={!isEnabled}
                                                        />
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                        {control.type === 'text' && (
                                            <input
                                                type="text"
                                                value={String(props[control.prop] || '')}
                                                onChange={(e) => handleControlChange(control.prop, e.target.value)}
                                                disabled={!isEnabled}
                                            />
                                        )}
                                        {control.type === 'number' && (
                                            <input
                                                type="number"
                                                min="1"
                                                value={inputNumberValue}
                                                onChange={(e) => handleControlChange(control.prop, e.target.value)}
                                                disabled={!isEnabled}
                                            />
                                        )}
                                        {control.type === 'boolean' && (
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={Boolean(props[control.prop])}
                                                    onChange={(e) => handleControlChange(control.prop, e.target.checked)}
                                                    disabled={!isEnabled}
                                                />
                                                <span className="toggle-slider"></span>
                                            </label>
                                        )}
                                    </div>
                                );
                                // Si este es el control showExtensions, renderizar allowedExtensionsText justo después
                                if (showExtCtrl && allowedExtCtrl && control.prop === showExtCtrl.prop) {
                                    const isEnabledAllowed = isControlEnabled(allowedExtCtrl);
                                    const allowedClass = `control-item ${!isEnabledAllowed ? 'disabled' : ''}`;
                                    result.push(
                                        <div key={allowedExtCtrl.prop} className={allowedClass}>
                                            <label htmlFor="allowedExtensionsText-input">Texto de extensiones</label>
                                            <input
                                                id="allowedExtensionsText-input"
                                                type="text"
                                                value={String(props[allowedExtCtrl.prop] || '')}
                                                onChange={e => handleControlChange(allowedExtCtrl.prop, e.target.value)}
                                                disabled={!isEnabledAllowed}
                                            />
                                        </div>
                                    );
                                }
                            });
                            return result;
                        })()}
                        {/* Control para acceptedFileTypes SIEMPRE visible */}
                        <div className="control-item">
                            <label htmlFor="acceptedFileTypes-input">Extensiones permitidas</label>
                        <input
                            id="acceptedFileTypes-input"
                            type="text"
                            value={typeof props.acceptedFileTypes === 'string' ? props.acceptedFileTypes : (Array.isArray(props.acceptedFileTypes) ? props.acceptedFileTypes.join(', ') : '')}
                            onChange={e => handleControlChange('acceptedFileTypes', e.target.value)}
                            placeholder={acceptedFileTypesPlaceholder}
                        />
                        </div>
                    </div>
                )}

                {activeTab === 'css' && (
                    <div className="css-vars-panel">
                        <div className="controls-grid">
                            {cssVars.map((varName) => {
                                const isColor = /color|bg|primary|error/i.test(varName);
                                const value = cssVarsState[varName] || '';
                                const defaultValue = (typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue(varName).trim() : '') || '';
                                const isModified = value !== defaultValue;
                                let colorValue = value;
                                if (isColor && /^#[0-9a-fA-F]{3,8}$/.test(value.trim())) {
                                    colorValue = value.trim();
                                } else if (isColor && value.startsWith('rgb')) {
                                    const rgb = value.match(/\d+/g);
                                    if (rgb && (rgb.length === 3 || rgb.length === 4)) {
                                        colorValue = '#' + rgb.slice(0,3).map(x => (+x).toString(16).padStart(2, '0')).join('');
                                    }
                                }
                                return (
                                    <div key={varName} className="control-item">
                                        <label style={{ fontWeight: 500 }}><code>{varName}</code></label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            {isColor ? (
                                                <input
                                                    type="color"
                                                    value={/^#[0-9a-fA-F]{6}$/.test(colorValue) ? colorValue : '#000000'}
                                                    onChange={e => handleCssVarChange(varName, e.target.value)}
                                                    style={{ width: 40, height: 24, verticalAlign: 'middle' }}
                                                />
                                            ) : null}
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={e => handleCssVarChange(varName, e.target.value)}
                                                style={{ width: isColor ? 'calc(100% - 90px)' : '100%', fontWeight: isModified ? 'bold' : 'normal', color: isModified ? '#007fff' : undefined }}
                                            />
                                            {isModified && (
                                                <span style={{ fontSize: '0.85em', color: '#d32f2f' }}>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Panel de Código en Vivo */}
            <div className="playground-code-panel">
                <h3 className="panel-title">Código en Vivo</h3>
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
                        {generateCodeString()}
                    </SyntaxHighlighter>
                    <CopyButton text={generateCodeString()} />
                </div>
            </div>
        </div>
    );
}

export default Playground
