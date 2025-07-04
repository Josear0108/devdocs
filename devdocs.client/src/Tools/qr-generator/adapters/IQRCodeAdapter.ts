// Importamos los tipos directamente desde su origen para mantener la coherencia
import type { Options as QRCodeStylingOptions, FileExtension } from 'qr-code-styling';

/**
 * Esta interfaz es nuestro "Puerto". Define un contrato que cualquier
 * generador de QR (sea una librería cliente o una API backend) debe cumplir.
 */
export interface IQRCodeAdapter {
    append(container: HTMLElement): void;
    update(options: Partial<QRCodeStylingOptions>): Promise<void>;
    download(format: FileExtension): Promise<void>;
    clear(): void;

    readonly supportedFormats: FileExtension[];

    // 2. Nueva propiedad: capacidades del adaptador
    readonly capabilities: IQRCodeAdapterCapabilities;
}

// 1. Definimos la forma del objeto de capacidades
export interface IQRCodeAdapterCapabilities {
    customColors: boolean; // ¿Permite cambiar colores de puntos y fondo?
    customDots: boolean;   // ¿Permite cambiar la forma de los puntos/esquinas?
    logo: boolean;         // ¿Permite añadir un logo en el centro?
    margin: boolean;       // ¿Permite ajustar el margen?
}