import { VenueTypesEnum } from "src/app/shared/enums/venue-types.enum";

export interface GetAllVenueModel{
    longitude: number
    latitude: number
    type: VenueTypesEnum
    page: number
}