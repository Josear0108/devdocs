// Serializadores de props para el código en vivo
export const propSerializers: Record<string, (value: any, allProps: any) => string> = {
  minSelectFile: (value) => (value === '' || value === null || value === undefined ? '' : `  minSelectFile={${value}}`),
  maxFiles: (value) => (value === '' || value === null || value === undefined ? '' : `  maxFiles={${value}}`),
  allowedExtensionsText: (value, allProps) => {
    if (!allProps.showExtensions) return '';
    if (typeof value === 'string' && value.trim() === '') return '';
    return `  allowedExtensionsText="${value}"`;
  },
  subtitle: (value) => (typeof value === 'string' && value.trim() === '' ? '' : `  subtitle="${value}"`),
  showExtensions: (value) => (value ? `  showExtensions` : ''),
  multiSelectFile: (value) => (value === false ? `  multiSelectFile={false}` : ''),
  acceptedFileTypes: (value) => {
    const arr = typeof value === 'string' ? value.split(',').map((v: string) => v.trim()).filter(Boolean) : [];
    return arr.length > 0 ? `  acceptedFileTypes={[${arr.map((v: string) => `'${v}'`).join(', ')}]}` : '';
  },
};
// Utilidad para convertir el tamaño máximo de archivo a la unidad esperada
export function getMaxFileSizeValue(input: number | string | undefined): number {
  if (input === '' || input === undefined || input === null) return maxFileSizeUnit === 'MB' ? defaultProps.maxFileSize * 1024 * 1024 : defaultProps.maxFileSize;
  const value = typeof input === 'string' ? parseInt(input, 10) : input;
  if (isNaN(value)) return maxFileSizeUnit === 'MB' ? defaultProps.maxFileSize * 1024 * 1024 : defaultProps.maxFileSize;
  return maxFileSizeUnit === 'MB' ? value * 1024 * 1024 : value;
}

// Variables globales de CSS específicas de FileUploadContainer
export const cssVars = [
    '--edesk-primary',
    '--edesk-primary-light',
    '--edesk-bg-file',
    '--edesk-border-radius',
    '--edesk-border-radius-pill',
    '--edesk-border-width',
    '--edesk-bg-error',
    '--edesk-text-error',
    '--edesk-font-main',
    '--edesk-button-type-width',
    '--edesk-container-width',
];

// Props obligatorias y valores por defecto para FileUploadContainer
export const defaultProps = {
  uploadUrl: 'https://cargue.sycpruebas.com/servicioweb.svc',
  encryptedPath: 'ruta-cifrada-de-ejemplo',
  acceptedFileTypes: ['pdf', 'jpg', 'png', 'docx'],
  maxFileSize: 10, // en MB
  showExtensions: false,
  allowedExtensionsText: '',
  multiSelectFile: true,
  minSelectFile: '',
  maxFiles: '',
  subtitle: '',
  hideIcon: false,
  unstyled: false,
};

// Unidad esperada para maxFileSize
export const maxFileSizeUnit = 'MB';

// Placeholder para acceptedFileTypes
export const acceptedFileTypesPlaceholder = 'Ej: pdf, jpg, png, docx';

// Estructura de controles para el playground de FileUploadContainer
import type { PlaygroundControl } from '../../types/component';
export const controls: PlaygroundControl[] = [
  {
    prop: 'subtitle',
    label: 'Subtítulo',
    type: 'text',
    defaultValue: '',
  },
  {
    prop: 'showExtensions',
    label: 'Mostrar extensiones',
    type: 'boolean',
    defaultValue: false,
  },
  {
    prop: 'allowedExtensionsText',
    label: 'Texto de extensiones',
    type: 'text',
    defaultValue: '',
    showWhen: { prop: 'showExtensions', value: true },
  },
  {
    prop: 'multiSelectFile',
    label: 'Selección múltiple',
    type: 'boolean',
    defaultValue: true,
  },
  {
    prop: 'minSelectFile',
    label: 'Mínimo de archivos',
    type: 'number',
    defaultValue: '',
  },
  {
    prop: 'maxFiles',
    label: 'Máximo de archivos',
    type: 'number',
    defaultValue: '',
  },
  {
    prop: 'maxFileSize',
    label: 'Tamaño máximo (MB)',
    type: 'number',
    defaultValue: 10,
  },
   {
    prop: 'hideIcon',
    label: 'Ocultar icono',
    type: 'boolean',
    defaultValue: false,
  },
    {
    prop: 'unstyled',
    label: 'Sin estilos',
    type: 'boolean',
    defaultValue: false,
  },
];

