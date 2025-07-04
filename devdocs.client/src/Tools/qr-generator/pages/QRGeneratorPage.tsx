// src/features/qr-generator/pages/QRGeneratorPage.tsx
import { QRForm } from '../components/qr/QRForm'; 
import { QRCustomizationMenu } from '../components/qr/QRCustomizationMenu';
import { QRCodeDisplay } from '../components/qr/QRCodeDisplay';

import { Dropdown } from '../components/common/Dropdown';


export const QRGeneratorPage = () => {
    // Esta pagina ya no tiene lgica de estado. Solo organiza.
    
    return (
        <div className="qr-generator-layout">
            <aside className="qr-generator-layout__sidebar">   
                 <Dropdown /> 
                <QRForm />
                <QRCustomizationMenu />
            </aside>
            <main className="qr-generator-layout__main-content">
                <QRCodeDisplay />
            </main>
        </div>
    );
};