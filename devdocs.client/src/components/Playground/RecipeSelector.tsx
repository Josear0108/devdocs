import React from 'react';
import type { Recipe } from '../../types/component';
import '../../styles/ui/RecipeSelector.css';

interface RecipeSelectorProps {
  recipes: Recipe[];
  onApplyRecipe: (recipe: Recipe) => void;
}

export const RecipeSelector: React.FC<RecipeSelectorProps> = ({ recipes, onApplyRecipe }) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent, recipe: Recipe) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onApplyRecipe(recipe);
    }
  };

  return (
    <div className="recipe-selector">
      <div className="recipe-header">
        <h4 className="recipe-title">📚 Recetas de Uso</h4>
        <p className="recipe-description">
          Configuraciones predefinidas para casos de uso comunes
        </p>
      </div>
      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => onApplyRecipe(recipe)}
            onKeyDown={(e) => handleKeyDown(e, recipe)}
            role="button"
            tabIndex={0}
            aria-label={`Aplicar receta: ${recipe.title}`}
          >
            <div className="recipe-card-header">
              <span className="recipe-icon">{recipe.icon}</span>
              <h5 className="recipe-card-title">{recipe.title}</h5>
            </div>
            <p className="recipe-card-description">{recipe.description}</p>
            <div className="recipe-card-action">
              <span className="recipe-apply-text">Aplicar configuración</span>
              <span className="recipe-arrow">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
