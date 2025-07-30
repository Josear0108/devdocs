// src/components/ui/Documentation.tsx
import React from 'react';
import Playground from '../../pages/components/PlaygroundControl';
import { Tabs } from './TabsEdesk';
import { BlockRenderer } from './BlockRenderer';
import type { ComponentItem } from '../../types/component';
import { motion } from 'framer-motion';

interface DocumentationProps {
  componentItem: ComponentItem;
  playgroundProps?: Record<string, any>;
  onPlaygroundPropsChange?: (props: Record<string, any>) => void;
}

const containerAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  }
};

export const Documentation: React.FC<DocumentationProps> = ({
  componentItem,
  playgroundProps = {},
  onPlaygroundPropsChange = () => { }
}) => {
  const { tabs, playground, component: PlaygroundComponent } = componentItem;
  const defaultTabId = tabs.length > 0 ? tabs[0].id : '';

  return (
    <Tabs defaultActiveId={defaultTabId}>
      <Tabs.List>
        {tabs.map(tab => (
          <Tabs.Trigger key={tab.id} tabId={tab.id}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Panels>
        {tabs.map((tab) => (
          <Tabs.Panel key={tab.id} tabId={tab.id}>
            {tab.id === 'playground' && playground && PlaygroundComponent ? (
              <motion.div
                key="playground"
                className=""
                variants={containerAnimation}
                initial="hidden"
                animate="visible"
              >
                <Playground
                  component={PlaygroundComponent}
                  controls={playground.controls}
                  initialProps={playgroundProps}
                  onPropsChange={onPlaygroundPropsChange}
                />
              </motion.div>
            ) : (
              tab.sections.map((section, si) => (
                <motion.div
                  key={si}
                  className=""
                  variants={containerAnimation}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="doc-section">
                    <h2 className="doc-section-title">{section.title}</h2>
                    {section.blocks.map((block, bi) => (
                      <BlockRenderer key={bi} block={block} />
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </Tabs.Panel>
        ))}
      </Tabs.Panels>
    </Tabs>
  );
};
