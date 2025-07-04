import { useQRCodeStore } from '../../store/useQRCodeStore';
// Importamos el nuevo módulo de estilos
import styles from './Dropdown.module.css'; 

export const Dropdown = () => {
    // Tu lógica para obtener y actualizar el estado (no se cambia)
    const option = useQRCodeStore(state => state.option);
    const setOption = useQRCodeStore(state => state.setOption);       
     
    return (
        // Aplicamos las clases del CSS Module
        <div className={styles.dropdownSection}>
            <select
                className={styles.dropdown} // Se usa la nueva clase
                value={option}
                onChange={(e) => setOption(e.target.value as 'URL' | 'VCARD')}
            >
                <option value="URL">URL (Enlace web)</option>
                <option value="VCARD">VCARD (Contacto)</option>
            </select>
        </div>
    );
};