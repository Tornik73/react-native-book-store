import { FeaturedModel } from "./featured.model";
import { NewPlacesModel } from "./newPlaces.model";
import { CategoryModel } from "./category.model";

export interface DiscoverModel{
    featured: Array<FeaturedModel>;
    newPlaces: Array<NewPlacesModel>;
    categories: Array<CategoryModel>
}