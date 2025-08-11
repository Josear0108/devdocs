import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const renderChips = () => (
    <div className="selectcheck-chips">
      {value.slice(0, 2).map((v) => (
        <span key={v} className="selectcheck-chip">
          {v}
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
      {value.length > 2 && (
        <span className="selectcheck-chip selectcheck-chip-count">
          +{value.length - 2}
        </span>
      )}
    </div>
  );

  const renderDropdown = () => {
    if (!open || !ref.current) return null;
    
    const rect = ref.current.getBoundingClientRect();
    
    return createPortal(
      <div
        ref={dropdownRef}
        className="selectcheck-dropdown"
        style={{
          top: `${rect.bottom + 4}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
        }}
      >
        <div className="selectcheck-options">
          {options.length === 0 && (
            <div className="selectcheck-no-options">Sin opciones</div>
          )}
          {options.map((option) => {
            const optionStr = String(option);
            const checked = value.includes(optionStr);
            const onlyOneSelected = value.length === 1 && checked;
            return (
              <label key={optionStr} className="selectcheck-option">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled || onlyOneSelected}
                  onChange={() => {
                    let newValue = [...value];
                    if (checked) {
                      if (newValue.length > 1) {
                        newValue = newValue.filter((v) => v !== optionStr);
                      }
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
      </div>,
      document.body
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
