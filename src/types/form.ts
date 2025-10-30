export type FormFieldType = 'text' | 'textarea' | 'select' | 'date';

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
}
