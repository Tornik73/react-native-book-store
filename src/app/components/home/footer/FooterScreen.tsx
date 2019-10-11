import { Component } from "react";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { FooterItemsEnum } from "../../../shared/enums/footer-items.enum";
import { MenuItemModel } from "../../models/menu-item.model";
import style from "./style"; 

const menu: Array<MenuItemModel> = [
    { name: FooterItemsEnum.HOME , img: require('../../../../assets/img/png/home.png')},
    { name: FooterItemsEnum.LOGIN , img: require('../../../../assets/img/png/login.png')},
    { name: FooterItemsEnum.PROFILE , img: require('../../../../assets/img/png/person.png')},
]

export default class FooterComponent extends Component<any, any>{

    
    render() {
        return (
            <View style={style.container}> 
                {menu.map((m) => this.getMenuView(m))}
            </View>
        )
    }
  
    getMenuView(item: MenuItemModel){
        const {navigation} = this.props as any; 
        if(navigation.isFocused(item.name)){
            return (
            <View style={style.item}>
                <Image style={style.itemImage} source={item.img}></Image>
                <Text style={[style.itemTitle, style.itemTitleSelected]}>{item.name}</Text>
                <View style={style.selectedSeparator}></View>
            </View>)
        }
        return (
            <TouchableOpacity onPress={async() => { 
                navigation.navigate(item.name);
                }} style={style.item}>
                <Image style={style.itemImage} source={item.img}></Image>
                <Text style={[style.itemTitle]}>{item.name}</Text>
                <View style={[style.selectedSeparator, style.notVisible]}></View>
            </TouchableOpacity>)
    }

}
