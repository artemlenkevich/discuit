import { useField } from 'formik';

import { Input } from '@/components/ui/Input';
import { ValidationErrorMessage } from '@/components/ValidationErrorMessage';

import styles from './ModalInput.module.scss';

interface ModalInputProps {
  label: string;
  type: string;
  name: string;
}

export const ModalInput: React.FC<ModalInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={styles.inputWrapper}>
      <Input fullWidth label={label} {...field} {...props} />
      {meta.touched && meta.error ? <ValidationErrorMessage message={meta.error} /> : null}
    </div>
  );
};
