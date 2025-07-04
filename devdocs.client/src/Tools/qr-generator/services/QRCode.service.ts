import QRCodeStyling, { type Options as QRCodeStylingOptions, type FileExtension } from 'qr-code-styling';
import { DEFAULT_QR_CONFIG } from '../config/qrConfig';

/**
 * Se crea una unica instancia de la libreri que se usara en toda la aplicacion.
 * Este es un enfoque simple de Singleton para asegurar que solo haya un "dibujante" de QR.
 */
const qrInstance = new QRCodeStyling(DEFAULT_QR_CONFIG);

/**
 * Adjunta la instancia del QR a un elemento del DOM.
 * Este paso es crucial y debe llamarse una vez que el componente de display esta montado.
 * @param container - El elemento div donde se dibujar� el QR.
 */
const append = (container: HTMLElement | null): void => {
    if (container) {
        try {
            // Limpia cualquier contenido previo para evitar duplicados si esta funcion se llama mas de una vez.
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            qrInstance.append(container);
            // QRCodeService: Instance appended to DOM.
        } catch (e) {
            console.error("QRCodeService: Error appending instance.", e);
        }
    }
};

/**
 * Actualiza el QR con nuevos datos y/u opciones de estilo.
 * @param options - Un objeto con los nuevos datos y/o estilos a aplicar.
 * @returns Una promesa que se resuelve cuando la actualizaci�n termina.
 */
const update = (options: Partial<QRCodeStylingOptions>): Promise<void> => {
    console.log('[SERVICE] update - options:', options); // <-- LOG
    return new Promise((resolve, reject) => {
        if (!qrInstance) {
            return reject("QR instance not created.");
        }
        try {
            // QRCodeService: Updating with options
            qrInstance.update(options);
            resolve();
        } catch (e) {
            console.error("QRCodeService: Error updating QR.", e);
            reject(e);
        }
    });
};

/**
 * Descarga la imagen del codigo QR actual.
 * @param format - La extension de archivo deseada ('svg', 'png', 'jpeg', 'webp').
 * @returns Una promesa que se resuelve cuando la descarga se completa.
 */
const download = (format: FileExtension = 'svg'): Promise<void> => {
    if (!qrInstance) {
        return Promise.reject("QR instance not created.");
    }

    // QRCodeService: Downloading QR
    return qrInstance.download({
        name: 'qrcode',
        extension: format
    });
};

/**
 * Limpia el contenido del QR del DOM.
 * @param container - El elemento div que contiene el QR.
 */
const clear = (container: HTMLElement | null): void => {
    if (container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
};
// Exportamos un objeto con las funciones que nuestra aplicación puede usar.
export const QRCodeService = {
    append,
    update,
    download,
    clear,
};