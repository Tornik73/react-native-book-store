import { Component } from "react";
import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { FooterItemsEnum } from "../../../shared/enums/footer-items.enum";
import style from "./style"; 
import { connect } from "react-redux";
import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MenuItemModel } from "../../../shared/model/";
import * as loginActions from "../../../redux/actions/auth.actions";

interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    token: string, 
    isLogined: boolean,
    profileImg: string,
    isLoading: boolean,
}
interface State {
    menu: MenuItemModel[];
}
class FooterComponent extends Component<Props, State>{

    constructor(props: Props){
        super(props);
        this.state ={ 
            menu: [
                { name: FooterItemsEnum.HOME , img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAGZVJREFUeJzt3Xus7Wld3/H3OUxHZmAugDNDQUQxgGCVGZEiIAgo8dqmlYI1NQaoJqaXRG2MtY1ptVZjUhq1SVNSRCoWrQh4AYRhgNhWtIoZUMplbIVRwRlQZwatAs5w+sfa2znnzLnsy1rrWWs9r1fyhLDZZ+/vXpu1P5/1rN/lRMAue0z1pOoLq8+pHlk9tHpAdVl1v+oT1ceqj1S3VrdUv1X9WvW+9Y8MABzWyeorqpdUv1+dOub6cPXS6itblAUAYINcU31vywn9C5WB762uW9PPBACcxzXVj1R/3uqC/+z1F3vf89o1/HwAwGkuqb6zuqv1Bf/Z62N7M1yy4p8VAGhxQN/NjQv+s9e7qhtW+hMDwMROVv+8+mTjQ//s9cnqu6oTK/vpAWBCD67e2Pigv9j6pb1ZAYBj+vzqdxsf7gddv1t93koeCQCYxFe1ONhudKgfdt3V4noEAMAhvai6u/FhftT1l9ULlv2gAMAu+67GB/iy1ncu+bEBgJ30Q40P7WWvH1jqIwQAO+RE9R8bH9arWj+a0wQB4Awnq5c1PqRXvf7z3s8KANO7pHpl48N5XesVubMgAJO7tHp140N53etV1V9bwuMHAFvn/tXrGx/Go9br9h4DAJjG/duOS/uuer0xJQCASQh/JQCAyQh/JQCAyQh/JQCAydy/elPjQ3bTlxIAwM4Q/koAAJMR/koAAJMR/sdbb0oJAGDLCH8lAIDJCH8lAIDJCH8lAIDJ3L+6sfFhuatLCQBg4wj/9awbUwIA2BDCXwmArXNi9ACw5e5f/UL1nNGDTObN1d+uPj56kA338Oqp1Q3V46rPqq6rrq4+rTo5bLKFT1WfqO6sbqs+WL23url6e/XhYZMBXMBleeU/eifgsov+lubzlOrfV+9v/O/ouOt91b+rnrzURwjgGIT/ZiwlYOHK6jvajdA/33pf9W3VFUt6zAAOTfhv1pq5BFxVfV91V+N/D+tad1T/KkUAWDPhv5lrthJwovqW6iONf+xHrduqF+VYNmANhP9mrzc3Rwn47OqXG/94b8p6a/XIYz2iABdwWYuAGf3Hzrrw2vUS8PzqY41/nDdt3Vl93TEeV4BzEv7btXaxBJyofrDxj+2mr3+TtwSAJRH+27l2qQRcUr2y8Y/ptqxX7D1mAEcm/Ld73dT2l4BLqtc0/rHctvWzKQHAEQn/3VjbXAJO5JX/cdYr8nYAcEiXtQiO0X/ArOWsbS0B3vM//vr+Qz/qwLSE/26ubSsBz2/8Y7Yry9kBwEUJ/91e21ICHpVT/Za57sx1AoALEP5zrLe02SXgRC7ys4r11hwPAJyD8J9rbXIJ+JbGPz67ul54iN8DMAHhP+faxBJwVXNf23/V67bcQOgMJ0cPAANdVr2u+rLRg7B2z27xu7989CCn+WfVNaOH2GHXVd8+eohN4j0RZrUf/s8ePQhDvbX6W9WfD57jyur39/6T1bmz+szqT0cPsgnsADAj4c++Z1e/2PidgG9O+K/D1S1uIQxM6LIW7/+Ofj/S2qz1lsaWgFvOM5e1/PWeA/5OgB1yecLfOv96a2NKwFOOOK919PWkA/1mdpy3AJjF5S22em37cz7PasyBgc9b8/fDY14pAMxB+HNQI0rA16zxe7HgMc9ZAOw+4c9RvK362lZ/dsDDqz9Y8ffg3B5a3T56iJHsALDLhD9Hta6dgKeu+Otzfk8bPcBoCgC7SvhzXM+qXt9qS8ANK/zaXNj1owcYTQFgF12e8/xZjme22hLwuBV9XS5u+sdeAWDX7If/s0YPws54ZqsrAZ+1gq/JwXz26AFGUwDYJcKfVXlmqykB1y3563Fw0z/2CgC7Qvizas+s3tByS8DVS/xaHM6DRg8wmtMA2QXCn3X65eqrW84pgvfkhdgo91SXjB5iJAWAbSf8GWFZJeDUEmbh6KbOQM2TbXZ5i/dlhT/r9qUt3g54wOhB4KgUALbVfvg/c/AczOtLW/x/UAlgKykAbCPhz6ZQAthaCgDbRvizaZQAtpICwDYR/mwqxwSwdRQAtsXlLf7APnPwHHA+z0gJYIsoAGyD/fD/0tGDwEUoAWwNBYBNJ/zZNkoAW0EBYJMJf7aVEsDGUwDYVA9I+LPdnlH9UkoAG0oBYBM9oMXR/sKfbff0lAA2lALAphH+7BolgI2kALBJhD+7ar8EPHD0ILBPAWBTCH923dNbHNeiBLARFAA2gQP+mIUSwMZQABhtP/yfMXoQWBMlgI1wYvQATE34M7P/WX3J6CEmN3UGTv3DM5TwB0abOgO9BcAIwh9gMAWAdRP+ABvgktEDMJUHtDgX+umjBwGYnR0A1kX4A2wQBYB1EP4AG0YBYNWEP8AGUgBYpQcm/AE2kgLAqjywxdH+wh9gAykArILwB9hwCgDLJvwBtoACwDIJf4AtoQCwLMIfYIu4EiDLsH+0vzubAWwJOwAcl/AH2EIKAMch/AG2lALAUQl/gC2mAHAUwh9gyykAHJbwB9gBzgLgMB5YvbF62uhBADgeOwAclPAH2CEKAAch/AF2jALAxQh/gB2kAHAhVyT8AXaSAsD5XNHiaH/hD7CDFADORfgD7DgFgLMJf4AJKACcTvgDTMKFgNi3f8DfU0cPAsDq2QGghD/AdBQAhD/AhBSAuQl/gEkpAPMS/gATUwDmJPwBJucsgPlcUb2pesroQQAYxw7AXIQ/AJUCMBPhD8BfUQDmIPwBOIMCsPuuTPgDcBYFYLdd2eJof+EPwBkUgN0l/AE4LwVgNwl/AC5IAdg9wh+Ai1IAdovwB+BAXAlwd+wf7f/FowcBYPPZAdgNwh+AQ1EAtp/wB+DQFIDtJvwBOBIFYHsJfwCOTAHYTsIfgGNxFsD2ubK6sXry6EEA2F52ALaL8AdgKRSA7SH8AVgaBWA7CH8AlkoB2HxXJfwBWDIFYLNd1eJof+EPwFIpAJtL+AOwMgrAZhL+AKyUArB5hD8AK+dCQJtl/4C/vzl6EAB2mx2AzSH8AVgbBWAzCH8A1koBGE/4A7B2CsBYwh+AIRSAcYQ/AMM4C2CMq6o3V08aPQgAc7IDsH7CH4DhFID1Ev4AbAQFYH2EPwAbQwFYj6sT/gBsEAVg9a5ucbS/8AdgYygAqyX8AdhICsDqCH8ANpYCsBrCH4CN5kJAy7d/wN8XjR4EAM7HDsByCX8AtoICsDzCH4CtoQAsh/AHYKsoAMcn/AHYOgrA8Qh/ALaSAnB0wh+AreU0wKO5urqpeuLoQQDgKOwAHJ7wB2DrKQCHI/wB2AkKwMEJfwB2hgJwMA9K+AOwQxSAi3tQi6P9hT8AO0MBuDDhD8BOUgDOT/gDsLMUgHMT/gDsNBcCuq/9A/6+cPQgALAqdgDOJPwBmIICcC/hD8A0FIAF4Q/AVBQA4Q/AhGYvAA9O+APM6sGjBxhp5gIg/AHmdlMTl4ATowcYZD/8bxg9CABD3Vx9efUnowdZtxkLgPAH4HRTloDZCoDwB+BcpisBMxUA4Q/AhUxVAmYpAMIfgIOYpgTMUACEPwCHMUUJ2PUCIPwBOIqdLwG7XACEPwDHsdMlYFcLgPAHYBl2tgTsYgF4cPWW6vrRgwCwE3ayBOxaARD+AKzCzpWAXSoAwh+AVdqpErArBUD4A7AOO1MCdqEACH8A1mknSsC23w74IQl/ANbrhnbgVsLbvAPwkBa/AOEPwAhbvROwrQVA+AOwCba2BGxjARD+AGySrSwB21YAhD8Am2jrSsA2FYD9A/6eMHoQADiHrSoB21IAhD8A22BrSsA2FADhD8A22YoSsOkFQPgDsI3eWX1ZG1wCNrkACH8AttlGl4BNLQDCH4BdsLElYBMLwEOqt1ZfMHoQAFiCjSwBm1YAhD8Au2jjSsAmFQDhD8Au26gSsCkFQPgDMIONKQGbcDvgT0/4AzCH61sc5D78VsKjdwA+vcUDIfwBmMnwnYCRBUD4AzCzoSVgVAEQ/gAwsASMOAZA+APAwv4xAQ9Z9zde9w6A8AeA+3pnixsI/fG6vuE6C8D+0f6fv8bvCQDbYq0lYF0FQPgDwMWtrQSsowAIfwA4uLWUgFUXAOEPAIe38hKwyrMArkn4A8BRXF/d1ArPDljVDsA1LY72F/4AcHQr2wlYRQEQ/gCwPCspAcsuAMIfAJZv6SVgmQVA+APA6iy1BCyrAAh/AFi9d7W4d8CxS8AyCsCDq7fl8r4AsA43V8+u7jzOFznuaYBXVTcm/AFgXW6o3lhdcZwvcpwC8IDq9dUTjzMAAHBoT65eV1121C9w1ALwadXPV0876jcGAI7lGdVrq0uP8o+PUgAuqf5bi4MQAIBxvqJ6ZXW/w/7Dw/6DE9XLq+cf9hsBACvx+Oozql84zD86bAF4cfWth/w3AMBq3dDieICbDvoPDlMAvqP614ccCABYjy+p/qT69YN88kGvA/B11c8e4vMBgPX7VIvM/vmLfeJBAv2J1f/oGKcaAABr8/9anKX3rgt90sUKwLXVO6pHLGkoAGD1bq2+qPqj833ChU4DPFn9VMIfALbNI6v/2gVy/kIHAX5P9aJlTwQArMXnVJ9s8Tb+fZzvLYAvqn6tI1xYAADYGHdXX1z95tn/w7kKwKUt7jT0+BUPBQCs3rurL6z+8vQPnusV/ndW37COiQCAlbu2xZkBv3L6B8/eAXhYdUuLO/0BALvhz6pHV7ftf+DsHYAfqp66zokAgJW7tLq8esP+B07fAfiM6v92xNsKAgAb7ZPVo6oP1ZnnB/7jhD8A7KpLW2R9de8OwKXVh6uHjJgIAFiLj1YPr/5yfwfgKxP+ALDrrqm+qu59C+B542YBANbo79XiLYATLU4LuHboOADAOny0uu5k9TcS/gAwi2uqx59scd1/AGAeTz5ZPWH0FADAWn3ByRaXBgQA5vHoky2uAAgAzOMRJ6uHjp4CAFira0+2uDkAADCPK09Ud3ffuwICALvrUyc7846AAMDuO3Wyxe0BAYB5fOJkddfoKQCAtbrzZPWR0VMAAGv1kZPV742eAgBYq1tPVreMngIAWKtbTla/NXoKAGCt3n2y+vXRUwAAa/VrJ1pcB+D2FvcHBgB2223VXz9ZnapuHDwMALAeN1ad3PsvPzdwEABgfV5b914G+LIWWwJXDhsHAFi1O6qHVR/f3wH4i+qV4+YBANbgldXH68wbAT2++t9DxgEAVu1U9bjq/XXvMQBV76l+ccREAMDKvba98K/73gr4huo3z/FxAGB7faq6vvrt/Q+cPOsTbq5+Yp0TAQAr97JOC/869yv9a6r3VQ9ex0QAwEr9UfW51R+f/sGzdwCqPlr9k3VMBACs3D/qrPCvut95Pvnd1aOqJ6xyIgBgpV5W/eC5/ocLHex3WfUrLQ4MBAC2yzuqp7d33v/ZLna0/8OrX60eseShAIDVubV6SvWH5/uEcx0DcLoPVV/e4m6BAMDmu616ThcI/7p4Aai6pXpG9ftLGAoAWJ1bW2z7/87FPvEgBaAWJeApLa4TAABsnne0yOr/c5BPPmgBqMXbAU+r/ssRhgIAVufHWrzyv+C2/+kOUwBqcdfAF1T/oPqTQ/5bAGC5/qj6+uqbO8/R/udzvusAXMxvVz/e4qqBT8i9AwBgnT7V4hz/v1v9xlG+wGF3AE730eqF1RNzF0EAWIdT1c+3uEbPN7fYATiSZb5y/7zqn1bfUF25xK8LALO7q3pl9R+q9y7jC65i6/7y6qurv9PiPMRrV/A9AGDX3V7dWP1c9UstjsNbmlW/d3+iemz1xdXnV4+uPrPFsQNXV5/W0Y9DAIBtdk/1ierOFm+r39ri/P3frv5X9f4WW/4r4eC9FT64AGy0qTPwOAcBAgBbSgEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE1IAAGBCCgAATEgBAIAJKQAAMCEFAAAmpAAAwIQUAACYkAIAABNSAABgQgoAAExIAQCACSkAADAhBQAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE7pk9ACw4z5Uvb16Z/We6oPV7dWd1Sere4ZNthnuV11aPai6rvqs6vHV9dVTq4cNmwx23InRA2yAU6MHYOf8avWq6vXVLYNn2XaPrb62el715MGzsHumzsCpf/g9CgDL8LHqpdVLEvqr8tjqW6t/WF0xeBZ2w9QZOPUPv0cB4Djuql5c/UiLEsDqXV19W/UdKQIcz9QZOPUPv0cB4ChOtXjF/y+rjw6eZVbXVT9QvTB/yziaqf9/M/UPv0cB4LA+UL2g+u+D52DhWdWPV48cPQhbZ+oMdBogHM7PVE9I+G+St7X4nbxm9CCwTRQAOJhT1XdXX1/96eBZuK+7qudW35NdPTiQqbc/9vhjwcXcXX1T9VOjB+FAvrHFWwKuc8LFTJ2BU//wexQALuTu6vnVa0cPwqE8t/rplAAubOoM9BYAnN+pFq/8hf/2eXWLswMUfDgPBQDO719k23+b/WSLYwKAc5h6+2OPVwicy8+0OOCP7ffq6utGD8FGmjoDp/7h9ygAnO13W9yMxtH+u+Gq6l25TgD3NXUGegsAznSqxXvHwn933JXjAeA+FAA400tzkZ9d9Lbq5aOHgE0y9fbHHq8K2HdX9ehc239XXVf9Tm4gxL2mzkA7AHCvFyf8d9nt1Q+PHgI2xdTtZ48dAGpxK99H5Ja+u+7q6veyC8DC1BloBwAWXprwn8Gd1ctGDwGbYOr2s8cOAFWPafH+MLvvcdV7Rg/BRpg6A+0AQP1qwn8m761+Y/QQMJoCAPWq0QOwdn7nTE8BgHr96AFYuzeMHgBGm/r9jz2OAZjbh6rPGD0EQ9zW4toAzGvqDLQDwOzePnoAhvmV0QPASAoAs3vn6AEY5l2jB4CRFABm53SwefndMzUFgNl9cPQADPOB0QPASAoAs7t99AAM43fP1BQAZnfn6AEY5o7RA8BICgCz++ToARjm46MHgJGmPgdyj+sAzM1zYG6e/3Ob+vlvBwAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE1IAAGBCCgAATEgBAIAJKQAAMCEFAAAmpAAAwIQUAACYkAIAABNSAABgQgoAAExIAQCACSkAADAhBQAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE1IAAGBCCgAATEgBAIAJKQAAMCEFAAAmpAAAwIQUAACYkAIAABNSAABgQgoAAExIAQCACSkAADAhBQAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE1IAAGBCCgAATEgBAIAJKQAAMCEFAAAmpAAAwIQUAACYkAIAABNSAABgQgoAAExIAQCACSkAADAhBQAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE1IAAGBCCgAATEgBAIAJKQAAMCEFAAAmpAAAwIQUAACYkAIAABNSAABgQgoAAExIAQCACSkAADAhBQAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAAAwIQUAACakAADAhBQAAJiQAgAAE1IAAGBCCgAATEgBAIAJKQAAMCEFAAAmpAAAwIQUAACYkAIAABNSAABgQgoAAExIAQCACSkAADAhBQAAJqQAAMCEFAAAmJACAAATUgAAYEIKAABMSAEAgAkpAPWp0QMAsHb3jB5gNAWgPjF6AADW7uOjBxhNAag7Rw8AwNrdMXqA0RSAum30AACs3e2jBxhNAagPjh4AgLX7wOgBRlMA6r2jBwBg7ab/268A1M2jBwBg7ab/239i9AAb4GHVh0YPwTCeA3M7NXoAhnlokx8HYAegPly9f/QQAKzNu5s8/EsB2Pe60QMAsDZvGD3AJlAAFl41egAA1sbf/Lz/ebr3VY8dPQRr5zkwN8cAzOc91eeNHmIT2AG4138aPQAAK/eS0QNsCq9+7nVF9XvV1aMHYa08B+ZmB2Aud1SfWf3Z6EE2gR2Ae/1p9cOjhwBgZV6c8P8rXv2c6crqd6prRw/C2ngOzM0OwDz+sHpMCsBfsQNwpo9V3z16CACW7rsS/mfw6ue+TlRvqZ41ehDWwnNgbnYA5nBT9ZzRQ2waf/zO7ZHVu6qrRg/CynkOzE0B2H13VF9Q/cHoQTaNtwDO7dbqRaOHAOBYTlUvSPifkwJwfq+pvn/0EAAc2fdVvzB6iE1l+/PCTlQ/UX3j6EFYGc+BuXkLYHe9vHrh6CE2mT9+F3dJ9dPVc0cPwkp4DsxNAdhNr6q+obpn9CCbzFsAF3d39fernxw9CAAX9fKE/4EoAAdzd/VN1b8dPQgA53Sq+t4W2/7C/wBsfx7ec6sfyymCu8JzYG7eAtgNd7Q42t8Bf4dgB+DwXl09oXrb6EEA6KYW5/kL/0NSAI7m1urLWlwr4PbBswDM6A9bvDX7nJznfyS2P4/viurb95ZbCW8fz4G5eQtg+9zR4q5+P5Jr+x+LP37Lc0WLHYFvrT538CwcnOfA3BSA7fGe6iXVyxL8S+GP32o8qXpe9TXV4wfPwoV5DsxNAdhs767e0OK8/ncMnmXn+OO3etdVT6uurx5Xffbexx5U3b+637jRyHNgdgrAWPdUH2+xrX979YHqvdXN1dtzjNVK/X9cKESxkmG4qwAAAABJRU5ErkJggg=='},
                { name: FooterItemsEnum.PROFILE , img: ''},
            ]
        }
    }
    
    render() {
        return (
            <View style={style.container}> 
                {this.state.menu.map((m) => this.getMenuView(m))}
            </View>
        ) 
    }
  
    getMenuView(item: MenuItemModel){
        const {navigation} = this.props as any;
        if (this.props.isLogined && !this.props.isLoading){
            if(navigation.isFocused(item.name)){
                if(item.name === FooterItemsEnum.PROFILE){
                    return (
                        <View style={style.item}>
                            <Image style={style.itemImage} source={{uri: this.props.profileImg}} ></Image>
                            <Text style={[style.itemTitle, style.itemTitleSelected]}>{item.name}</Text>
                            <View style={style.selectedSeparator}></View>
                        </View>)
                }
                return (
                        <View style={style.item}>
                            <Image style={style.itemImage} source={{uri: item.img}}></Image>
                            <Text style={[style.itemTitle, style.itemTitleSelected]}>{item.name}</Text>
                            <View style={style.selectedSeparator}></View>
                        </View>)
            }
            if(item.name === FooterItemsEnum.PROFILE){
                return (
                    <TouchableOpacity onPress={async() => { 
                        navigation.navigate(item.name);
                        }} style={style.item}>
                        <Image style={style.itemImage} source={{uri: this.props.profileImg}}></Image>
                        <Text style={[style.itemTitle]}>{item.name}</Text> 
                        <View style={[style.selectedSeparator, style.notVisible]}></View>
                    </TouchableOpacity>)
            }
            return (
                <TouchableOpacity onPress={async() => { 
                    navigation.navigate(item.name);
                    }} style={style.item}>
                    <Image style={style.itemImage} source={{uri: item.img}}></Image>
                    <Text style={[style.itemTitle]}>{item.name}</Text> 
                    <View style={[style.selectedSeparator, style.notVisible]}></View>
                </TouchableOpacity>)
           
        } else {
            this.props.navigation.navigate('Login');
        }
    }

}

const mapDispatchToProps = (dispatch: any) => ({
    loadingStart: () => dispatch(loginActions.loadingStart())

});
  const mapStateToProps = (state: any) => {
    return {
        isLogined: state.authReducer.isLogined,
        profileImg: state.profileReducer.profileImg,
        isLoading: state.authReducer.isLoading
    }
  };
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FooterComponent)