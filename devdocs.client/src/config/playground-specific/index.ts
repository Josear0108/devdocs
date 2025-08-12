import type { ComponentSpecificConfig } from '../../types/component';
import { edeskFileUploadConfig } from './edesk-file-upload.config';
import { edeskViewerPDFConfig } from './edesk-viewer-pdf.config';
import { edeskLayoutConfig } from './edesk-layout.config';

// Registro de configuraciones específicas por componente
export const componentSpecificConfigs: Record<string, ComponentSpecificConfig> = {
  'EdeskFileUpload': edeskFileUploadConfig,
  'EdeskViewerPDF': edeskViewerPDFConfig,
  'EdeskLayout': edeskLayoutConfig
};

/**
 * Obtiene la configuración específica para un componente
 * @param componentName Nombre del componente
 * @returns Configuración específica o undefined si no existe
 */
export function getComponentSpecificConfig(componentName: string): ComponentSpecificConfig | undefined {
  return componentSpecificConfigs[componentName];
}

/**
 * Registra una nueva configuración específica para un componente
 * @param componentName Nombre del componente
 * @param config Configuración específica
 */
export function registerComponentSpecificConfig(componentName: string, config: ComponentSpecificConfig): void {
  componentSpecificConfigs[componentName] = config;
}
