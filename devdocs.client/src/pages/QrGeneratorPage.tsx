import { QRForm } from '../Tools/qr-generator/components/qr/QRForm';
import { QRCodeDisplay } from '../Tools/qr-generator/components/qr/QRCodeDisplay';
import { Dropdown } from '../Tools/qr-generator/components/common/Dropdown';
import { QRCustomizationMenu } from '../Tools/qr-generator/components/qr/QRCustomizationMenu';
import { useQRCodeStore } from '../Tools/qr-generator/store/useQRCodeStore'; // Importa el store
import { Edit, Settings } from 'react-feather';

import '../styles/qr-generator.css';

export const QrGeneratorPage = () => {
    // Obtenemos el estado y la acción del store
    const activeView = useQRCodeStore(state => state.activeView);
    const setActiveView = useQRCodeStore(state => state.setActiveView);
    const isGenerated = useQRCodeStore(state => state.isGenerated);

    return (
        <div className="qr-generator-page">
            <header className="qr-page-header">
                <h1>Generador QR</h1>
                <p>Crea códigos QR personalizados para contactos, URLs, texto y más con opciones de personalización avanzadas.</p>
            </header>

            {/* Stepper ahora es interactivo */}
            <nav className="qr-stepper">
                <div 
                    className={`step ${activeView === 'informacion' ? 'active' : ''}`}
                    onClick={() => setActiveView('informacion')}
                >
                    <div className="step-icon"><Edit size={20} /></div>
                    <span>Información</span>
                </div>
                <div 
                    // El botón de personalización solo se activa si ya se ha generado un QR
                    className={`step ${activeView === 'personalizacion' ? 'active' : ''} ${!isGenerated ? 'disabled' : ''}`}
                    onClick={() => isGenerated && setActiveView('personalizacion')}
                >
                    <div className="step-icon"><Settings size={20} /></div>
                    <span>Personalización</span>
                </div>
            </nav>

            <div className="qr-generator-layout">
                {/* La tarjeta izquierda ahora muestra contenido dinámico */}
                <div className="qr-layout-card">
                    {activeView === 'informacion' ? (
                        <>
                            <Dropdown />
                              <QRForm /> 
                        </>
                    ) : (
                        <QRCustomizationMenu />
                    )}
                </div>

                {/* La tarjeta derecha no cambia */}
                <div className="qr-layout-card">
                    <QRCodeDisplay />
                </div>
            </div>
        </div>
    );
};

export default QrGeneratorPage;