const INIT_STATE = {
    isLogined: false
}

export default function authReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogined: true
            }
        default:
            return state
    }
}