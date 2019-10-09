import { FeatureItemModel } from "./featuredItem.model";
import { TopRatedItemModel } from "./topRatedItem.model";
import { NewPlacesItemModel } from "./newPlacesItem.model";
import { IBaseResponseModel } from "../../base-response.model";

export interface FeaturedModel extends IBaseResponseModel<{
    featured: FeatureItemModel[],
    topRated: TopRatedItemModel[],
    newest: NewPlacesItemModel[] 
}>{}