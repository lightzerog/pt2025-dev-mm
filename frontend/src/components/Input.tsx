import styled from 'styled-components';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

const Wrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  padding: 0.5rem;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : '#ccc')};
  border-radius: 4px;
  width: 100%;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.75rem;
`;

export function Input<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = 'text',
  placeholder,
  onValueChange,
}: InputProps<T>) {
  return (
    <Wrapper>
      <Label htmlFor={String(name)}>{label}</Label>
      <StyledInput
        id={String(name)}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        onChange={(e) => {
          register(name).onChange(e);
          onValueChange?.(e.target.value);
        }}
        $hasError={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
}
