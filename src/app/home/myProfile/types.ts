import { FormikErrors } from 'formik';
import { FormikDefaultProps } from '@/app/common/types';

interface Wallet {
    address: string;
}

export interface EmailFormValues {
    email: string;
    checkedAt: Date | null;
    sentCode: boolean;
}

export interface AccountSettingsFormValues {
    name: string;
    avatar?: string;
    emails: EmailFormValues[];
    wallets: Wallet[];
}

type AccountSettingsFormErros = FormikErrors<AccountSettingsFormValues>;

export interface AccountSettingsProps extends FormikDefaultProps<AccountSettingsFormValues> {
    values: AccountSettingsFormValues;
    errors: AccountSettingsFormErros;
    setErrors: (errors: AccountSettingsFormErros) => void;
}
