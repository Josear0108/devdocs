// src/features/qr-generator/pages/QRGeneratorPage.tsx
import { QRForm } from '../Tools/qr-generator/components/qr/QRForm'; 
import { QRCustomizationMenu } from '../Tools/qr-generator/components/qr/QRCustomizationMenu';
import { QRCodeDisplay } from '../Tools/qr-generator/components/qr/QRCodeDisplay';
import { Dropdown } from '../Tools/qr-generator/components/common/Dropdown';
import '../styles/qr-generator.css';


export const QrGeneratorPage = () => {
    // Esta pagina ya no tiene logica de estado. Solo organiza.
    
    return (
        <div className="qr-generator-container">
            <div className="qr-generator-header">
                <h1>Generador QR</h1>
                <p>Crea códigos QR personalizados para contactos, URLs, texto y más con opciones de personalización avanzadas.</p>
            </div>
            <div className="qr-generator-tabs">
                <div className="qr-generator-tab">
                    {/* Icono de información */}
                    <span>Información</span>
                </div>
                <div className="qr-generator-tab">
                    {/* Icono de personalización */}
                    <span>Personalización</span>
                </div>
            </div>
            <div className="qr-generator-grid">
                <div className="qr-card">
                    <aside className="qr-generator-layout__sidebar">    
                        <Dropdown /> 
                        <QRForm />
                        <QRCustomizationMenu />
                    </aside>
                </div>
                <div className="qr-card">
                    <main className="qr-generator-layout__main-content">
                        <QRCodeDisplay />
                    </main>
                </div>
            </div>
        </div>
    );
    
};
export default QrGeneratorPage;