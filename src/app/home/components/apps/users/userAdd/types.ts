import { FormikErrors } from 'formik';
import { FormikDefaultProps, ShowModalProps } from '@/app/common/types';

interface UserAddFormValues {
  name: string;
  email: string;
}

type UserAddFormErros = FormikErrors<UserAddFormValues>;

export interface UserAddProps extends FormikDefaultProps<UserAddFormValues>, ShowModalProps {
  values: UserAddFormValues;
  errors: UserAddFormErros;
}
