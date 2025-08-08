import React from 'react';
import Playground from '../../pages/components/PlaygroundControl';
import { UniversalPlayground } from './UniversalPlayground';
import { Tabs } from './TabsEdesk';
import { CopyButton } from './CopyButton';
import { BlockRenderer } from './BlockRenderer';
import { horizontalTabAnimation, verticalTabAnimation } from '../../lib/animations';
import type { ComponentItem, Recipe } from '../../types/component';
import '../../styles/universal-playground.css';

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

  const { tabs, playground, playgroundConfig, recipes, component: PlaygroundComponent } = componentItem;
  const defaultTabId = tabs.length > 0 ? tabs[0].id : '';
  const orientation = componentItem.type === 'guide' ? 'vertical' : 'horizontal';
  const animation = orientation === 'vertical' ? verticalTabAnimation : horizontalTabAnimation;

  const renderContent = (tabId: string) => {
    if (tabId === 'playground' && PlaygroundComponent) {
      // Usar el nuevo sistema universal si hay playgroundConfig
      if (playgroundConfig && PlaygroundComponent) {
        const fullConfig = {
          ...playgroundConfig,
          component: PlaygroundComponent,
          componentName: componentItem.name // Agregar el nombre del componente
        };
        
        return (
          <>
            <UniversalPlayground
              config={fullConfig}
              onPropsChange={onPlaygroundPropsChange}
            />
            {/* Si hay recetas, las mostramos debajo del playground */}
            {recipes && recipes.length > 0 && (
              <ComponentRecipes recipes={recipes} onApplyRecipe={onPlaygroundPropsChange} />
            )}
          </>
        );
      }
      
      // Fallback al sistema anterior si no hay playgroundConfig pero sí playground
      if (playground) {
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
    }

    const currentTab = tabs.find(t => t.id === tabId);
    return currentTab?.sections.map((section, si) => (
      <div key={`section-${tabId}-${si}`} className="doc-section">
        {section.title && section.title.trim() !== '' && (
          <h2 className="doc-section-title">{section.title}</h2>)}
        {section.blocks.map((block, bi) => (
          <BlockRenderer key={`block-${tabId}-${si}-${bi}`} block={block} />
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