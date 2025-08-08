import React from 'react';
import type { CSSControl, CSSGroup } from '../../types/component';

// Componente para renderizar un solo control CSS
interface SingleCSSControlProps {
  control: CSSControl;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const SingleCSSControl: React.FC<SingleCSSControlProps> = ({
  control,
  value,
  onChange,
  disabled = false
}) => {
  const { type, label, options, min, max, step, unit, description } = control;

  const renderControl = () => {
    switch (type) {
      case 'color':
        return (
          <div className="css-color-control">
            <input
              type="color"
              value={value || control.defaultValue}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="css-color-preview"
            />
            <input
              type="text"
              value={value || control.defaultValue}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="css-color-input css-control-input"
              placeholder="#000000"
            />
          </div>
        );

      case 'range': {
        const currentValue = value || control.defaultValue;
        // Extraer el valor numérico del string con unidad
        const numericValue = parseFloat(currentValue.toString().replace(/[^\d.-]/g, '')) || min || 0;
        
        return (
          <div className="css-range-control">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={numericValue}
              onChange={(e) => {
                const newValue = e.target.value;
                const valueWithUnit = unit ? `${newValue}${unit}` : newValue;
                onChange(valueWithUnit);
              }}
              disabled={disabled}
              className="css-range-input"
            />
            <div className="css-range-value">
              {numericValue}{unit || ''}
            </div>
          </div>
        );
      }

      case 'select':
        return (
          <select
            value={value || control.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="css-control-input"
          >
            {options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            value={value || control.defaultValue}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className="css-control-input"
          />
        );
    }
  };

  return (
    <div className="css-control-item">
      <label className="css-control-label">
        {label}
        {description && <span className="control-description"> - {description}</span>}
      </label>
      {renderControl()}
    </div>
  );
};

// Componente principal para renderizar grupos de controles CSS
interface CSSControlRendererProps {
  group: CSSGroup;
  values: Record<string, string>;
  onChange: (variable: string, value: string) => void;
  componentProps?: Record<string, unknown>; // Props del componente para evaluar showWhen
}

export const CSSControlRenderer: React.FC<CSSControlRendererProps> = ({
  group,
  values,
  onChange,
  componentProps = {}
}) => {
  // Función para verificar si un control CSS debe ser visible
  const isCSSControlVisible = (control: CSSControl): boolean => {
    if (!control.showWhen) return true;
    
    // Si showWhen es un array de condiciones, todas deben cumplirse (AND)
    if (Array.isArray(control.showWhen)) {
      return control.showWhen.every(condition => {
        const currentValue = componentProps[condition.prop];
        const expectedValue = condition.value;
        
        // Si expectedValue es un array, verificar si currentValue está incluido
        if (Array.isArray(expectedValue)) {
          return expectedValue.includes(currentValue as string);
        }
        
        // Comparación directa para valores únicos
        return currentValue === expectedValue;
      });
    }
    
    // Condición única
    const currentValue = componentProps[control.showWhen.prop];
    const expectedValue = control.showWhen.value;
    
    // Si expectedValue es un array, verificar si currentValue está incluido
    if (Array.isArray(expectedValue)) {
      return expectedValue.includes(currentValue as string);
    }
    
    // Comparación directa para valores únicos
    return currentValue === expectedValue;
  };

  // Filtrar controles visibles
  const visibleControls = group.controls.filter(isCSSControlVisible);

  if (visibleControls.length === 0) return null;

  return (
    <div className="css-control-group">
      <h4>{group.label}</h4>
      {group.description && (
        <p className="group-description">{group.description}</p>
      )}
      
      <div className="css-controls-container">
        {visibleControls.map((control) => (
          <SingleCSSControl
            key={control.variable}
            control={control}
            value={values[control.variable] || ''}
            onChange={(value) => onChange(control.variable, value)}
          />
        ))}
      </div>
    </div>
  );
};
