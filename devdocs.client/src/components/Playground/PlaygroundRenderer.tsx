import React from 'react';
import { UniversalPlayground } from './UniversalPlayground';
import type { ComponentItem } from '../../types/component';

interface PlaygroundRendererProps {
  componentItem: ComponentItem;
  onPropsChange?: (props: Record<string, unknown>) => void;
  externalProps?: Record<string, unknown>;
}

export const PlaygroundRenderer: React.FC<PlaygroundRendererProps> = ({
  componentItem,
  onPropsChange = () => {},
  externalProps
}) => {
  const { playgroundConfig, component: PlaygroundComponent } = componentItem;

  // Solo renderizar si tenemos playgroundConfig y componente
  if (!playgroundConfig || !PlaygroundComponent) {
    return (
      <div className="no-playground">
        <p>No hay playground configurado para este componente.</p>
      </div>
    );
  }

  const fullConfig = {
    ...playgroundConfig,
    component: PlaygroundComponent,
    componentName: playgroundConfig.componentName || componentItem.name
  };

  return (
    <UniversalPlayground
      config={fullConfig}
      onPropsChange={onPropsChange}
      externalProps={externalProps}
    />
  );
};
