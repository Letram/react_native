import React from "react";
import { Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 6.2.2
import {
  createBottomTabNavigator,
  TabBarBottom,
  createAppContainer
} from "react-navigation";

import T1 from "./T1";
import SettingsScreen from "./T2/settings";


export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: T1 },
      Settings: { screen: SettingsScreen }
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;

          if (routeName === "Home") iconName = "ios-home";
          if (routeName === "Settings") iconName = "ios-options";

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
      }),
      tabBarComponent: TabBarBottom,
      tabBarPosition: "bottom",
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray"
      },
      animationEnabled: false,
      swipeEnabled: false
    }
  )
);
