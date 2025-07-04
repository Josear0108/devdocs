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
    // MODIFICAMOS EL TIPO PARA ACEPTAR LA NUEVA VISTA
    activeView: 'informacion' | 'personalizacion' | 'preview';
    vcardData: VCardData;

    // --- Estado de Personalización ---
    styleOptions: Partial<QRCodeStylingOptions>;

    // --- Estado de la UI ---
    isGenerated: boolean;
    isLoading: boolean;
    error: string | null;

    // --- NUEVO ESTADO: Intento de generación ---
    hasAttemptedGeneration: boolean;

    // --- Errores de Validación de Campos de VCard ---
    vcardFieldErrors: Partial<Record<keyof VCardData, string>>;

    // --- Adaptador para la Generación de QR ---
    qrCodeAdapter: IQRCodeAdapter | null;
    adapterCapabilities: IQRCodeAdapterCapabilities;
    // MODIFICAMOS EL TIPO DE LA ACCIÓN
    setActiveView: (view: 'informacion' | 'personalizacion' | 'preview') => void;
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
     activeView: 'informacion', // NUEVO: Estado para manejar la vista activa
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
    adapterCapabilities: DEFAULT_CAPABILITIES,
    hasAttemptedGeneration: false,

    // ===================================
    //       ACCIONES DEL STORE
    // ===================================

    setQRCodeAdapter: (adapter) => {
        set({
            qrCodeAdapter: adapter,
            adapterCapabilities: adapter.capabilities
        });
    },

    setOption: (option) => set({
        option,
        isGenerated: false,
        error: null,
        hasAttemptedGeneration: false
    }),

    setText: (text) => set({ text, isGenerated: false }),

    setVcardData: (data) => set({ vcardData: data, isGenerated: false }),

    setStyleOption: async (newOption) => {
        const { styleOptions } = get();
        const newStyles = { ...styleOptions, ...newOption };
        set({ styleOptions: newStyles });
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
        set({ hasAttemptedGeneration: true, isLoading: true, error: null });
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
            } else {
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
            set({
                isGenerated: true,
                isLoading: false,
                activeView: 'personalizacion'
            });

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
        setActiveView: (view) => set({ activeView: view }),
    // ===================================
    //       MANEJO DE ERRORES DE VCARD
    // ===================================

    setVcardFieldError: (field, error) =>
        set(state => ({
            vcardFieldErrors: { ...state.vcardFieldErrors, [field]: error }
        })),

    clearVcardFieldErrors: () => set({ vcardFieldErrors: {} }),

}));
