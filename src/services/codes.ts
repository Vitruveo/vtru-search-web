export const codesVtruApi = {
    success: {
        login: ['vitruveo.truID.api.users.login.email.success', 'vitruveo.truID.api.users.login.otpConfirm.success'],
        user: [
            'vitruveo.truID.api.users.username.success',
            'vitruveo.truID.api.users.send.code.email.success',
            'vitruveo.truID.api.users.verify.code.email.success',
        ],
    },
    errors: {
        user: ['Creator add email failed: email already exist'],
    },
    notfound: {
        user: ['vitruveo.truID.api.users.username.not.found', 'vitruveo.truID.api.users.email.not.found'],
    },
};
