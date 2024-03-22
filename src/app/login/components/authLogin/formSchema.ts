import * as yup from 'yup';

export const loginSchemaValidation = yup.object({
    email: yup
        .string()
        .email()
        .when('wallet', {
            is: (wallet: string) => !wallet || wallet.length === 0,
            then: yup.string().required('field email is required.'),
            otherwise: yup.string(),
        }),
    wallet: yup.string(),
});
