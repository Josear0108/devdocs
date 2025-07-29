"use client"

import React, { useState, useEffect, useMemo, type ComponentProps } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import "../../styles/component-detail.css"
import { CopyButton } from "../../components/ui/CopyButton"
import { PageHeader } from "../../components/ui/PageHeader"
import { componentsData } from "../../data/components"
import type { Recipe, ComponentItem, Block } from "../../types/component"
import Playground from "./PlaygroundControl"


/**
 * Props para el componente que muestra las recetas.
 * @param recipes - Array de recetas a mostrar.
 * @param onApplyRecipe - Función que se llama para aplicar las props de una receta al playground.
 */
interface ComponentRecipesProps {
  recipes: Recipe[];
  onApplyRecipe: (props: ComponentProps<any>) => void;
}

const ComponentRecipes: React.FC<ComponentRecipesProps> = ({ recipes, onApplyRecipe }) => (
  <div className="recipes-section">
    <h2 className="section-title">Recetario de Casos de Uso</h2>
    <div className="recipes-grid">
      {recipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <div className="recipe-header">
            <i className={`fas fa-${recipe.icon}`}></i>
            <h3>{recipe.title}</h3>
          </div>
          <p>{recipe.description}</p>
          <div className="code-block-wrapper">
            <pre className="code-block-sm"><code>{recipe.code}</code></pre>
            <CopyButton text={recipe.code} />
          </div>
          <button onClick={() => onApplyRecipe(recipe.props)}>
            <i className="fas fa-play-circle"></i> Probar esta configuración
          </button>
        </div>
      ))}
    </div>
  </div>
);

// --- Componente para Tabs de Documentación ---

interface TabsProps {
  tabs: ComponentItem['tabs'];
  playground?: ComponentItem['playground'];
  recipes?: Recipe[];
  playgroundComponent?: any;
  playgroundProps?: ComponentProps<any>;
  onPlaygroundPropsChange?: (props: ComponentProps<any>) => void;
}

const DocumentationTabs: React.FC<TabsProps> = ({
  tabs,
  playground,
  recipes,
  playgroundComponent,
  playgroundProps,
  onPlaygroundPropsChange
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'text':
        return <p key={index} className="doc-text">{block.content}</p>;
      case 'code':
        return (
          <div key={index} className="code-block-wrapper">
            <pre className="code-block">
              <code>{block.code}</code>
            </pre>
            <CopyButton text={block.code} />
          </div>
        );
      case 'list':
        return (
          <ul key={index} className="doc-list">
            {block.items.map((item: string, itemIndex: number) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      case 'table':
        return (
          <div key={index} className="doc-table-wrapper">
            <table className="doc-table">
              <thead>
                <tr>
                  {block.columns.map((col: string, colIndex: number) => (
                    <th key={colIndex}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(block.rows as string[][]).map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex}>
                    {row.map((cell: string, cellIndex: number) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="documentation-tabs">
      <div className="tabs-header no-scroll-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'playground' ? (
          <>
            {playground && playgroundComponent && (
              <Playground
                component={playgroundComponent}
                controls={playground.controls}
                onPropsChange={onPlaygroundPropsChange}
                initialProps={playgroundProps}
              />
            )}
            {recipes && recipes.length > 0 && (
              <ComponentRecipes
                recipes={recipes}
                onApplyRecipe={onPlaygroundPropsChange!}
              />
            )}
          </>
        ) : (
          activeTabData?.sections?.map((section, sectionIndex) => (
            <div key={sectionIndex} className="doc-section">
              <h2 className="doc-section-title">{section.title}</h2>
              {section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Componente Principal de la Página ---

const ComponentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();

  // Encuentra el componente actual usando el slug de la URL.
  // Usamos useMemo para evitar recalcular esto en cada render.
  const component: ComponentItem | undefined = useMemo(() =>
    componentsData.find(c => c.id === slug),
    [slug]
  );

  // Calcula las props iniciales para el playground a partir de los datos del componente.
  // useMemo optimiza para que no se recalcule a menos que el componente cambie.
  const initialProps: ComponentProps<any> = useMemo(() => {
    if (!component?.playground?.controls) {
      return {};
    }
    return component.playground.controls.reduce((acc, control) => {
      acc[control.prop] = control.defaultValue;
      return acc;
    }, {} as ComponentProps<any>);
  }, [component]);

  // Estado principal para las props del playground, que puede ser modificado por los controles o las recetas.
  const [playgroundProps, setPlaygroundProps] = useState<ComponentProps<any>>(initialProps);

  // Si el componente cambia (ej. navegación), reseteamos el estado del playground.
  useEffect(() => {
    setPlaygroundProps(initialProps);
  }, [initialProps]);


  if (!component) {
    return (
      <div className="container">
        <PageHeader title="Componente no encontrado" description="El componente que buscas no existe en la base documental." />
      </div>
    )
  }

  return (
    <motion.div
      className="container component-detail-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader title={component.name} description={component.description} />
      {component.tabs && component.tabs.length > 0 && (
        <DocumentationTabs
          tabs={component.tabs}
          playground={component.playground}
          recipes={component.recipes}
          playgroundComponent={component.component}
          playgroundProps={playgroundProps}
          onPlaygroundPropsChange={setPlaygroundProps}
        />
      )}
      {/* Aquí podrías añadir el componente de Arquitectura en el futuro */}
    </motion.div>
  )
}

export default ComponentDetailPage;