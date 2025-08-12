import type { PlaygroundControl, PlaygroundGroup } from '../../types/component';

export class PlaygroundControlFactory {
  // Mapeo de tipos comunes a configuraciones de controles
  private static readonly PROP_TYPE_MAPPING: Record<string, Partial<PlaygroundControl>> = {
    'string': { type: 'text' },
    'number': { type: 'number' },
    'boolean': { type: 'boolean' },
    'ReactNode': { type: 'textarea' },
    'React.ReactNode': { type: 'textarea' },
    'React.CSSProperties': { type: 'textarea' },
    '() => void': { type: 'text', defaultValue: '() => {}' }
  };

  // Configuraciones predefinidas para props comunes
  private static readonly COMMON_PROP_CONFIGS: Record<string, Partial<PlaygroundControl>> = {
    // Props de Layout
    'type': {
      type: 'radio',
      description: 'Variante visual del componente'
    },
    'variant': {
      type: 'radio'
    },
    'size': {
      type: 'radio'
    },
    
    // Props de Estado
    'disabled': {
      type: 'boolean',
      defaultValue: false
    },
    'loading': {
      type: 'boolean',
      defaultValue: false
    },
    'open': {
      type: 'boolean',
      defaultValue: false
    },
    
    // Props de Contenido
    'title': {
      type: 'text'
    },
    'subtitle': {
      type: 'text'
    },
    'placeholder': {
      type: 'text'
    },
    'label': {
      type: 'text'
    },
    
    // Props de Estilo
    'className': {
      type: 'text'
    },
    'style': {
      type: 'textarea'
    },
    
    // Props de Números
    'maxFiles': {
      type: 'number',
      min: 1,
      max: 20
    },
    'minSelectFile': {
      type: 'number',
      min: 0,
      max: 10
    },
    'maxFileSize': {
      type: 'select',
      options: [1048576, 5242880, 10485760, 52428800], // 1MB, 5MB, 10MB, 50MB
      defaultValue: 10485760
    }
  };

  // Grupos predefinidos con sus etiquetas y descripciones
  private static readonly DEFAULT_GROUPS: Record<string, { label: string; description: string }> = {
    content: { 
      label: 'Contenido', 
      description: 'Textos y contenido visual del componente' 
    },
    layout: { 
      label: 'Diseño', 
      description: 'Variantes visuales y estructura del componente' 
    },
    behavior: { 
      label: 'Comportamiento', 
      description: 'Estados y lógica de interacción' 
    },
    styling: { 
      label: 'Estilos', 
      description: 'Personalización de apariencia' 
    },
    advanced: { 
      label: 'Avanzado', 
      description: 'Configuraciones técnicas y avanzadas' 
    }
  };

  /**
   * Crea un control basado en la configuración y personalizaciones
   */
  static createControl(
    propName: string,
    propType?: string,
    customConfig?: Partial<PlaygroundControl>
  ): PlaygroundControl {
    const baseControl: PlaygroundControl = {
      prop: propName,
      label: this.formatLabel(propName),
      type: 'text',
      defaultValue: null
    };

    // Aplicar configuración común si existe
    const commonConfig = this.COMMON_PROP_CONFIGS[propName];
    if (commonConfig) {
      Object.assign(baseControl, commonConfig);
    }

    // Aplicar mapeo de tipos si se proporciona
    if (propType) {
      const typeConfig = this.PROP_TYPE_MAPPING[propType];
      if (typeConfig) {
        Object.assign(baseControl, typeConfig);
      }
    }

    // Aplicar configuración personalizada
    if (customConfig) {
      Object.assign(baseControl, customConfig);
    }

    return baseControl;
  }

  /**
   * Agrupa controles automáticamente por su propiedad 'group'
   * Si explicitGroups es un array vacío, crea un solo grupo sin título con todos los controles
   */
  static groupControlsAutomatically(controls: PlaygroundControl[], explicitGroups?: PlaygroundGroup[]): PlaygroundGroup[] {
    // Si se especifica explícitamente un array vacío, crear un solo grupo sin título
    if (explicitGroups && explicitGroups.length === 0) {
      return [{
        id: 'all',
        label: '',
        description: '',
        controls: controls
      }];
    }

    const groupMap = new Map<string, PlaygroundControl[]>();

    // Agrupar controles
    controls.forEach(control => {
      const groupKey = control.group || 'advanced';
      if (!groupMap.has(groupKey)) {
        groupMap.set(groupKey, []);
      }
      groupMap.get(groupKey)!.push(control);
    });

    // Convertir a grupos con metadata
    const groups: PlaygroundGroup[] = [];
    
    // Ordenar grupos según prioridad
    const groupOrder = ['content', 'layout', 'behavior', 'styling', 'advanced'];
    
    groupOrder.forEach(groupKey => {
      if (groupMap.has(groupKey)) {
        const groupInfo = this.DEFAULT_GROUPS[groupKey];
        groups.push({
          id: groupKey,
          label: groupInfo.label,
          description: groupInfo.description,
          controls: groupMap.get(groupKey)!
        });
      }
    });

    // Agregar grupos adicionales que no estén en el orden predefinido
    groupMap.forEach((controls, groupKey) => {
      if (!groupOrder.includes(groupKey)) {
        groups.push({
          id: groupKey,
          label: this.formatLabel(groupKey),
          description: `Configuraciones de ${this.formatLabel(groupKey).toLowerCase()}`,
          controls
        });
      }
    });

    return groups.filter(group => group.controls.length > 0);
  }

  /**
   * Convierte un nombre de prop en un label legible
   */
  private static formatLabel(propName: string): string {
    return propName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  /**
   * Crea controles específicos para componentes basándose en una configuración externa
   * Esta función reemplaza las configuraciones hardcodeadas anteriores
   */
  static createComponentControls(
    externalConfig?: Record<string, Partial<PlaygroundControl>>
  ): Record<string, Partial<PlaygroundControl>> {
    return externalConfig || {};
  }
}
