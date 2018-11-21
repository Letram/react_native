import React from "react";
import { Text, View } from "react-native";

class DetailScreen extends React.Component {
  static navigationOptions = {
    title: "Detail",
    headerBackTitle: "Volver"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Detail</Text>
      </View>
    );
  }
}

export default DetailScreen;
