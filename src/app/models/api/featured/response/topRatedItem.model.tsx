import { BaseFeaturedItemModel } from "./baseFeaturedItem.model";

export interface TopRatedItemModel extends BaseFeaturedItemModel{
    likeCount: number;
}