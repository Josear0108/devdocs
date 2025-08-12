import type { ComponentSpecificConfig } from '../../types/component';

export const edeskFileUploadConfig: ComponentSpecificConfig = {
  componentName: 'EdeskFileUpload',
  
  // Procesadores específicos para props
  propProcessors: [
    {
      prop: 'acceptedFileTypes',
      processor: (value: unknown) => {
        if (typeof value === 'string') {
          return value.split(',').map(ext => ext.trim());
        } else if (Array.isArray(value)) {
          return value; // Ya es un array, usarlo directamente
        }
        return value;
      }
    }
  ],

  // Formateadores específicos para código generado
  propFormatters: [
    {
      prop: 'acceptedFileTypes',
      formatter: (value: unknown) => {
        let arr: string[] = [];
        if (typeof value === 'string') {
          arr = value.split(',').map((v: string) => v.trim()).filter(Boolean);
        } else if (Array.isArray(value)) {
          arr = value;
        }
        
        if (arr.length === 0) return '';
        
        const formattedItems = arr.map((v: string) => `'${v}'`).join(', ');
        return `  acceptedFileTypes={[${formattedItems}]}`;
      }
    },
    {
      prop: 'minSelectFile',
      formatter: (value: unknown) => {
        return (value === '' || value === null || value === undefined) 
          ? '' 
          : `  minSelectFile={${value}}`;
      }
    },
    {
      prop: 'maxFiles',
      formatter: (value: unknown) => {
        return (value === '' || value === null || value === undefined) 
          ? '' 
          : `  maxFiles={${value}}`;
      }
    },
    {
      prop: 'allowedExtensionsText',
      formatter: (value: unknown, allProps: Record<string, unknown>) => {
        if (!allProps.showExtensions) return '';
        if (typeof value === 'string' && value.trim() === '') return '';
        return `  allowedExtensionsText="${value}"`;
      }
    },
    {
      prop: 'subtitle',
      formatter: (value: unknown) => {
        return (typeof value === 'string' && value.trim() === '') 
          ? '' 
          : `  subtitle="${value}"`;
      }
    },
    {
      prop: 'showExtensions',
      formatter: (value: unknown) => value ? `  showExtensions` : ''
    },
    {
      prop: 'multiSelectFile',
      formatter: (value: unknown) => value === false ? `  multiSelectFile={false}` : ''
    }
  ],

  // Dependencias de CSS variables
  cssVariableDependencies: [
    {
      sourceVariables: ['--edeskFileUpload-accent', '--edeskFileUpload-border-width'],
      calculator: (variables: Record<string, string>) => {
        const dependentVars: Record<string, string> = {};
        const accentColor = variables['--edeskFileUpload-accent'];
        const borderWidth = variables['--edeskFileUpload-border-width'] || '2px';
        
        if (accentColor) {
          dependentVars['--edeskFileUpload-border-dashed'] = `${borderWidth} dashed ${accentColor}`;
          dependentVars['--edeskFileUpload-border-solid'] = `${borderWidth} solid ${accentColor}`;
        }
        
        return dependentVars;
      }
    }
  ],

  // Estrategia de renderizado estándar
  renderStrategy: 'standard'
};
