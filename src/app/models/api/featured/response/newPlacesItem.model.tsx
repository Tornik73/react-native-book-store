import { BaseFeaturedItemModel } from "./baseFeaturedItem.model";

export interface NewPlacesItemModel extends BaseFeaturedItemModel{
    createdDate: Date | string
}