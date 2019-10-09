const INIT_STATE = {
    featured: [],
    newPlaces: [],
    topRated: [],
    featuresLoad: false,
    placesLoad: false,
    topRatedLoad: false,
}

export default function venueReducer(state = INIT_STATE, action: any) {
    switch (action.type) {
        case 'GET_FEATURED':
            return {
                ...state,
                featuresLoad: true,
                featured: action.response
            }
        case 'GET_NEW_PLACES': 
            return {
                ...state,
                placesLoad: true,
                newPlaces: action.response
            }
        case 'GET_TOP_RATED': 
            return {
                ...state,
                topRatedLoad: true,
                topRated: action.response
            }
        default:
            return state
    }
}