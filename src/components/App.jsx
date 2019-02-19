import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import { Switch, Route } from 'react-router-dom';
import

let myStyledApp = {
  backgroundColor: '#ecf0f1',
  fontFamily: 'sans-serif',
  paddingTop: '50px'
};

class App extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     masterTicketList: []
   };
    this.handleAddingNewTicketToList = this.handleAddingNewTicketToList.bind(this);
  }

  handleAddingNewTicketToList(newTicket){
   var newMasterTicketList = this.state.masterTicketList.slice();
   newMasterTicketList.push(newTicket);
   this.setState({masterTicketList: newMasterTicketList});
  }

  render(){
    return (
      <div style={myStyledApp}>
        <Header/>
        <Switch>
          <Route exact path='/' component={TicketList} />
          <Route path='/newticket' render={()=><NewTicketControl onNewTicketCreation={this.handleAddingNewTicketToList} />} />
        </Switch>
      </div>
    );
  }
}
export default App;
