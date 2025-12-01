'use client';

import { useThemeColors } from '@/hooks/useThemeColors';
import { transitions } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export function FormField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
}: FormFieldProps) {
  const theme = useThemeColors();

  return (
    <div>
      <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || label}
        className={cn(
          'h-11 border text-gray-900 dark:text-white',
          theme.input,
          'focus:ring-2',
          transitions.default
        )}
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: SelectFieldProps) {
  const theme = useThemeColors();

  return (
    <div>
      <label className={cn('block text-sm font-medium mb-2', theme.textSecondary)}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full h-11 px-3 border rounded-md text-gray-900 dark:text-white',
          theme.input,
          'focus:ring-2',
          transitions.default
        )}
      >
        <option value="">{placeholder || label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
