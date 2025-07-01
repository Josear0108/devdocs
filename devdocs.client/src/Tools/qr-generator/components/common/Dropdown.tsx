// src/features/qr-generator/components/common/Dropdown.tsx
import React from 'react';
import { useQRCodeStore } from '../../store/useQRCodeStore';
import styles from './Dropdown.module.css';

export const Dropdown = () => {
    // Obtenemos el estado 'option' y la acción 'setOption' del store
    const  option = useQRCodeStore(state =>  state.option);
    const  setOption = useQRCodeStore(state => state.setOption);        
     

    return (
        <div className={styles.dropdownSection}>
            <select
                className={styles.dropdown}
                value={option}
                onChange={(e) => setOption(e.target.value as 'URL' | 'VCARD')}
            >
                <option value="URL">URL</option>
                <option value="VCARD">VCARD</option>
            </select>
        </div>
    );
};