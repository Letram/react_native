import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Button, ListItem, Avatar, Header, Badge, Card, Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';


//************************************** PROFILE *********/

class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Detail',
    headerBackTitle: 'Volver',
  };

  render(){

    const { navigation } = this.props;
    const name = navigation.getParam('name', 'No identificado');
    const face = navigation.getParam('face', 'No identificado');
    
    return(      
      <View style={{flex: 2, flexDirection: "column"}}>
        <Image source={{uri: face}} style={{flex: 1}}/>
        <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
          <Text style={[styles.big]}>{name}</Text>
        </View>
      </View>
    );
  }
}

//************************************** HOME *********/

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.makeRemoteRequest(50);
  }

  makeRemoteRequest = (n) => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=${n}`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    const { navigate } = this.props.navigation;

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    console.log(this.state.data);

    return (
      <View style={{flex: 1, flexDirection: "column"}}>
      
      <Button
        raised
        backgroundColor={'blue'}
        onPress={() => this.makeRemoteRequest(3) }
        icon={{name: 'cached'}}
        title='BUTTON WITH ICON' />

      <ScrollView>
        {
          this.state.data.map((l, i) => (
            <ListItem
              key={i}
              avatar={<Avatar
                size="small"
                rounded
                source={{uri: l.picture.thumbnail}}
                onPress={() => console.log("Works!")}
                activeOpacity={1.0}
              />}
              title={l.name.first + " " + l.name.last}
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              subtitle={l.email}
              onPress={() => navigate('Profile', { name: l.name.first, face: l.picture.large })}
              badge={{ value: l.dob.age, textStyle: { color: 'orange' }, containerStyle: { marginTop: 0 } }}
            />
          ))
        }
      </ScrollView>
      </View>
    );
  }
}


const users = [
  {
    name: 'Ana Peña',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Presidenta'
  },
  {
    name: 'Juan Pérez',
    avatar_url: 'https:\/\/randomuser.me\/api\/portraits\/women\/68.jpg',
    subtitle: 'Vicedirector'
  },
  {
    name: 'Antonio Martínez',
    avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
    subtitle: 'Director de arte'
  },
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});


const App = createStackNavigator({
    Home: { screen: HomeScreen },
    Profile: { screen: ProfileScreen },
  }, 
  {
    initialRouteName: 'Home',
  }
);



export default App;