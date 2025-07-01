import React, { useState } from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import { DesignOptionsPanel } from './panels/DesignOptionsPanel';
import { LogoOptionsPanel } from './panels/LogoOptionsPanel';
import styles from './QRCustomizationMenu.module.css';

export const QRCustomizationMenu = () => {
    const capabilities = useQRCodeStore(state => state.adapterCapabilities);
    const [activeTab, setActiveTab] = useState<'design' | 'logo'>('design');

    if (!capabilities.customColors && !capabilities.customDots && !capabilities.margin && !capabilities.logo) {
        return null;
    }

    return (
        <section className={styles.qrCustomization}>
            <nav className={styles.qrCustomizationTabs}>
                {(capabilities.customColors || capabilities.customDots || capabilities.margin) && (
                    <button
                        className={activeTab === 'design' ? `${styles.tabButton} ${styles.active}` : styles.tabButton}
                        onClick={() => setActiveTab('design')}
                        aria-selected={activeTab === 'design'}
                        type="button"
                    >
                        Diseño
                    </button>
                )}
                {capabilities.logo && (
                    <button
                        className={activeTab === 'logo' ? `${styles.tabButton} ${styles.active}` : styles.tabButton}
                        onClick={() => setActiveTab('logo')}
                        aria-selected={activeTab === 'logo'}
                        type="button"
                    >
                        Logo
                    </button>
                )}
            </nav>
            <div className={styles.qrCustomizationContent}>
                {activeTab === 'design' && (capabilities.customColors || capabilities.customDots || capabilities.margin) && (
                    <DesignOptionsPanel />
                )}
                {activeTab === 'logo' && capabilities.logo && (
                    <LogoOptionsPanel />
                )}
            </div>
        </section>
    );
};