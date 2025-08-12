import React from 'react';
import type { ComponentSpecificConfig } from '../../types/component';

export const edeskLayoutConfig: ComponentSpecificConfig = {
  componentName: 'EdeskLayout',
  
  // Procesador específico para children
  childrenProcessor: (children: unknown, componentName: string) => {
    if (children && typeof children === 'string' && children.trim()) {
      // Crear un elemento div con el contenido string para componentes que esperan React nodes
      if (componentName === 'EdeskLayout') {
        return React.createElement('div', {}, children);
      }
    }
    return children as React.ReactNode;
  },

  // Estrategia de renderizado estándar con children
  renderStrategy: 'standard'
};
