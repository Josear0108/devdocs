
import React from 'react';
import { useQRCodeStore } from '../Tools/qr-generator/store/useQRCodeStore';
import { QRForm } from '../Tools/qr-generator/components/qr/QRForm';
import { QRCodeDisplay } from '../Tools/qr-generator/components/qr/QRCodeDisplay';
import { Dropdown } from '../Tools/qr-generator/components/common/Dropdown';
import { QRCustomizationMenu } from '../Tools/qr-generator/components/qr/QRCustomizationMenu';
import { Edit, Settings, Download, ArrowLeft } from 'react-feather';
import '../styles/qr-generator.css';

export const QrGeneratorPage = () => {
    // Obtenemos el estado y la acción del store
    const activeView = useQRCodeStore(state => state.activeView);
    const setActiveView = useQRCodeStore(state => state.setActiveView);
    const isGenerated = useQRCodeStore(state => state.isGenerated);

    return (
        <div className="qr-generator-page">
            {/* --- ENCABEZADO (Siempre visible) --- */}
            <header className="qr-page-header">
                <h1>Generador QR</h1>
                <p>Crea códigos QR personalizados para contactos, URLs, texto y más con opciones de personalización avanzadas.</p>
            </header>

            {/* --- STEPPER (Siempre visible, con lógica de estado activo) --- */}
            <nav className="qr-stepper">
                <div 
                    className={`step ${activeView === 'informacion' ? 'active' : ''}`}
                    onClick={() => setActiveView('informacion')}
                >
                    <div className="step-icon"><Edit size={20} /></div>
                    <span>Información</span>
                </div>
                <div 
                    className={`step ${activeView === 'personalizacion' ? 'active' : ''} ${!isGenerated ? 'disabled' : ''}`}
                    onClick={() => isGenerated && setActiveView('personalizacion')}
                >
                    <div className="step-icon"><Settings size={20} /></div>
                    <span>Personalización</span>
                </div>
                <div 
                    className={`step ${activeView === 'preview' ? 'active' : ''} ${!isGenerated ? 'disabled' : ''}`}
                >
                    <div className="step-icon"><Download size={20} /></div>
                    <span>Descarga</span>
                </div>
            </nav>

            {/* --- ÁREA DE CONTENIDO DINÁMICO --- */}
            <div className="qr-content-area">
                {activeView === 'preview' ? (
                    // --- VISTA DE PREVISUALIZACIÓN ---
                    <div className="qr-preview-layout">
                        <div className="qr-preview-header">
                            <h3>Previsualización final</h3>
                            <p>Su código QR está listo para descargar</p>
                        </div>

                        {/* El componente QRCodeDisplay ya contiene el botón de descarga */}
                        <QRCodeDisplay />

                        <div className="qr-preview-actions">
                            <button 
                                className="action-button secondary-button"
                                onClick={() => setActiveView('personalizacion')}
                            >
                                <ArrowLeft size={16} />
                                Volver a personalizar
                            </button>
                        </div>
                    </div>
                ) : (
                    // --- VISTA DE INFORMACIÓN Y PERSONALIZACIÓN (2 columnas) ---
                    <div className="qr-generator-layout">
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
                        <div className="qr-layout-card">
                            <QRCodeDisplay />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QrGeneratorPage;