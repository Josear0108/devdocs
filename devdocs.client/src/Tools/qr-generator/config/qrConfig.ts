// Estos son los tipos exactos de la libreria 
type DrawType = "canvas" | "svg";
type DotType = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded";
type CornerDotType = "dot" | "square" | DotType; // Correcto segn la librera
type CornerSquareType = "dot" | "square" | "extra-rounded" | DotType; // Correcto segn la librera
type ShapeType = "square" | "circle";
type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type Mode = "Numeric" | "Alphanumeric" | "Byte" | "Kanji";
type TypeNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40;
export type FileExtension = "svg" | "png" | "jpeg" | "webp";

interface Gradient { // Tomado de la libreria
    type: "radial" | "linear";
    rotation?: number;
    colorStops: {
        offset: number;
        color: string;
    }[];
}

// Esta es nuestra interfaz que debe coincidir con 'Options' de la libreria
// Haremos que las propiedades sean opcionales si lo son en 'Options' de la libreria
export interface QRCodeStylingOptions {
    type?: DrawType;
    shape?: ShapeType;
    width?: number;
    height?: number;
    margin?: number;
    data?: string; // 'data' es opcional en la config inicial, pero la usaremos siempre
    image?: string;
    // nodeCanvas y jsdom son para Node.js, los omitimos para el cliente
    qrOptions?: {
        typeNumber?: TypeNumber;
        mode?: Mode;
        errorCorrectionLevel?: ErrorCorrectionLevel;
    };
    imageOptions?: {
        saveAsBlob?: boolean; // Nueva opcin
        hideBackgroundDots?: boolean;
        imageSize?: number;
        crossOrigin?: string;
        margin?: number;
    };
    dotsOptions?: {
        type?: DotType;
        color?: string;
        gradient?: Gradient;
        roundSize?: boolean; // Nueva opcin
    };
    cornersSquareOptions?: {
        type?: CornerSquareType;
        color?: string;
        gradient?: Gradient;
    };
    cornersDotOptions?: {
        type?: CornerDotType;
        color?: string;
        gradient?: Gradient;
    };
    backgroundOptions?: {
        round?: number; // Nueva opción
        color?: string;
        gradient?: Gradient;
    };
}

// DEFAULT_QR_CONFIG debe ser compatible con la interfaz QRCodeStylingOptions
export const DEFAULT_QR_CONFIG: QRCodeStylingOptions = {
    // Dimensiones base (requeridas)
    width: 300,
    height: 300,
    margin: 10, // Añadido: margin general del QR

    // Configuración básica
    type: "canvas" as DrawType,
    data: "initial_qr_data_placeholder",  // Valor inicial vacio, se actualizara con datos reales
    shape: "square" as ShapeType, // Añadido: forma explicita

    // Opciones del QR
    qrOptions: {
        typeNumber: 0, // 0 permite auto-detección
        errorCorrectionLevel: 'M', // Balance entre corrección y densidad
        mode: 'Byte' as Mode // Añadido: modo explicito
    },

    // Opciones de imagen (logo)
    imageOptions: {
        hideBackgroundDots: true, // Mejora visibilidad del logo
        imageSize: 0.4, // 40% del tamaño del QR
        margin: 5, // Margen especifico para la imagen
        crossOrigin: "anonymous",
        saveAsBlob: false // Especificado explicitamente
    },

    // Opciones de puntos
    dotsOptions: {
        type: "square" as DotType,
        color: "#000000",
        gradient: undefined, // Explicitamente undefined si no se usa
        roundSize: false // Especificado explicitamente
    },

    // Opciones de esquinas cuadradas
    cornersSquareOptions: {
        type: "square" as CornerSquareType,
        color: "#000000",
        gradient: undefined // Explicitamente undefined si no se usa
    },

    // Opciones de puntos de esquina
    cornersDotOptions: {
        type: "square" as CornerDotType,
        color: "#000000",
        gradient: undefined // Explicitamente undefined si no se usa
    },

    // Opciones de fondo
    backgroundOptions: {
        color: "#FFFFFF",
        round: 0, // Aadido: sin redondeo por defecto
        gradient: undefined // Explicitamente undefined si no se usa
    }
};

// Estas constantes pueden ser utiles para los menos de personalización
export const QR_DOTS_TYPES_ARRAY: ReadonlyArray<DotType> = [
    "dots", "rounded", "classy", "classy-rounded", "square", "extra-rounded"
];

export const QR_CORNER_SQUARE_TYPES_ARRAY: ReadonlyArray<CornerSquareType> = [
    "dot", "square", "extra-rounded" // Puedes añadir los de DotType si son aplicables
];

export const QR_CORNER_DOT_TYPES_ARRAY: ReadonlyArray<CornerDotType> = [
    "dot", "square" // Puedes añadir los de DotType si son aplicables
];

export const QR_ERROR_CORRECTION_LEVELS: ReadonlyArray<ErrorCorrectionLevel> = [
    "L", "M", "Q", "H"
];

export const QR_DRAW_TYPES: ReadonlyArray<DrawType> = [
    "canvas", "svg"
];