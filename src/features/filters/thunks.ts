import { nanoid } from '@reduxjs/toolkit';
import {
    userLoginReq,
    userAddReq,
    userOTPConfimReq,
    checkCreatorUsernameExist,
    checkCreatorEmailExist,
    addCreatorEmailExist,
    sendRequestUpload,
    changeCreator,
    sendEmailCode,
    verifyCode,
    changeAvatar,
    generalStorage,
    deleteAvatar,
    requestDeleteAvatar,
} from './requests';
import { userActionsCreators } from './slice';
import {
    UserAddApiRes,
    UserAddReq,
    UserLoginApiRes,
    UserLoginReq,
    UserOTPConfirmReq,
    UserOTPConfirmApiRes,
    CreatorUsernameExistApiRes,
    CreatorUsernameExistReq,
    CreatorEmailExistApiRes,
    CreatorEmailExistReq,
    AddCreatorEmailApiRes,
    AddCreatorEmailReq,
    CreatorSendRequestUploadApiRes,
    CreatorSendRequestUploadReq,
    SendEmailCodeApiRes,
    SendEmailCodeReq,
    VerifyCodeReq,
    VerifyCodeApiRes,
    ChangeAvatarReq,
    ChangeAvatarApiRes,
    GeneralStorageAvatarReq,
} from './types';
import { ReduxThunkAction } from '@/store';
import { AccountSettingsFormValues } from '@/app/home/myProfile/types';

export function userLoginThunk(payload: UserLoginReq): ReduxThunkAction<Promise<UserLoginApiRes>> {
    return async function (dispatch, getState) {
        const response = await userLoginReq({ email: payload.email, wallet: payload.wallet });

        if (payload.email) dispatch(userActionsCreators.login({ email: payload.email }));

        return response;
    };
}

export function userOTPConfirmThunk(payload: UserOTPConfirmReq): ReduxThunkAction<Promise<UserOTPConfirmApiRes>> {
    return async function (dispatch, getState) {
        const response = await userOTPConfimReq({ email: payload.email, code: payload.code });
        if (response) {
            await dispatch(userActionsCreators.loginSuccess(response));
        }

        return response;
    };
}

export function userAddThunk(payload: UserAddReq): ReduxThunkAction<Promise<UserAddApiRes>> {
    return async function (dispatch, getState) {
        const response = await userAddReq({ name: payload.name, email: payload.email });
        return response;
    };
}

export function checkCreatorUsernameExistThunk(
    payload: CreatorUsernameExistReq
): ReduxThunkAction<Promise<CreatorUsernameExistApiRes>> {
    return async function (dispatch, getState) {
        const response = await checkCreatorUsernameExist({ username: payload.username });
        return response;
    };
}

export function checkCreatorEmailExistThunk(
    payload: CreatorEmailExistReq
): ReduxThunkAction<Promise<CreatorEmailExistApiRes>> {
    return async function (dispatch, getState) {
        const response = await checkCreatorEmailExist({ email: payload.email });
        return response;
    };
}

export function addCreatorEmailThunk(payload: AddCreatorEmailReq): ReduxThunkAction<Promise<AddCreatorEmailApiRes>> {
    return async function (dispatch, getState) {
        const user = getState().user;

        const response = await addCreatorEmailExist({ id: user._id, email: payload.email, framework: user.framework });

        await dispatch(sendEmailThunk({ email: payload.email }));

        return response;
    };
}

export function sendEmailThunk(payload: SendEmailCodeReq): ReduxThunkAction<Promise<SendEmailCodeApiRes>> {
    return async function (dispatch, getState) {
        const response = await sendEmailCode({ email: payload.email });
        return response;
    };
}

export function verifyCodeThunk(payload: VerifyCodeReq): ReduxThunkAction<Promise<VerifyCodeApiRes>> {
    return async function (dispatch, getState) {
        const response = await verifyCode({ email: payload.email, code: payload.code });
        dispatch(userActionsCreators.change({ profile: response.data?.profile }));
        return response;
    };
}

export function saveProfileThunk(payload: AccountSettingsFormValues): ReduxThunkAction<void> {
    return async function (dispatch, getState) {
        const user = getState().user;

        await changeCreator({
            userId: user._id,
            data: {
                profile: {
                    emails: payload.emails,
                    wallets: payload.wallets,
                    name: payload.name,
                    avatar: user.profile.avatar,
                },
                framework: user.framework,
            },
        });

        dispatch(
            userActionsCreators.change({
                profile: {
                    name: payload.name,
                    wallets: payload.wallets,
                    emails: payload.emails,
                },
            })
        );
    };
}

export function sendRequestUploadThunk(
    payload: CreatorSendRequestUploadReq
): ReduxThunkAction<Promise<CreatorSendRequestUploadApiRes>> {
    return async function (dispatch, getState) {
        const transactionId = nanoid();

        await dispatch(
            userActionsCreators.requestAvatarUpload({
                status: 'requested',
                transactionId,
            })
        );

        const response = await sendRequestUpload({
            mimetype: payload.mimetype,
            originalName: payload.originalName,
            transactionId: transactionId,
        });

        return response;
    };
}

export function changeAvatarThunk(payload: ChangeAvatarReq): ReduxThunkAction<Promise<ChangeAvatarApiRes>> {
    return async function (dispatch, getState) {
        const avatar = getState().user?.profile?.avatar;
        if (avatar && (payload.fileId === '' || payload.fileId !== avatar)) {
            requestDeleteAvatar({ deleteKeys: [avatar], transactionId: nanoid() });
        }

        const response = await changeAvatar({
            fileId: payload.fileId,
        });

        if (payload.transactionId)
            dispatch(
                userActionsCreators.requestAvatarUpload({
                    transactionId: payload.transactionId,
                    status: 'finished',
                })
            );

        dispatch(userActionsCreators.changeAvatar({ fileId: payload.fileId }));

        return response;
    };
}

export function generalStorageAvatarThunk(payload: GeneralStorageAvatarReq): ReduxThunkAction<Promise<any>> {
    return async function (dispatch, getState) {
        dispatch(
            userActionsCreators.requestAvatarUpload({
                transactionId: payload.transactionId,
                status: 'uploading',
            })
        );

        const res = await generalStorage(payload);

        await dispatch(changeAvatarThunk({ fileId: payload.path, transactionId: payload.transactionId }));

        return res;
    };
}
