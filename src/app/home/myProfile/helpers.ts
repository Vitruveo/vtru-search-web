import * as yup from 'yup';
import { AxiosError } from 'axios';
import { debounce } from 'lodash';

// import { checkCreatorUsernameExist } from '@/features/user/requests';
// import { CreatorUsernameExistApiRes } from '@/features/user/types';
import { codesVtruApi } from '@/services/codes';

export const debouncedUsernameValidation = debounce(async (username, setFieldError) => {
    try {
        const res = {};

        if (codesVtruApi.success.user.includes(res?.code as string)) {
            setFieldError('Username already exists');
        }
    } catch (e) {
        const error = e as AxiosError;
        setFieldError('');
    }
}, 700);

export const validateEmailFormValue = yup.object({
    email: yup.string().email('Invalid email address').required('field email is required.'),
});
