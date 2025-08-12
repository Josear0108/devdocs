import React from 'react';
import SelectCheck from '../ui/SelectCheck';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import type { PlaygroundControl, ControlValue } from '../../types/component';

interface ControlRendererProps {
  control: PlaygroundControl;
  value: ControlValue | null | undefined;
  onChange: (value: ControlValue | null) => void;
  disabled?: boolean;
}

export const ControlRenderer: React.FC<ControlRendererProps> = ({
  control,
  value,
  onChange,
  disabled = false
}) => {
  const { type, label, required, description, options, min, max, step } = control;

  const renderControl = () => {
    switch (type) {
      case 'text':
        return (
          <div className="control-wrapper">
            <label className="control-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
            <Input
              type="text"
              value={value as string || ''}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="control-text"
            />
          </div>
        );

      case 'textarea':
        return (
          <div className="control-wrapper">
            <label className="control-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
            <textarea
              value={value as string || ''}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              className="control-textarea"
              rows={4}
            />
          </div>
        );

      case 'number':
      case 'range':
        return (
          <div className="control-wrapper">
            <label className="control-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
            <Input
              type={type}
              value={value as number || 0}
              onChange={(e) => onChange(Number(e.target.value))}
              disabled={disabled}
              min={min}
              max={max}
              step={step}
              className={`control-${type}`}
            />
            {type === 'range' && (
              <span className="range-value">{value as number || 0}</span>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div className="control-wrapper">
            <label className="control-label checkbox-label">
              <Input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="control-checkbox"
              />
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
          </div>
        );

      case 'switch':
        return (
          <div className="control-wrapper">
            <label className="control-label switch-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
            <div className="switch-container">
              <Input
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className="switch-input"
                id={`switch-${control.prop}`}
              />
              <label htmlFor={`switch-${control.prop}`} className="switch-slider" aria-label={`Toggle ${label}`}>
                <span className="switch-slider-inner"></span>
              </label>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="control-wrapper">
            <label className="control-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
            <div className="radio-group">
              {options?.map((option: string | number) => (
                <label key={String(option)} className="radio-label">
                  <Input
                    type="radio"
                    value={String(option)}
                    checked={value === option}
                    onChange={() => onChange(option)}
                    disabled={disabled}
                    className="control-radio"
                  />
                  {String(option)}
                </label>
              ))}
            </div>
          </div>
        );
      case 'select':
        return (
          <div className="control-wrapper">
            <label className="control-label">
              {label}
              {required && <span className="required">*</span>}
            </label>
            {description && <p className="control-description">{description}</p>}
            <Select
              value={String(value || options?.[0] || '')}
              onChange={(e) => {
                const selectedValue = e.target.value;
                const numValue = Number(selectedValue);
                onChange(isNaN(numValue) ? selectedValue : numValue);
              }}
              disabled={disabled}
              className="control-select"
            >
              {options?.map((option: string | number) => (
                <option key={String(option)} value={String(option)}>
                  {control.prop === 'maxFileSize' && typeof option === 'number' 
                    ? `${Math.round(option / 1048576)} MB`
                    : String(option)
                  }
                </option>
              ))}
            </Select>
          </div>
        );

      case 'select-check':
        return (
          <SelectCheck
            options={options || []}
            value={Array.isArray(value) ? value : []}
            onChange={(newValue: string[]) => onChange(newValue)}
            label={label}
            description={description}
            required={required}
            disabled={disabled}
          />
        );

      default:
        return null;
    }
  };

  return <>{renderControl()}</>;
};