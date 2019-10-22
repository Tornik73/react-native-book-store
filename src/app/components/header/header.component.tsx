import { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import style from "./style";
import { NavigationActions } from "react-navigation";

interface Props {
    title?: string;
    viewType?: 'setting' | 'edit' | 'options-send' | 'onlytitle' | 'backtitle'
}
interface State {
    title: string;
    showBackButton: boolean;
    showEditButton: boolean;
    showSettingButton: boolean;
    showOptionsButton: boolean;
}

export class HomeHeaderComponent extends Component/*<Props, State>*/ {
    constructor(props: Props) {
        super(props);
        this.state = getStateByProps(props);
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
                        : <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.navigate({routeName: 'Chat',}))}>
                            <View style={style.backWrapper}>
                                <Image style={style.back} source={require('../../../assets/img/png/chat/chat.png')}></Image>
                            </View>
                        </TouchableOpacity>
                }
                <View style={style.titleWrapper}>
                    <Text style={style.title}>{'BookStore'}</Text>
                </View>
                <View style={style.settingsWrapper}>
                    <Image style={style.settings} source={require('../../../assets/img/png/header/settings.png')}></Image>
                </View>
            </View>
        );
    }
}

const getStateByProps = (props: Props): State => {
    return {
        title: props.title || "TeamUp",
        showBackButton: props.viewType != 'onlytitle',
        showEditButton: props.viewType == 'edit',
        showOptionsButton: props.viewType == 'options-send',
        showSettingButton: props.viewType == 'setting'
    }
}