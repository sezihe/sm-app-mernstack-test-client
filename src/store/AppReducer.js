export default (state, action) => {
    switch(action.type) {
        case 'SIGN_UP':
            delete state.signUpErrorId;
            return {
                ...state,
                ...action.payload,
            };
        case 'SIGN_UP_ERROR':
            delete state._id; delete state.name; delete state.email; delete state.created;
            return {
                ...state,
                signUpErrorId: action.payload.errId,
            }
        default:
            return state;
    }
}