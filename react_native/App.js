import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Button, ListItem, Avatar, Header, Badge, Card, Icon, Divider, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
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
        <Divider style={{backgroundColor : "black", padding: 2}}/>
        <View style={{flex: 1, flexDirection: "row", justifyContent: "center"}}>
          <Text style={[styles.big]}>{name}</Text>
        </View>
      </View>
    );
  }
}
//************************************** ADD FORM *****/
class AddFormScreen extends React.Component{
  static navigationOptions = {
    title:'AddForm',
    headerBackTitle: "Atrás"
};

  constructor(props){super(props)}
  render(){
    const { navigate } = this.props.navigation;

    return <View style={{flex:1, padding:20}}>
      <FormLabel>Name:</FormLabel>
      <FormInput placeholder="Enter text..."></FormInput>
      <FormValidationMessage>{'This field is required'}</FormValidationMessage>
      <FormLabel>Lastname:</FormLabel>
      <FormInput placeholder="Enter text..."></FormInput>
      <FormValidationMessage>{'This field is required'}</FormValidationMessage>
      <FormLabel>Age:</FormLabel>
      <FormInput placeholder="Enter text..."></FormInput>
      <FormValidationMessage>{'This field is required'}</FormValidationMessage>
      <Button title = "ADD PERSON"/>
    </View>
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
    this.makeRemoteRequest(10);
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
          this.state.data.map((l) => (
            <Card
              title={l.name.first + " " + l.name.last}
              image={{uri: l.picture.large, resizeMode:'cover'}}>
              <Text style={{marginBottom: 10}}>
                The idea with React Native Elements is more about component structure than actual design.
              </Text>
              <Button
                icon={<Icon name='code' color='#ffffff' />}
                backgroundColor='#03A9F4'
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                onPress={() => navigate('Profile', { name: l.name.first, face: l.picture.large })}
                title='Enter profile' />
            </Card>
          ))
        }
      </ScrollView>
      <Button
        raised
        backgroundColor={'orange'}
        onPress={() => navigate('AddForm') }
        icon={{name: 'cached'}}
        title='ADD PPL' />
      </View>
    );
  }
}

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
    AddForm: { screen: AddFormScreen },
  }, 
  {
    initialRouteName: 'Home',
  }
);



export default App;