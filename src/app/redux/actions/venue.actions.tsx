import { VenueService } from "../../services/venue.service";
import { FeaturedModel } from "src/app/shared/model/featured.model";
import { NewPlacesModel } from "src/app/shared/model/newPlaces.model";
import { TopRatedModel } from "src/app/shared/model/topRated.model";

export function getAllVenue() {
    return async (dispatch: any) => {
        await VenueService.getFeatured().
            then((response) => {
                let uiModel: FeaturedModel[] = response.data.map((r): FeaturedModel => {
                    return {
                        title: r.name,
                        address: r.address,
                        content: r.description,
                        image: require('../../../assets/img/topRated/123.jpg')
                    }
                })
                dispatch(getAllVenueSuccess(uiModel))
            }).catch(err => console.log(err))
    }
}

export function getAllVenueSuccess(response: FeaturedModel[]) {
    return {
        type: 'GET_FEATURED',
        response: response
    }
}

export function getNewPlaces() {
    return async (dispatch: any) => {
        await VenueService.getNew().
            then((response) => {
                let uiModel: NewPlacesModel[] = response.data.map((r): NewPlacesModel=> {
                    return {
                        title: r.name,
                        description: r.description,
                        image: require('../../../assets/img/topRated/123.jpg')
                    }
                })
                dispatch(getNewPlacesSuccess(uiModel))
            }).catch(err => console.log(err))
    }
}

export function getNewPlacesSuccess(response: NewPlacesModel[]) {
    return {
        type: 'GET_NEW_PLACES',
        response: response
    }
}

export function getTopRated() {
    return async (dispatch: any) => {
        await VenueService.getTopRate().
            then((response) => {
                let uiModel: TopRatedModel[] = response.data.map((r): TopRatedModel=> {
                    return {
                        title: r.name,
                        location: r.address,
                        id: r.id,
                        likes: r.likeCount,
                        image: require('../../../assets/img/topRated/123.jpg'),
                        description: r.description
                    }
                })
                dispatch(getTopRatedSuccess(uiModel))
            }).catch(err => console.log(err))
    }
}

export function getTopRatedSuccess(response: TopRatedModel[]) {
    return {
        type: 'GET_TOP_RATED',
        response: response
    }
}