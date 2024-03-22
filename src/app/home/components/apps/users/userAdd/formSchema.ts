import * as yup from 'yup';

export const userAddSchemaValidation = yup.object({
  name: yup.string().min(3, 'name field needs at least 3 characters').required('field name is required.'),
  email: yup.string().email('invalid email').required('field email is required.'),
});
