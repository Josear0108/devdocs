import React from 'react';
import Playground from '../../pages/components/PlaygroundControl';
import { Tabs } from './TabsEdesk';
import { BlockRenderer } from './BlockRenderer';
import type { ComponentItem, Recipe } from '../../types/component';
import { horizontalTabAnimation, verticalTabAnimation } from '../../lib/animations';
import { CopyButton } from './CopyButton';

// --- Componente interno para renderizar las recetas ---
const ComponentRecipes: React.FC<{ recipes: Recipe[]; onApplyRecipe: (props: Record<string, unknown>) => void }> = ({ recipes, onApplyRecipe }) => (
  <div className="recipes-section">
    <h2 className="section-title">Recetario de Casos de Uso</h2>
    <div className="recipes-grid">
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <div className="recipe-header">
            <h3>{recipe.title}</h3>
          </div>
          <p>{recipe.description}</p>
          <div className="code-block-wrapper">
            <pre className="code-block-sm"><code>{recipe.code}</code></pre>
            <CopyButton text={recipe.code} />
          </div>
          <button className="recipe-button" onClick={() => onApplyRecipe(recipe.props)}>
            Probar esta configuración
          </button>
        </div>
      ))}
    </div>
  </div>
);


interface DocumentationProps {
  componentItem: ComponentItem;
  playgroundProps?: Record<string, unknown>;
  onPlaygroundPropsChange?: (props: Record<string, unknown>) => void;
}

export const Documentation: React.FC<DocumentationProps> = ({
  componentItem,
  playgroundProps = {},
  onPlaygroundPropsChange = () => { }
}) => {
  const { tabs, playground, recipes, component: PlaygroundComponent } = componentItem;
  const defaultTabId = tabs.length > 0 ? tabs[0].id : '';

  const orientation = componentItem.type === 'guide' ? 'vertical' : 'horizontal';
  const animation = orientation === 'vertical' ? verticalTabAnimation : horizontalTabAnimation;

  const renderContent = (tabId: string) => {
    if (tabId === 'playground' && playground && PlaygroundComponent) {
      return (
        <>
          <Playground
            component={PlaygroundComponent}
            controls={playground.controls}
            initialProps={playgroundProps as Record<string, string | number | boolean | string[]>}
            onPropsChange={onPlaygroundPropsChange}
          />
          {/* Si hay recetas, las mostramos debajo del playground */}
          {recipes && recipes.length > 0 && (
            <ComponentRecipes recipes={recipes} onApplyRecipe={onPlaygroundPropsChange} />
          )}
        </>
      );
    }
    
    const currentTab = tabs.find(t => t.id === tabId);
    return currentTab?.sections.map((section, si) => (
      <div key={si} className="doc-section">
        <h2 className="doc-section-title">{section.title}</h2>
        {section.blocks.map((block, bi) => (
          <BlockRenderer key={bi} block={block} />
        ))}
      </div>
    ));
  };

  return (
    <div className={`documentation-layout ${orientation === 'vertical' ? 'documentation-layout-vertical' : 'documentation-layout-horizontal'}`}>
      <Tabs defaultActiveId={defaultTabId} orientation={orientation}>
        {orientation === 'vertical' && (
          <Tabs.Panels className="documentation-panels-vertical">
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.id} tabId={tab.id} animationVariants={animation}>
                {renderContent(tab.id)}
              </Tabs.Panel>
            ))}
          </Tabs.Panels>
        )}

        <Tabs.List>
          {tabs.map(tab => (
            <Tabs.Trigger key={tab.id} tabId={tab.id}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {orientation === 'horizontal' && (
          <Tabs.Panels className="documentation-panels-horizontal">
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.id} tabId={tab.id} animationVariants={animation}>
                {renderContent(tab.id)}
              </Tabs.Panel>
            ))}
          </Tabs.Panels>
        )}
      </Tabs>
    </div>
  );
};