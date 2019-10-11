import { Component } from "react";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { FooterItemsEnum } from "../../../shared/enums/footer-items.enum";
import style from "./style"; 
import { connect } from "react-redux";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MenuItemModel } from "src/app/shared/model/menu-item.model";

const menu: Array<MenuItemModel> = [
    { name: FooterItemsEnum.HOME , img: require('../../../../assets/img/png/home.png')},
    { name: FooterItemsEnum.PROFILE , img: require('../../../../assets/img/png/person.png')},
]


interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    token: string, 
    isLogined: boolean,
}

class FooterComponent extends Component<Props, any>{

    
    render() {
        return (
            <View style={style.container}> 
                {menu.map((m) => this.getMenuView(m))}
            </View>
        )
    }
  
    getMenuView(item: MenuItemModel){
        const {navigation} = this.props as any;
        if (this.props.isLogined){
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
        } else {
            this.props.navigation.navigate('Login');
        }
    }

}

  
  const mapStateToProps = (state: any) => {
    return {
        isLogined: state.authReducer.isLogined,
    }
  };
  
export default connect(
    mapStateToProps,
    null
)(FooterComponent)