import { useState } from 'react';
import { DesignOptionsPanel } from './panels/DesignOptionsPanel';
import { LogoOptionsPanel } from './panels/LogoOptionsPanel';
import { FramesOptionsPanel } from './panels/FramesOptionsPanel';
import styles from './QRCustomizationMenu.module.css';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import { ArrowLeft, Eye } from 'react-feather';
import { motion } from "framer-motion"

// Definimos los tipos para las pestañas activas
type ActiveTab = 'diseño' | 'logo' | 'marcos';

export const QRCustomizationMenu = () => {
    // Estado local para manejar la pestaña activa
    const [activeTab, setActiveTab] = useState<ActiveTab>('diseño');
    const capabilities = useQRCodeStore(state => state.adapterCapabilities);
    const setActiveView = useQRCodeStore(state => state.setActiveView);
    // Si el adaptador no soporta ninguna personalización, no mostramos el menú
    if (!capabilities.customColors && !capabilities.customDots && !capabilities.margin && !capabilities.logo) {
        return null;
    }
    // Animación para el contenedor del menú
    const itemAnimation = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    }
    return (
        <motion.div className={styles.wrapper} variants={itemAnimation}>
            <h3 className={styles.title}>Personalización</h3>

            {/* Lista de pestañas */}
            <div className={styles.tabsList}>
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'diseño' ? styles.tabTriggerActive : ''}`}
                    onClick={() => setActiveTab('diseño')}
                >
                    Diseño
                </button>
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'logo' ? styles.tabTriggerActive : ''}`}
                    onClick={() => setActiveTab('logo')}
                >
                    Logo
                </button>
                {/* Nueva pestaña para Marcos */}
                <button
                    className={`${styles.tabTrigger} ${activeTab === 'marcos' ? styles.tabTriggerActive : ''}`}
                    onClick={() => setActiveTab('marcos')}
                >
                    Marcos
                </button>
            </div>

            {/* Contenido de la pestaña activa */}
            <div className={styles.tabContent}>
                {activeTab === 'diseño' && <DesignOptionsPanel />}
                {activeTab === 'logo' && <LogoOptionsPanel />}
                {activeTab === 'marcos' && <FramesOptionsPanel />}
            </div>

            {/* --- SECCIÓN DE BOTONES --- */}
            <div className={styles.actionsFooter}>
                <button
                    className={`${styles.actionButton} ${styles.secondaryButton}`}
                    onClick={() => setActiveView('informacion')}
                >
                    <ArrowLeft size={16} />
                    Volver a datos
                </button>
                <button
                    className={`${styles.actionButton} ${styles.primaryButton}`}
                    onClick={() => setActiveView('preview')}
                >
                    Previsualizar
                    <Eye size={16} />
                </button>
            </div>
        </motion.div >
    );
};