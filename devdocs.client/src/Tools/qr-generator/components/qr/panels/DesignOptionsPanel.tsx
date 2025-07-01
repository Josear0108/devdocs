import React from 'react';
import { useQRCodeStore } from '../../../store/useQRCodeStore';
import {
    QR_DOTS_TYPES_ARRAY,
    QR_CORNER_SQUARE_TYPES_ARRAY,
    QR_CORNER_DOT_TYPES_ARRAY,
    QR_ERROR_CORRECTION_LEVELS
} from '../../../config/qrConfig';
import type { DotType, CornerSquareType, CornerDotType, ErrorCorrectionLevel } from 'qr-code-styling';

export const DesignOptionsPanel = () => {
    // Obtenemos el estado de los estilos y la acción para modificarlos del store
    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const setStyleOption = useQRCodeStore(state => state.setStyleOption);

    // --- Manejadores de Eventos ---

    // Un manejador genérico para actualizar sub-objetos como dotsOptions, cornersSquareOptions, etc.
    const handleSubOptionChange = (
        section: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions' | 'qrOptions',
        key: string,
        value: string | number | boolean
    ) => {
        setStyleOption({
            [section]: {
                ...styleOptions[section],
                [key]: value
            }
        });
    };

    // Un manejador específico para el margen, ya que es una propiedad de primer nivel
    const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "") {
            // Si el campo está vacío, volvemos al valor por defecto
            setStyleOption({ margin: 10 }); // O tomarlo de DEFAULT_QR_CONFIG
            return;
        }
        const marginValue = parseInt(value, 10);
        if (!isNaN(marginValue) && marginValue >= 0) {
            setStyleOption({ margin: marginValue });
        }
    };

    return (
        <div className="tab-panel design-options-panel">
            {/* --- Puntos (Dots) --- */}
            <div className="customization-section">
                <h4>Puntos (Módulos)</h4>
                <div className="form-group">
                    <label htmlFor="dotsColor">Color:</label>
                    <input
                        type="color"
                        id="dotsColor"
                        value={styleOptions.dotsOptions?.color ?? '#000000'}
                        onChange={(e) => handleSubOptionChange('dotsOptions', 'color', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="dotsType">Tipo:</label>
                    <select
                        id="dotsType"
                        value={styleOptions.dotsOptions?.type ?? 'square'}
                        onChange={(e) => handleSubOptionChange('dotsOptions', 'type', e.target.value as DotType)}
                    >
                        {QR_DOTS_TYPES_ARRAY.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Esquinas Cuadradas (Corners Square) --- */}
            <div className="customization-section">
                <h4>Esquinas (Cuadradas Externas)</h4>
                <div className="form-group">
                    <label htmlFor="csColor">Color:</label>
                    <input
                        type="color"
                        id="csColor"
                        value={styleOptions.cornersSquareOptions?.color ?? '#000000'}
                        onChange={(e) => handleSubOptionChange('cornersSquareOptions', 'color', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="csType">Tipo:</label>
                    <select
                        id="csType"
                        value={styleOptions.cornersSquareOptions?.type ?? 'square'}
                        onChange={(e) => handleSubOptionChange('cornersSquareOptions', 'type', e.target.value as CornerSquareType)}
                    >
                        {QR_CORNER_SQUARE_TYPES_ARRAY.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Esquinas Puntos (Corners Dot) --- */}
            <div className="customization-section">
                <h4>Esquinas (Puntos Internos)</h4>
                <div className="form-group">
                    <label htmlFor="cdColor">Color:</label>
                    <input
                        type="color"
                        id="cdColor"
                        value={styleOptions.cornersDotOptions?.color ?? '#000000'}
                        onChange={(e) => handleSubOptionChange('cornersDotOptions', 'color', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cdType">Tipo:</label>
                    <select
                        id="cdType"
                        value={styleOptions.cornersDotOptions?.type ?? 'square'}
                        onChange={(e) => handleSubOptionChange('cornersDotOptions', 'type', e.target.value as CornerDotType)}
                    >
                        {QR_CORNER_DOT_TYPES_ARRAY.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Fondo (Background) --- */}
            <div className="customization-section">
                <h4>Fondo</h4>
                <div className="form-group">
                    <label htmlFor="bgColor">Color:</label>
                    <input
                        type="color"
                        id="bgColor"
                        value={styleOptions.backgroundOptions?.color ?? '#ffffff'}
                        onChange={(e) => handleSubOptionChange('backgroundOptions', 'color', e.target.value)}
                    />
                </div>
            </div>

            {/* --- Opciones Generales del QR --- */}
            <div className="customization-section">
                <h4>Opciones Generales</h4>
                <div className="form-group">
                    <label htmlFor="errorCorrectionLevel">Nivel de Corrección:</label>
                    <select
                        id="errorCorrectionLevel"
                        value={styleOptions.qrOptions?.errorCorrectionLevel ?? 'M'}
                        onChange={(e) => handleSubOptionChange('qrOptions', 'errorCorrectionLevel', e.target.value as ErrorCorrectionLevel)}
                    >
                        {QR_ERROR_CORRECTION_LEVELS.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="qrMargin">Margen (px):</label>
                    <input
                        type="number"
                        id="qrMargin"
                        min="0"
                        step="1"
                        value={styleOptions.margin ?? 10}
                        onChange={handleMarginChange}
                    />
                </div>
            </div>
        </div>
    );
};