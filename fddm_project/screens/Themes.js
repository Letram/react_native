import React from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import {Text, List, CheckBox} from 'react-native-elements';
import * as StorageService from '../services/StorageService';
import * as ThemeService from '../services/ThemeService';
import Events from '../services/EventService';
class Themes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes:ThemeService.getAll(),
      selected:ThemeService.getSelected(),
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: 'Atrás',
        title: 'Themes',
    };
};
  swap = (name) => {
    ThemeService.swap(name);
    this.setState({selected: ThemeService.getSelected()});
    Events.publish('ReloadTheme');
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.state.selected.styles.primary.color}}>
        <Text style={this.state.selected.styles.header}>
          Available themes:
        </Text>
          <List containerStyle={{ marginBottom: 20, backgroundColor: this.state.selected.styles.dark.color}}>
          {
              this.state.themes.map((theme) => (
                <CheckBox
                  textStyle = {theme.styles.text.color}
                  containerStyle={{backgroundColor: theme.styles.secondary.color}}
                  title={theme.name}
                  onPress={() => this.swap(theme.name)}
                  checked={this.state.selected.name == theme.name}
                  key={theme.name}
                />
              ))
            }
          </List>
      </View>
    );
  }
}

export default Themes;