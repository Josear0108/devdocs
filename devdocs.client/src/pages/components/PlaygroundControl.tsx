import { FileUploadContainer } from "edesk-components";
import { useState, useEffect } from "react";
import { CopyButton } from "../../components/ui/CopyButton";
import type { PlaygroundControl } from "../../types/component";

/**
 * Define la estructura de las props que el componente de ejemplo puede recibir.
 * Es un objeto donde cada clave es el nombre de una prop y su valor puede ser string, number o boolean.
 */
type ComponentProps = Record<string, string | number | boolean>;

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

const Playground: React.FC<PlaygroundProps> = ({ controls, onPropsChange, initialProps }) => {
    // Estado interno para gestionar las props del playground, estrictamente tipado.
    const [props, setProps] = useState<ComponentProps>(initialProps);

    // Efecto para sincronizar el estado si las props iniciales cambian (ej. al aplicar una receta).
    useEffect(() => {
        setProps(initialProps);
    }, [initialProps]);

    /**
     * Maneja el cambio en cualquier control del playground y actualiza el estado.
     * @param prop - El nombre de la prop del componente a modificar.
     * @param value - El nuevo valor para la prop.
     */
    const handleControlChange = (prop: string, value: string | number | boolean) => {
        const newProps = { ...props, [prop]: value };
        setProps(newProps);
        onPropsChange(newProps);
    };

    /**
     * Determina si un control debe ser visible basado en sus condiciones
     */
    const isControlVisible = (control: PlaygroundControl): boolean => {
        if (!control.showWhen) return true;
        return props[control.showWhen.prop] === control.showWhen.value;
    };

    /**
     * Determina si un control debe estar habilitado basado en sus condiciones
     */
    const isControlEnabled = (control: PlaygroundControl): boolean => {
        if (!control.enableWhen) return true;
        return props[control.enableWhen.prop] === control.enableWhen.value;
    };

    /**
     * Genera dinámicamente el string de código JSX para mostrarlo en el panel de "Código en Vivo".
     * @returns Un string formateado del componente con sus props actuales.
     */
    const generateCodeString = (): string => {
        // Incluir props obligatorias que no están en los controles
        const requiredProps = {
            uploadUrl: '"https://cargue.sycpruebas.com/servicioweb.svc"',
            encryptedPath: '"ruta-cifrada-de-ejemplo"',
            acceptedFileTypes: "['pdf', 'jpg', 'png', 'docx']"
        };

        const allProps = { ...props };
        // Convertir maxFileSize de MB a bytes para el código mostrado
        if (allProps.maxFileSize) {
            allProps.maxFileSize = `${(allProps.maxFileSize as number) * 1024 * 1024} // ${allProps.maxFileSize}MB`;
        }

        return `<FileUploadContainer
${Object.entries(allProps)
                .map(([key, value]) => {
                    if (typeof value === 'string') {
                        return `  ${key}="${value}"`;
                    }
                    if (typeof value === 'boolean') {
                        // Solo mostrar la prop booleana si es true, como es común en React.
                        return value ? `  ${key}` : '';
                    }
                    if (typeof value === 'number') {
                        return `  ${key}={${value}}`;
                    }
                    return '';
                })
                .filter(Boolean) // Filtra las props vacías (ej. booleanos en false)
                .concat(
                    Object.entries(requiredProps).map(([key, value]) => `  ${key}=${value}`)
                )
                .join('\n')}
/>`;
    };

    return (
        <div className="playground-grid">
            {/* Panel de Visualización */}
            <div className="playground-visual-panel">
                <FileUploadContainer
                    uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
                    encryptedPath="ruta-cifrada-de-ejemplo"
                    acceptedFileTypes={['pdf', 'jpg', 'png', 'docx']}
                    {...props}
                    maxFileSize={((props.maxFileSize as number) || 10) * 1024 * 1024} // Convertir MB a bytes (debe ir después de ...props)
                />
            </div>

            {/* Panel de Controles */}
            <div className="playground-controls-panel">
                <h3 className="panel-title">Controles</h3>
                <div className="controls-grid">
                    {controls
                        .filter(control => isControlVisible(control))
                        .map(control => {
                            const isEnabled = isControlEnabled(control);
                            const controlClass = `control-item ${!isEnabled ? 'disabled' : ''}`;

                            return (
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
                                            value={Number(props[control.prop] || 0)}
                                            onChange={(e) => handleControlChange(control.prop, parseInt(e.target.value, 10) || 0)}
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
                        })}
                </div>
            </div>

            {/* Panel de Código en Vivo */}
            <div className="playground-code-panel">
                <h3 className="panel-title">Código en Vivo</h3>
                <div className="code-block-wrapper">
                    <pre className="code-block">
                        <code>{generateCodeString()}</code>
                    </pre>
                    <CopyButton text={generateCodeString()} />
                </div>
            </div>
        </div>
    );
}

export default Playground
