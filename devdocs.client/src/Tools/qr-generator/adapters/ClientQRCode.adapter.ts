// filepath: src/features/qr-generator/adapters/ClientQRCode.adapter.ts
import type { Options as QRCodeStylingOptions, FileExtension } from 'qr-code-styling';
import type { IQRCodeAdapter, IQRCodeAdapterCapabilities } from './IQRCodeAdapter';
import { QRCodeService } from '../services/QRCode.service';

export class ClientQRCodeAdapter implements IQRCodeAdapter {
    public append(container: HTMLElement): void {
        QRCodeService.append(container);
    }
    public update(options: Partial<QRCodeStylingOptions>): Promise<void> {
        return new Promise((resolve) => {
            QRCodeService.update(options);
            resolve();
        });
    }
    public download(format: FileExtension): Promise<void> {
        return QRCodeService.download(format);
    }
    public clear(): void {
        QRCodeService.update({ data: '' });
    }

    public readonly supportedFormats: FileExtension[] = ['svg', 'png', 'jpeg', 'webp'];

    public readonly capabilities: IQRCodeAdapterCapabilities = {
        customColors: true,
        customDots: true,
        logo: true,
        margin: true,
    };
}