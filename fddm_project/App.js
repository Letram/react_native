import {createStackNavigator, createAppContainer} from 'react-navigation';

import Home from './screens/Home';
import Details from './screens/Details';
import Edit from './screens/Edit';
import EditList from './screens/EditList';
import Themes from './screens/Themes';

const App = createStackNavigator({
  Home: {screen: Home},
  Details: {screen: Details},
  Edit: {screen: Edit},
  EditList: {screen: EditList},
  Themes: {screen: Themes},
}, {initialRouteName: 'Home'});

export default createAppContainer(App);