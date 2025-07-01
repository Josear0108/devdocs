import type { IQRCodeAdapter, IQRCodeAdapterCapabilities } from './IQRCodeAdapter';
import type { Options as QRCodeStylingOptions, FileExtension } from 'qr-code-styling';

const API_BASE_URL = '/ltotalservices/qrcode';

export class ApiQRCodeAdapter implements IQRCodeAdapter {
    private lastOptions: Partial<QRCodeStylingOptions> | null = null;
    private container: HTMLElement | null = null;

    public readonly supportedFormats: FileExtension[] = ['svg'];

    public readonly capabilities: IQRCodeAdapterCapabilities = {
        customColors: false,
        customDots: false,
        logo: false,
        margin: false, // El endpoint sí permite margen
    };

    public append(container: HTMLElement): void {
        this.container = container;
        this.container.innerHTML = '';
    }

    public async update(options: Partial<QRCodeStylingOptions>): Promise<void> {
        this.lastOptions = options;
        const params = this.buildParams(options, 'svg');
        const url = `${API_BASE_URL}?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('No se pudo generar el QR desde el endpoint');
        const svgContent = await response.text();
        if (this.container) {
            this.container.innerHTML = svgContent;
        }
    }

    public async download(format: FileExtension = 'svg'): Promise<void> {
        if (!this.lastOptions) throw new Error('No hay QR generado para descargar');
        const params = this.buildParams(this.lastOptions, format);
        const url = `${API_BASE_URL}?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`No se pudo descargar el QR como ${format}`);
        const blob = await response.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = `qrcode.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    }

    public clear(): void {
        this.lastOptions = null;
        if (this.container) {
            this.container.innerHTML = '';
        }
    }

    private buildParams(options: Partial<QRCodeStylingOptions>, format: FileExtension): URLSearchParams {
        return new URLSearchParams({
            data: String(options.data ?? ''),
            test: 'true',
            size: String(options.width ?? 15),
            version: '1',
            format: format,
            margin: String(options.margin ?? 5),
        });
    }
}