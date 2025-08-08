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

// Variables globales de CSS específicas de EdeskFileUpload
export const cssVars = [
    '--edeskFileUpload-accent',
    '--edeskFileUpload-accent-bg',
    '--edeskFileUpload-bg',
    '--edeskFileUpload-bg-file',
    '--edeskFileUpload-text',
    '--edeskFileUpload-text-extensions',
    '--edeskFileUpload-bg-error',
    '--edeskFileUpload-text-error',
    '--edeskFileUpload-border-radius',
    '--edeskFileUpload-border-radius-pill',
    '--edeskFileUpload-border-width',
    '--edeskFileUpload-padding',
    '--edeskFileUpload-min-height',
    '--edeskFileUpload-font-size',
    '--edeskFileUpload-font-weight',
    '--edeskFileUpload-font-main',
    '--edeskFileUpload-button-type-width',
    '--edeskFileUpload-container-width',
    // Nota: --edeskFileUpload-border-dashed y --edeskFileUpload-border-solid 
    // se calculan automáticamente basadas en accent y border-width
];

// Valores por defecto para las variables CSS
export const cssVarsDefaults: Record<string, string> = {
    '--edeskFileUpload-accent': '#007FFF',
    '--edeskFileUpload-accent-bg': '#f3f9ff',
    '--edeskFileUpload-bg': '#f3f9ff',
    '--edeskFileUpload-bg-file': '#CEE3F9',
    '--edeskFileUpload-text': '#000000',
    '--edeskFileUpload-text-extensions': '#747474',
    '--edeskFileUpload-bg-error': '#ffeaea',
    '--edeskFileUpload-text-error': '#d32f2f',
    '--edeskFileUpload-border-radius': '8px',
    '--edeskFileUpload-border-radius-pill': '30px',
    '--edeskFileUpload-border-width': '2px',
    '--edeskFileUpload-padding': '2rem',
    '--edeskFileUpload-min-height': '200px',
    '--edeskFileUpload-font-size': '16px',
    '--edeskFileUpload-font-weight': '400',
    '--edeskFileUpload-font-main': 'Roboto, sans-serif',
    '--edeskFileUpload-button-type-width': '300px',
    '--edeskFileUpload-container-width': '650px',
};

// Props obligatorias y valores por defecto para EdeskFileUpload
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

// Estructura de controles para el playground de EdeskFileUpload
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

