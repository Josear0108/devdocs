import { useQRCodeStore } from "../../../store/useQRCodeStore";
import { motion } from "framer-motion";
import {
    QR_DOTS_TYPES_ARRAY,
    QR_CORNER_SQUARE_TYPES_ARRAY,
    QR_CORNER_DOT_TYPES_ARRAY
} from '../../../config/qrConfig';
import styles from './DesignOptionsPanel.module.css';


const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

type SectionName = 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions';

export const DesignOptionsPanel = () => {
    const styleOptions = useQRCodeStore(state => state.styleOptions);
    const setStyleOption = useQRCodeStore(state => state.setStyleOption);

    // --- MANEJADORES DE ESTADO GENERALES ---

    type StyleOptionValue = string | number | boolean | undefined | { [key: string]: unknown };

    const handleOptionChange = (section: SectionName, key: string, value: StyleOptionValue) => {
        setStyleOption({ [section]: { ...styleOptions[section], [key]: value } });
    };

    // --- MANEJADORES ESPECÍFICOS PARA GRADIENTES ---

    // Cambia entre modo 'color' y modo 'gradient'
    const setFillType = (section: SectionName, type: 'solid' | 'gradient') => {
        if (type === 'gradient') {
            // Si no hay gradiente, crea uno por defecto. Si ya existe, no hace nada.
            if (!styleOptions[section]?.gradient) {
                const color = styleOptions[section]?.color ?? '#000000';
                handleOptionChange(section, 'gradient', {
                    type: 'linear',
                    rotation: 0,
                    colorStops: [{ offset: 0, color: color }, { offset: 1, color: '#FFFFFF' }]
                });
            }
        } else {
            // Si cambia a sólido, elimina el gradiente
            handleOptionChange(section, 'gradient', undefined);
        }
    };

    // Actualiza una propiedad específica del objeto gradiente (ej: rotation, type)
    const handleGradientPropertyChange = (section: SectionName, key: 'type' | 'rotation', value: string | number) => {
        const gradient = styleOptions[section]?.gradient;
        if (gradient) {
            handleOptionChange(section, 'gradient', { ...gradient, [key]: value });
        }
    };

    // Actualiza uno de los colores del array colorStops del gradiente
    const handleGradientColorChange = (section: SectionName, colorIndex: number, color: string) => {
        const gradient = styleOptions[section]?.gradient;
        if (gradient && gradient.colorStops) {
            const newColorStops = [...gradient.colorStops];
            newColorStops[colorIndex] = { ...newColorStops[colorIndex], color };
            handleOptionChange(section, 'gradient', { ...gradient, colorStops: newColorStops });
        }
    };


    // --- FUNCIÓN PARA RENDERIZAR CADA SECCIÓN (Puntos, Esquinas, etc.) ---
    
    type StyleSectionOptions = {
        color?: string;
        type?: string;
        gradient?: {
            type?: string;
            rotation?: number;
            colorStops?: { offset: number; color: string }[];
        };
        [key: string]: unknown;
    };

    const renderSection = (sectionName: SectionName, title: string) => {
        const sectionOptions = styleOptions[sectionName] as StyleSectionOptions;
        const isGradient = !!sectionOptions?.gradient;
        const gradient = sectionOptions?.gradient;

        return (
            <div className={styles.section}>
                <h4 className={styles.sectionTitle}>{title}</h4>
                
                {/* Selector de tipo de relleno: Sólido o Gradiente */}
                <div className={styles.fillTypeSelector}>
                    <button
                        className={!isGradient ? styles.fillTypeActive : ''}
                        onClick={() => setFillType(sectionName, 'solid')}
                    >
                        Sólido
                    </button>
                    <button
                        className={isGradient ? styles.fillTypeActive : ''}
                        onClick={() => setFillType(sectionName, 'gradient')}
                    >
                        Gradiente
                    </button>
                </div>

                {/* Controles que se muestran según el tipo de relleno */}
                {isGradient && gradient ? (
                    // --- Panel de Controles para GRADIENTE ---
                    <div className={styles.gradientControls}>
                        <div className={styles.gradientColorPickers}>
                            <input
                                type="color"
                                value={gradient.colorStops?.[0]?.color ?? '#000000'}
                                onChange={(e) => handleGradientColorChange(sectionName, 0, e.target.value)}
                                className={styles.input}
                            />
                            <input
                                type="color"
                                value={gradient.colorStops?.[1]?.color ?? '#FFFFFF'}
                                onChange={(e) => handleGradientColorChange(sectionName, 1, e.target.value)}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formControl}>
                            <label className={styles.label}>Tipo</label>
                            <select
                                value={gradient.type ?? 'linear'}
                                onChange={(e) => handleGradientPropertyChange(sectionName, 'type', e.target.value)}
                                className={styles.select}
                            >
                                <option value="linear">Lineal</option>
                                <option value="radial">Radial</option>
                            </select>
                        </div>
                        {gradient.type === 'linear' && (
                           <div className={styles.formControl}>
                                <label className={styles.label}>Rotación: {gradient.rotation}°</label>
                                <input
                                    type="range"
                                    min="0" max="360" step="1"
                                    value={gradient.rotation ?? 0}
                                    onChange={(e) => handleGradientPropertyChange(sectionName, 'rotation', parseInt(e.target.value, 10))}
                                    className={styles.rangeInput}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    // --- Control para color SÓLIDO ---
                    <div className={styles.formControl}>
                        <label htmlFor={`${sectionName}-color`} className={styles.label}>Color:</label>
                        <input
                            type="color"
                            id={`${sectionName}-color`}
                            value={sectionOptions?.color ?? '#000000'}
                            onChange={(e) => handleOptionChange(sectionName, 'color', e.target.value)}
                        />
                    </div>
                )}
                
                {/* Selector de tipo de punto/esquina (si aplica) */}
                {sectionName !== 'backgroundOptions' && (
                    <div className={styles.formControl}>
                        <label htmlFor={`${sectionName}-type`} className={styles.label}>Tipo:</label>
                        <select
                            id={`${sectionName}-type`}
                            value={(sectionOptions as { type?: string })?.type ?? 'square'}
                            onChange={(e) => handleOptionChange(sectionName, 'type', e.target.value)}
                            className={styles.select}
                        >
                            {sectionName === 'dotsOptions' && QR_DOTS_TYPES_ARRAY.map(type => <option key={type} value={type}>{type}</option>)}
                            {sectionName === 'cornersSquareOptions' && QR_CORNER_SQUARE_TYPES_ARRAY.map(type => <option key={type} value={type}>{type}</option>)}
                            {sectionName === 'cornersDotOptions' && QR_CORNER_DOT_TYPES_ARRAY.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                )}
            </div>
        );
    };

    // --- RENDERIZADO DEL COMPONENTE PRINCIPAL ---

    return (
        <motion.div className={styles.panelGrid} variants={itemAnimation}>
            {renderSection('dotsOptions', 'Puntos')}
            {renderSection('backgroundOptions', 'Fondo')}
            {renderSection('cornersSquareOptions', 'Esquinas Externas')}
            {renderSection('cornersDotOptions', 'Esquinas Internas')}
        </motion.div>
    );
};