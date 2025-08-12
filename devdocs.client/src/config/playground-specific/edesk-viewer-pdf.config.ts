import type { ComponentSpecificConfig } from '../../types/component';

export const edeskViewerPDFConfig: ComponentSpecificConfig = {
  componentName: 'EdeskViewerPDF',
  
  // Procesadores específicos para props
  propProcessors: [
    {
      prop: 'enabledOptions',
      processor: (value: unknown) => {
        // Para enabledOptions, mantener como array para que SelectCheck funcione correctamente
        if (Array.isArray(value)) {
          return value; // Mantener como array
        } else if (typeof value === 'string') {
          // Si viene como string (desde entrada de usuario), convertir a array
          return value.split(',').map(opt => opt.trim()).filter(Boolean);
        }
        return value;
      }
    },
    {
      prop: 'mode', 
      processor: (value: unknown) => {
        // Para mode, mantener como string para que se procese después
        return value;
      }
    }
  ],

  // Formateadores específicos para código generado
  propFormatters: [
    {
      prop: 'enabledOptions',
      formatter: (value: unknown) => {
        // Si es string con comas, convertir a array
        let optionsArray: string[] = [];
        if (typeof value === 'string') {
          optionsArray = value.split(',').map(opt => opt.trim()).filter(Boolean);
        } else if (Array.isArray(value)) {
          optionsArray = value.map(opt => String(opt));
        }
        
        // Convertir números de enum de vuelta a nombres si es necesario
        const formattedOptions = optionsArray.map(opt => {
          // Si es un número, convertir de vuelta a nombre de enum
          if (/^\d+$/.test(opt)) {
            // Aquí se podría usar enumConfigs si están disponibles
            // Por ahora, asumimos que ya están en formato correcto
            return `PdfViewerOption.${opt}`;
          }
          // Si ya tiene el formato correcto, mantenerlo
          if (opt.startsWith('PdfViewerOption.')) {
            return opt;
          }
          // Si no tiene el prefijo pero es un nombre válido, agregarlo
          return `PdfViewerOption.${opt}`;
        });
        
        const formattedOptionsString = formattedOptions.map(opt => `       ${opt},`).join('\n');
        return `     enabledOptions={[\n${formattedOptionsString}\n     ]}`;
      }
    },
    {
      prop: 'mode',
      formatter: (value: unknown) => {
        let modeValue = String(value);
        // Si es un número, convertir de vuelta a nombre de enum
        if (/^\d+$/.test(modeValue)) {
          // Aquí se podría usar enumConfigs si están disponibles
          modeValue = `PdfViewerMode.${modeValue}`;
        }
        // Si ya tiene el formato correcto, mantenerlo
        if (!modeValue.startsWith('PdfViewerMode.')) {
          modeValue = `PdfViewerMode.${modeValue}`;
        }
        return `     mode={${modeValue}}`;
      }
    },
    {
      prop: 'pdfUrl',
      formatter: (value: unknown) => {
        if (typeof value === 'string') {
          return `     pdfUrl={"${value}"}`;
        }
        return `     pdfUrl={${JSON.stringify(value)}}`;
      }
    }
  ],

  // Estrategia de renderizado: children como prop
  renderStrategy: 'children-as-prop'
};
