import './App.css';
import MyDrawer from './custom/drawer.js'
import Canvas from './custom/canvas.js'
import React from 'react';
import firebase from './firebase.js'
import 'firebase/firestore';


class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      current_table:1,
    };
    this.select_table = this.select_table.bind(this)
  }

  select_table(event,element) {
    this.setState({
      current_table:element.id
    })
  }

  render() {
    return (
      <div>
        <Canvas firebase={firebase} select_table={this.select_table}/>
        <MyDrawer firebase={firebase} current_table={this.state.current_table}/>
      </div>       
    );
  }
}

export default App;  