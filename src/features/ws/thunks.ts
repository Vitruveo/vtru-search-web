import { ReduxThunkAction } from '@/store';
import { userActionsCreators } from '../user/slice';
import webSocketService from '@/services/websocket';
import { WEBSOCKET_ACCESS_TOKEN } from '@/constants/ws';
import { PreSignedURLPayload } from './types';
import { applicationsActionsCreators } from '../applications/slice';

export function connectWebSocketThunk(): ReduxThunkAction {
    return async function (dispatch, getState) {
        webSocketService.connect();
    };
}

export function loginWebSocketThunk(): ReduxThunkAction {
    return async function (dispatch, getState) {
        const user = getState().user;

        webSocketService.emit('login', {
            id: user._id,
            email: user.login.email,
            token: WEBSOCKET_ACCESS_TOKEN,
        });

        webSocketService.on('preSignedURL', (data: PreSignedURLPayload) => {
            if (data.method === 'PUT') {
                if (data.origin === 'profile') {
                    dispatch(
                        userActionsCreators.requestAvatarUpload({
                            url: data.preSignedURL,
                            transactionId: data.transactionId,
                            path: data.path,
                            status: 'ready',
                        })
                    );
                }
                if (data.origin === 'application') {
                    dispatch(
                        applicationsActionsCreators.requestAssetUpload({
                            url: data.preSignedURL,
                            transactionId: data.transactionId,
                            path: data.path,
                            status: 'ready',
                        })
                    );
                }
            }
        });
    };
}
