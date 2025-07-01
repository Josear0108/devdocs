// src/features/qr-generator/components/qr/panels/LogoOptionsPanel.tsx
import React from 'react';
import { useQRCodeStore } from '../../../store/useQRCodeStore';
import type { QRCodeStylingOptions } from '../../../config/qrConfig';

// --- ANTES ---
// El componente recibía 'currentStyleOptions' y 'onStyleChange' como props.
// --- AHORA ---
// El componente se conecta directamente al store para obtener los estilos del logo
// y la función para actualizarlos. Ya no necesita props para esto.

export const LogoOptionsPanel = () => {
    // Obtenemos el estado y las acciones necesarias del store de Zustand.
    // Seleccionamos solo lo que este panel necesita para optimizar re-renderizados.

    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const setStyleOption = useQRCodeStore(state => state.setStyleOption);
    const isLoading = useQRCodeStore(state => state.isLoading);

    // --- Manejadores de Eventos ---

    // Manejador para las opciones anidadas dentro de 'imageOptions'
    const handleImageOptionChange = (
        key: keyof NonNullable<QRCodeStylingOptions['imageOptions']>,
        value: string | number | boolean
    ) => {
        // Llama a la acción del store para actualizar el estado,
        // fusionando la nueva opción con las existentes.
        setStyleOption({
            imageOptions: {
                ...styleOptions.imageOptions,
                [key]: value
            }
        });
    };

    // Manejador para la subida del archivo de imagen
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 'image' es una propiedad de primer nivel en styleOptions, así que la seteamos directamente.
                setStyleOption({ image: reader.result as string });
            };
            reader.readAsDataURL(file);
        } else {
            // Si el usuario cancela la selección de archivo, limpiamos la imagen.
            setStyleOption({ image: undefined });
        }
    };

    // Manejadores específicos con validación para los inputs numéricos,
    // para evitar enviar valores incorrectos al store.
    const handleLogoSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            handleImageOptionChange('imageSize', 0.3); // Revertir a un default si se borra
            return;
        }
        const parsedValue = parseFloat(value);
        if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 1) {
            handleImageOptionChange('imageSize', parsedValue);
        }
    };

    const handleLogoMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            handleImageOptionChange('margin', 0); // Revertir a un default si se borra
            return;
        }
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 0) {
            handleImageOptionChange('margin', parsedValue);
        }
    };

    return (
        <div className="tab-panel logo-options-panel">
            <h4>Logo</h4>
            <div className="customization-section">
                <div className="form-group">
                    <label htmlFor="logo-upload">Subir Logo (PNG, JPEG, SVG):</label>
                    <input
                        type="file"
                        id="logo-upload"
                        accept="image/png, image/jpeg, image/svg+xml"
                        onChange={handleLogoUpload}
                        disabled={isLoading}
                    />
                </div>

                {/* Muestra una vista previa del logo si se ha cargado */}
                {styleOptions.image && (
                    <div className="form-group" style={{ textAlign: 'center' }}>
                        <img
                            src={styleOptions.image}
                            alt="Logo preview"
                            style={{
                                display: 'inline-block',
                                maxWidth: '100px',
                                maxHeight: '100px',
                                margin: 'var(--spacing-sm, 0.5rem) 0',
                                border: '1px solid var(--color-border-light, #eee)',
                                borderRadius: 'var(--border-radius-sm, 4px)'
                            }}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="logo-size">Tamaño del Logo (Proporción 0 a 1):</label>
                    <input
                        type="number"
                        id="logo-size"
                        min="0"
                        max="1"
                        step="0.05"
                        // El valor se lee directamente del store, con un fallback seguro.
                        value={styleOptions.imageOptions?.imageSize ?? 0.3}
                        onChange={handleLogoSizeChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="logo-margin">Margen del Logo (px):</label>
                    <input
                        type="number"
                        id="logo-margin"
                        min="0"
                        step="1"
                        value={styleOptions.imageOptions?.margin ?? 0}
                        onChange={handleLogoMarginChange}
                        disabled={isLoading}
                    />
                </div>

                <div className="form-group checkbox-inline-group">
                    <input
                        type="checkbox"
                        id="logo-hideBackgroundDots"
                        checked={styleOptions.imageOptions?.hideBackgroundDots ?? true}
                        onChange={(e) => handleImageOptionChange('hideBackgroundDots', e.target.checked)}
                        disabled={isLoading}
                    />
                    <label htmlFor="logo-hideBackgroundDots">Ocultar puntos detrás del logo</label>
                </div>
            </div>
        </div>
    );
};
