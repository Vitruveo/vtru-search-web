import { FormikErrors } from 'formik';

export interface FormikDefaultProps<T> {
    validateForm?: () => Promise<FormikErrors<T>>;
    setFieldError: (field: string, value: string | undefined) => void;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<T>>;
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export interface ShowModalProps {
    showModal: boolean;
    handleChangeModal: () => void;
}
