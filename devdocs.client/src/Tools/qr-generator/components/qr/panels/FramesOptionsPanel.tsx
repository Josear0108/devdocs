import React from 'react';
import { useQRCodeStore } from '../../../store/useQRCodeStore';
// Importaremos su propio módulo de estilos
import styles from './FramesOptionsPanel.module.css'; 

export const FramesOptionsPanel = () => {
    // Más adelante conectaremos aquí la lógica del store
    return (
        <div className={styles.panelWrapper}>
            {/* Aquí irán las opciones de Marcos, Etiquetas y Generales */}
            <p>Opciones de Marcos y Etiquetas - Próximamente</p>
        </div>
    );
};