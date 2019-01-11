import React from 'react';
import { StyleSheet, View, Button, ScrollView } from 'react-native';
import {Text, List, CheckBox} from 'react-native-elements';
import * as StorageService from '../services/StorageService';
import * as ThemeService from '../services/ThemeService';

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
    this.props.navigation.state.params.reloadTheme();
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column'} }>
        <Text style={this.state.selected.styles.header}>
          Themes
        </Text>
        <ScrollView >
          <List containerStyle={{ marginBottom: 20}}>
          {
              this.state.themes.map((theme) => (
                <CheckBox
                  textStyle = {theme.styles.content}
                  containerStyle = {theme.styles.container}
                  title={theme.name}
                  onPress={() => this.swap(theme.name)}
                  checked={this.state.selected.name == theme.name}
                  key={theme.name}
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}

export default Themes;