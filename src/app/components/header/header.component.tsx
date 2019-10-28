import { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import style from "./style";
import { NavigationActions } from "react-navigation";
import { HeaderItemsEnum } from "../../../app/shared/enums/header-items.enum";

interface Props {
    title?: string;
    viewType?: 'Settings' | 'edit' | 'options-send' | 'onlytitle' | 'backtitle';
}
interface State {
    // title: string;
    // showBackButton: boolean;
    // showEditButton: boolean;
    // showSettingButton: boolean;
    // showOptionsButton: boolean;
}

export class HomeHeaderComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // this.state = getStateByProps(props);
    }

    render() {
        let { scenes, navigation } = this.props as any;
        return (
            <View style={style.container}>
                {
                    (scenes.length > 1) ?
                        <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back())}>
                            <View style={style.backWrapper}>
                                <Image style={style.back} source={require('../../../assets/img/png/header/back.png')}></Image>
                            </View>
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.navigate({routeName: HeaderItemsEnum.CHAT,}))}>
                            <View style={style.backWrapper}>
                                <Image style={style.back} source={require('../../../assets/img/png/chat/chat.png')}></Image>
                            </View>
                        </TouchableOpacity>
                }
                <View style={style.titleWrapper}>
                    <Text style={style.title}>{'BookStore'}</Text>
                </View>
                <View style={style.settingsWrapper}>
                    <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.navigate({routeName: HeaderItemsEnum.SETTINGS,}))}>
                        <Image style={style.settings} source={require('../../../assets/img/png/header/settings.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// const getStateByProps = (props: Props): State => {
//     return {
//         title: props.title || "BookStore",
//         showBackButton: props.viewType != 'onlytitle',
//         showEditButton: props.viewType == 'edit',
//         showOptionsButton: props.viewType == 'options-send',
//         showSettingButton: props.viewType == 'Settings'
//     }
// }