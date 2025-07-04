/* 
 Agrupar constantes relacionadas en objetos:
   - Mejor organizaci�n
   - Evita colisiones de nombres
   - M�s f�cil de mantener      */
import type { RequiredVCardFields } from '../types';

export const INITIAL_VCARD_DATA = {
    firstName: "",
    lastName: "",
    mobile: "",
    company: "",
    landline: "",
    email: "",
    address: "",
    city: "",
    country: "",
    website: ""
};

// Agrupamos las constantes por tipo/funcionalidad
export const QR_OPTIONS = {
    URL: 'URL',
    VCARD: 'VCARD'
} as const; // 'as const' es util para tipado estricto

export const ERROR_MESSAGES = {
    EMPTY_URL: "La URL no puede estar vacia.",
    REQUIRED_VCARD_FIELDS: "Hay campos del VCARD que son obligatorios.",
    QR_UPDATE_FAILED: "Error al actualizar el codigo QR.",
    NO_QR_CONTENT: "No se pudo determinar el contenido para el QR."
} as const;


export const INITIAL_REQUIRED_FIELDS: RequiredVCardFields = {
    firstName: true,
    lastName: true,
    mobile: true,
    email: true
};