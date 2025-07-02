import React, { useState } from 'react';
import { DesignOptionsPanel } from './panels/DesignOptionsPanel';
import { LogoOptionsPanel } from './panels/LogoOptionsPanel';
import styles from './QRCustomizationMenu.module.css';

// Definimos los tipos para las pestañas activas
type ActiveTab = 'diseño' | 'logo';

export const QRCustomizationMenu = () => {
    // Estado local para manejar la pestaña activa
    const [activeTab, setActiveTab] = useState<ActiveTab>('diseño');

    return (
        <div className={styles.wrapper}>
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
            </div>

            {/* Contenido de la pestaña activa */}
            <div className={styles.tabContent}>
                {activeTab === 'diseño' && <DesignOptionsPanel />}
                {activeTab === 'logo' && <LogoOptionsPanel />}
            </div>
        </div>
    );
};