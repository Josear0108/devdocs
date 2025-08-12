import React, { useState, useRef, useEffect } from 'react';
import '../../styles/ui/SelectCheck.css';

export interface SelectCheckProps {
  options: Array<string | number>;
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

const SelectCheck: React.FC<SelectCheckProps> = ({
  options,
  value,
  onChange,
  label,
  description,
  required = false,
  disabled = false,
  placeholder = 'Selecciona...',
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const renderChips = () => {
    // Mostrar solo las primeras opciones que quepan, el resto se indica con el contador
    const maxVisibleChips = Math.max(1, Math.min(value.length, 3)); // Máximo 3 chips visibles
    const visibleValues = value.slice(0, maxVisibleChips);
    const remainingCount = value.length - visibleValues.length;
    
    return (
      <div className="selectcheck-chips">
        {visibleValues.map((v) => (
          <span key={v} className="selectcheck-chip" title={v}>
            <span className="selectcheck-chip-text">{v}</span>
            <button
              type="button"
              className="selectcheck-chip-remove"
              onClick={e => {
                e.stopPropagation();
                onChange(value.filter(val => val !== v));
              }}
              tabIndex={-1}
              aria-label={`Quitar ${v}`}
            >×</button>
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="selectcheck-chip selectcheck-chip-count">
            +{remainingCount}
          </span>
        )}
      </div>
    );
  };

  const renderDropdown = () => {
    if (!open) return null;
    
    return (
      <div className="selectcheck-dropdown">
        <div className="selectcheck-options">
          {options.length === 0 && (
            <div className="selectcheck-no-options">Sin opciones</div>
          )}
          {options.map((option) => {
            const optionStr = String(option);
            const checked = value.includes(optionStr);
            return (
              <label key={optionStr} className="selectcheck-option">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  onChange={() => {
                    if (disabled) return;
                    
                    let newValue = [...value];
                    if (checked) {
                      newValue = newValue.filter((v) => v !== optionStr);
                    } else {
                      newValue.push(optionStr);
                    }
                    onChange(newValue);
                  }}
                />
                {optionStr}
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="selectcheck-multiselect" ref={ref}>
      {label && (
        <label className="selectcheck-label-main">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      {description && <p className="selectcheck-description">{description}</p>}
      <div
        className={`selectcheck-input ${disabled ? 'disabled' : ''}`}
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={label || placeholder}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) setOpen(o => !o);
          }
        }}
        tabIndex={disabled ? -1 : 0}
      >
        {value.length === 0 ? (
          <span className="selectcheck-placeholder">{placeholder}</span>
        ) : renderChips()}
        <span className="selectcheck-arrow">▼</span>
      </div>
      {renderDropdown()}
    </div>
  );
};

export default SelectCheck;
