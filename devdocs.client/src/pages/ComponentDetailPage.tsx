// src/pages/ComponentDetailPage.tsx
"use client"

import React, { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { PageHeader } from "../components/ui/PageHeader"
import { componentsData } from "../data/components"
import { FileUploadContainer } from 'edesk-components'
import { CopyButton } from "../components/ui/CopyButton"
import type { PlaygroundControl, Recipe, ComponentItem, Block } from "../types/component"
import "../styles/component-detail.css"

// --- Tipos Específicos para este Módulo ---

/**
 * Define la estructura de las props que el componente de ejemplo puede recibir.
 * Es un objeto donde cada clave es el nombre de una prop y su valor puede ser string, number o boolean.
 */
type ComponentProps = Record<string, string | number | boolean>;

// --- Componentes Internos de la Página ---

/**
 * Props para el componente Playground.
 * @param controls - Array de configuraciones para los controles del playground.
 * @param onPropsChange - Función que se llama cuando las props del componente cambian.
 * @param initialProps - Estado inicial de las props para el componente visual.
 */
interface PlaygroundProps {
  controls: PlaygroundControl[];
  onPropsChange: (props: ComponentProps) => void;
  initialProps: ComponentProps;
}

const Playground: React.FC<PlaygroundProps> = ({ controls, onPropsChange, initialProps }) => {
  // Estado interno para gestionar las props del playground, estrictamente tipado.
  const [props, setProps] = useState<ComponentProps>(initialProps);

  // Efecto para sincronizar el estado si las props iniciales cambian (ej. al aplicar una receta).
  useEffect(() => {
    setProps(initialProps);
  }, [initialProps]);

  /**
   * Maneja el cambio en cualquier control del playground y actualiza el estado.
   * @param prop - El nombre de la prop del componente a modificar.
   * @param value - El nuevo valor para la prop.
   */
  const handleControlChange = (prop: string, value: string | number | boolean) => {
    const newProps = { ...props, [prop]: value };
    setProps(newProps);
    onPropsChange(newProps);
  };

  /**
   * Determina si un control debe ser visible basado en sus condiciones
   */
  const isControlVisible = (control: PlaygroundControl): boolean => {
    if (!control.showWhen) return true;
    return props[control.showWhen.prop] === control.showWhen.value;
  };

  /**
   * Determina si un control debe estar habilitado basado en sus condiciones
   */
  const isControlEnabled = (control: PlaygroundControl): boolean => {
    if (!control.enableWhen) return true;
    return props[control.enableWhen.prop] === control.enableWhen.value;
  };

  /**
   * Genera dinámicamente el string de código JSX para mostrarlo en el panel de "Código en Vivo".
   * @returns Un string formateado del componente con sus props actuales.
   */
  const generateCodeString = (): string => {
    // Incluir props obligatorias que no están en los controles
    const requiredProps = {
      uploadUrl: '"https://cargue.sycpruebas.com/servicioweb.svc"',
      encryptedPath: '"ruta-cifrada-de-ejemplo"',
      acceptedFileTypes: "['pdf', 'jpg', 'png', 'docx']"
    };

    const allProps = { ...props };
    // Convertir maxFileSize de MB a bytes para el código mostrado
    if (allProps.maxFileSize) {
      allProps.maxFileSize = `${(allProps.maxFileSize as number) * 1024 * 1024} // ${allProps.maxFileSize}MB`;
    }

    return `<FileUploadContainer
${Object.entries(allProps)
  .map(([key, value]) => {
    if (typeof value === 'string') {
      return `  ${key}="${value}"`;
    }
    if (typeof value === 'boolean') {
      // Solo mostrar la prop booleana si es true, como es común en React.
      return value ? `  ${key}` : '';
    }
    if (typeof value === 'number') {
      return `  ${key}={${value}}`;
    }
    return '';
  })
  .filter(Boolean) // Filtra las props vacías (ej. booleanos en false)
  .concat(
    Object.entries(requiredProps).map(([key, value]) => `  ${key}=${value}`)
  )
  .join('\n')}
/>`;
  };

  return (
    <div className="playground-grid">
      {/* Panel de Visualización */}
      <div className="playground-visual-panel">
        <FileUploadContainer
          uploadUrl="https://cargue.sycpruebas.com/servicioweb.svc"
          encryptedPath="ruta-cifrada-de-ejemplo"
          acceptedFileTypes={['pdf', 'jpg', 'png', 'docx']}
          {...props}
          maxFileSize={((props.maxFileSize as number) || 10) * 1024 * 1024} // Convertir MB a bytes (debe ir después de ...props)
        />
      </div>

      {/* Panel de Controles */}
      <div className="playground-controls-panel">
        <h3 className="panel-title">Controles</h3>
        <div className="controls-grid">
          {controls
            .filter(control => isControlVisible(control))
            .map(control => {
              const isEnabled = isControlEnabled(control);
              const controlClass = `control-item ${!isEnabled ? 'disabled' : ''}`;
              
              return (
                <div key={control.prop} className={controlClass}>
                  <label>{control.label}</label>
                  {control.type === 'radio' && control.options && (
                    <div className="radio-group">
                      {control.options.map(opt => (
                        <label key={opt}>
                          <input
                            type="radio"
                            name={control.prop}
                            value={opt}
                            checked={props[control.prop] === opt}
                            onChange={() => handleControlChange(control.prop, opt)}
                            disabled={!isEnabled}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                  {control.type === 'text' && (
                     <input
                        type="text"
                        value={String(props[control.prop] || '')}
                        onChange={(e) => handleControlChange(control.prop, e.target.value)}
                        disabled={!isEnabled}
                     />
                  )}
                   {control.type === 'number' && (
                     <input
                        type="number"
                        value={Number(props[control.prop] || 0)}
                        onChange={(e) => handleControlChange(control.prop, parseInt(e.target.value, 10) || 0)}
                        disabled={!isEnabled}
                     />
                  )}
                  {control.type === 'boolean' && (
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={Boolean(props[control.prop])}
                        onChange={(e) => handleControlChange(control.prop, e.target.checked)}
                        disabled={!isEnabled}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Panel de Código en Vivo */}
      <div className="playground-code-panel">
         <h3 className="panel-title">Código en Vivo</h3>
         <div className="code-block-wrapper">
           <pre className="code-block">
             <code>{generateCodeString()}</code>
           </pre>
           <CopyButton text={generateCodeString()} />
         </div>
      </div>
    </div>
  );
}

/**
 * Props para el componente que muestra las recetas.
 * @param recipes - Array de recetas a mostrar.
 * @param onApplyRecipe - Función que se llama para aplicar las props de una receta al playground.
 */
interface ComponentRecipesProps {
  recipes: Recipe[];
  onApplyRecipe: (props: ComponentProps) => void;
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
}

const DocumentationTabs: React.FC<TabsProps> = ({ tabs }) => {
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
      <div className="tabs-header">
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
        {activeTabData?.sections?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="doc-section">
            <h2 className="doc-section-title">{section.title}</h2>
            {section.blocks.map((block, blockIndex) => renderBlock(block, blockIndex))}
          </div>
        ))}
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
  const initialProps: ComponentProps = useMemo(() => {
    if (!component?.playground?.controls) {
      return {};
    }
    return component.playground.controls.reduce((acc, control) => {
      acc[control.prop] = control.defaultValue;
      return acc;
    }, {} as ComponentProps);
  }, [component]);

  // Estado principal para las props del playground, que puede ser modificado por los controles o las recetas.
  const [playgroundProps, setPlaygroundProps] = useState<ComponentProps>(initialProps);

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

      {component.playground && (
        <Playground
            controls={component.playground.controls}
            onPropsChange={setPlaygroundProps}
            initialProps={playgroundProps}
        />
      )}

      {component.recipes && (
        <ComponentRecipes
            recipes={component.recipes}
            onApplyRecipe={setPlaygroundProps}
        />
      )}

      {component.tabs && component.tabs.length > 0 && (
        <DocumentationTabs tabs={component.tabs} />
      )}

      {/* Aquí podrías añadir el componente de Arquitectura en el futuro */}

    </motion.div>
  )
}

export default ComponentDetailPage;