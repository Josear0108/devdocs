// Archivo centralizado para todas las animaciones de Framer Motion

import type { Variants } from 'framer-motion';

// ANIMACIONES DE PÁGINA (Para contenedores principales)

export const pageAnimation: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

// ANIMACIONES DE ELEMENTOS (Para elementos individuales)

export const itemAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  }
};

// ANIMACIONES ESPECÍFICAS DE DOCUMENTACIÓN

// Para pestañas horizontales (componentes)
export const horizontalTabAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
};

// Para pestañas verticales (guías)
export const verticalTabAnimation: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
};

// ANIMACIÓN HEREDADA (Para mantener compatibilidad)

// Esta es la animación que se usaba antes 
export const containerAnimation: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  }
};

// FACTORY FUNCTION: Creador de animaciones personalizadas

/**
 * Crea una animación personalizada con parámetros configurables
 * @param direction - Dirección de la animación ('up', 'down', 'left', 'right')
 * @param distance - Distancia del movimiento en píxeles
 * @param duration - Duración de la animación en segundos
 */
export const createCustomAnimation = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 20,
  duration: number = 0.3
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0 };
      case 'left':
      case 'right': return { x: 0 };
    }
  };

  return {
    hidden: { 
      opacity: 0, 
      ...getInitialPosition() 
    },
    visible: {
      opacity: 1,
      ...getFinalPosition(),
      transition: { duration }
    }
  };
};
