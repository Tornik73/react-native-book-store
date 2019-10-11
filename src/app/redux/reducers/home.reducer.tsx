const INIT_STATE = {
    state: 'sample'
}

export default function homeReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case 'GET_EXAMPLE':
            return {
                ...state,
                featuresLoad: true,
                featured: action.response
            }
        default:
            return state
    }
}