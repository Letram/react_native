import { createStackNavigator } from "react-navigation";

import HomeScreen from "./home";
import DetailScreen from "./detail";

export default createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Detail: { screen: DetailScreen }
  },
  {
    initialRouteName: "Home"
  }
);
