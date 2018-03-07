import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Header, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';


export default class App extends React.Component {

  state={ loggedIn: null }

  componentWillMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyDucS3EJsxtgj81i_fOU352qOgVOLUGVag',
        authDomain: 'authentication-quang.firebaseapp.com',
        databaseURL: 'https://authentication-quang.firebaseio.com',
        projectId: 'authentication-quang',
        storageBucket: 'authentication-quang.appspot.com',
        messagingSenderId: '81013658183'
    })

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true })
        } else {
          this.setState({ loggedIn: false })
        }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
        <Button onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>
      )
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />
    }
  }

  render() {
    return (
      <View style={{height: 125}}>
        <Header headerText="Authentication" />
       {this.renderContent()}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
    
//   },
// });
