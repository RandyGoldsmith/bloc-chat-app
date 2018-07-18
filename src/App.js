import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

var config = {
    apiKey: "AIzaSyANeX0jVVYbbeB513hj5OFZofkcOeMpD-4",
    authDomain: "react-chat-app-da2d1.firebaseapp.com",
    databaseURL: "https://react-chat-app-da2d1.firebaseio.com",
    projectId: "react-chat-app-da2d1",
    storageBucket: "react-chat-app-da2d1.appspot.com",
    messagingSenderId: "645345383915"
  };
  firebase.initializeApp(config);

  

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Link to='/roomlist'>RoomList</Link>
        </header>
        <main>
          <Route path="/roomlist" component={RoomList} />
        </main>
      </div>
    );
  }
}

export default App;
