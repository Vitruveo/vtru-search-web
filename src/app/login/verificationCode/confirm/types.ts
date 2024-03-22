import { FormikErrors } from 'formik';

import { FormikDefaultProps } from '@/app/common/types';

interface OTPConfirmFormValues {
    code: string;
    disableSubmitButton: boolean;
}

type OTPConfirmFormErros = FormikErrors<OTPConfirmFormValues>;

export interface OTPConfirmViewProps extends FormikDefaultProps<OTPConfirmFormValues> {
    values: OTPConfirmFormValues;
    errors: OTPConfirmFormErros;
    handleResendCode: () => void;
}
