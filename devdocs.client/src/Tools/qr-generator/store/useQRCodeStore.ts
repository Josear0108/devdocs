import { create } from 'zustand';
import type { QRCodeStylingOptions, FileExtension } from '../config/qrConfig';
import type { VCardData } from '../types';
import { INITIAL_VCARD_DATA, QR_OPTIONS, ERROR_MESSAGES, INITIAL_REQUIRED_FIELDS } from '../config/constants';
import { DEFAULT_QR_CONFIG } from '../config/qrConfig';
import { formatVCard } from '../services/vcard-formatter.service';
import type { IQRCodeAdapter, IQRCodeAdapterCapabilities } from '../adapters/IQRCodeAdapter';

// 2. Definimos las capacidades por defecto (cuando no hay adaptador)
const DEFAULT_CAPABILITIES: IQRCodeAdapterCapabilities = {
    customColors: false,
    customDots: false,
    logo: false,
    margin: false,
};

// Función helper para obtener un mensaje de error de forma segura
const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
};

interface QRCodeState {
    // --- Estado de los Formularios ---
    option: 'URL' | 'VCARD';
    text: string;
    vcardData: VCardData;

    // --- Estado de Personalización ---
    styleOptions: Partial<QRCodeStylingOptions>;

    // --- Estado de la UI ---
    isGenerated: boolean;
    isLoading: boolean;
    error: string | null;

    // --- Errores de Validación de Campos de VCard ---
    vcardFieldErrors: Partial<Record<keyof VCardData, string>>;

    // --- Adaptador para la Generación de QR ---
    qrCodeAdapter: IQRCodeAdapter | null;
    adapterCapabilities: IQRCodeAdapterCapabilities; // NUEVO

    // --- Acciones que los Componentes pueden Llamar ---
    setOption: (option: 'URL' | 'VCARD') => void;
    setText: (text: string) => void;
    setVcardData: (data: VCardData) => void;
    setStyleOption: (newOption: Partial<QRCodeStylingOptions>) => Promise<void>;
    generateQRCode: () => Promise<void>;
    reset: () => void;
    download: (format: FileExtension) => Promise<void>;

    // --- Acciones para Manejar Errores de VCard ---
    setVcardFieldError: (field: keyof VCardData, error: string) => void;
    clearVcardFieldErrors: () => void;

    // --- Validación de Campos de VCard ---
    validateVcardFields: () => Partial<Record<keyof VCardData, string>>;

    // --- Configuración del Adaptador de QR ---
    setQRCodeAdapter: (adapter: IQRCodeAdapter) => void;
}

export const useQRCodeStore = create<QRCodeState>((set, get) => ({
    // ===================================
    //       ESTADO INICIAL DEL STORE
    // ===================================
    option: QR_OPTIONS.URL,
    text: '',
    vcardData: INITIAL_VCARD_DATA,
    styleOptions: {
        dotsOptions: { ...DEFAULT_QR_CONFIG.dotsOptions },
        backgroundOptions: { ...DEFAULT_QR_CONFIG.backgroundOptions },
        cornersSquareOptions: { ...DEFAULT_QR_CONFIG.cornersSquareOptions },
        cornersDotOptions: { ...DEFAULT_QR_CONFIG.cornersDotOptions },
        imageOptions: { ...DEFAULT_QR_CONFIG.imageOptions },
        qrOptions: { ...DEFAULT_QR_CONFIG.qrOptions },
        margin: DEFAULT_QR_CONFIG.margin,
        image: DEFAULT_QR_CONFIG.image,
    },
    isGenerated: false,
    isLoading: false,
    error: null,
    vcardFieldErrors: {},
    qrCodeAdapter: null,
    adapterCapabilities: DEFAULT_CAPABILITIES, // NUEVO

    // ===================================
    //       ACCIONES DEL STORE
    // ===================================

    setQRCodeAdapter: (adapter) => {
        set({
            qrCodeAdapter: adapter,
            adapterCapabilities: adapter.capabilities // Leemos las capacidades del adaptador inyectado
        });
    },

    setOption: (option) => {
        get().reset(); // Llama a la acción de reseteo para limpiar todo al cambiar de opción
        set({ option });
    },

    setText: (text) => set({ text, isGenerated: false }), // Al editar, marcamos que el QR actual ya no es válido

    setVcardData: (data) => set({ vcardData: data, isGenerated: false }),

    setStyleOption: async (newOption) => {
        const { isGenerated, styleOptions, qrCodeAdapter } = get();
        if (!qrCodeAdapter) return;
        const newStyles = { ...styleOptions, ...newOption };
        set({ styleOptions: newStyles });

        if (isGenerated) {
            try {
                await qrCodeAdapter.update(newStyles);
            } catch (e) {
                // CORRECCIÓN: Se usa la función helper para el error
                set({ error: `Error al actualizar el estilo: ${getErrorMessage(e)}` });
            }
        }
    },

    reset: () => set({
        text: '',
        vcardData: INITIAL_VCARD_DATA,
        isGenerated: false,
        isLoading: false,
        error: null,
        vcardFieldErrors: {},
    }),

    validateVcardFields: () => {
        const { vcardData } = get();
        const errors: Partial<Record<keyof VCardData, string>> = {};
        const requiredKeys = Object.keys(INITIAL_REQUIRED_FIELDS) as Array<keyof typeof INITIAL_REQUIRED_FIELDS>;
        requiredKeys.forEach(key => {
            if (!vcardData[key]?.trim()) {
                errors[key] = 'Este campo es obligatorio';
            }
        });
        set({ vcardFieldErrors: errors });
        return errors;
    },

    generateQRCode: async () => {
        set({ isLoading: true, error: null });
        const { option, text, vcardData, styleOptions, validateVcardFields, qrCodeAdapter } = get();

        if (!qrCodeAdapter) {
            set({ error: "Adaptador de QR no inicializado.", isLoading: false });
            return;
        }

        let dataToEncode: string | null = null;

        try {
            if (option === 'URL') {
                if (!text.trim()) throw new Error(ERROR_MESSAGES.EMPTY_URL);
                dataToEncode = text.trim();
            } else { // VCard
                // Validación de campos requeridos...
                const errors = validateVcardFields();
                if (Object.keys(errors).length > 0) {
                    set({ isLoading: false });
                    throw new Error(ERROR_MESSAGES.REQUIRED_VCARD_FIELDS);
                }

                dataToEncode = formatVCard(vcardData);
            }

            await qrCodeAdapter.update({
                data: dataToEncode,
                ...styleOptions
            });

            set({ isGenerated: true, isLoading: false });

        } catch (e) {
            set({ error: getErrorMessage(e), isLoading: false, isGenerated: false });
        }
    },
    
    download: async (format: FileExtension) => {
        const { isGenerated, qrCodeAdapter } = get();
        if (!isGenerated || !qrCodeAdapter) {
            set({ error: "No hay QR para descargar o el adaptador no está listo." });
            return;
        }
        try {
            await qrCodeAdapter.download(format);
        } catch (e) {
            // CORRECCIÓN: Se usa la función helper para el error
            set({ error: `Ocurrió un error al descargar: ${getErrorMessage(e)}` });
        }
    },

    // ===================================
    //       MANEJO DE ERRORES DE VCARD
    // ===================================

    setVcardFieldError: (field, error) =>
        set(state => ({
            vcardFieldErrors: { ...state.vcardFieldErrors, [field]: error }
        })),

    clearVcardFieldErrors: () => set({ vcardFieldErrors: {} }),
}));
