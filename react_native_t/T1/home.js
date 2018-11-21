import React from "react";
import { View, Button } from "react-native";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Pulsa" onPress={() => navigate("Detail")} />
      </View>
    );
  }
}

export default HomeScreen;
