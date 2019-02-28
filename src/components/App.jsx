import React from 'react';
import Header from './Header';
import TicketList from './TicketList';
import NewTicketControl from './NewTicketControl';
import { Switch, Route, withRouter } from 'react-router-dom';
import Admin from './Admin';
import Moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';




class App extends React.Component {


  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000
    );
  }

  updateTicketElapsedWaitTime() {
    const { dispatch } = this.props;
    Object.keys(this.props.masterTicketList).map(ticketId => {
      const ticket = this.props.masterTicketList[ticketId];
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = {
        type: 'UPDATE_TIME',
        id: ticketId,
        formattedWaitTime: newFormattedWaitTime
      };
      dispatch(action);
    });
  }

  componentWillUnmount(){
    clearInterval(this.waitTimeUpdateTimer);
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' render={()=><TicketList ticketList={this.props.masterTicketList} />} />
          <Route path='/newticket' render={()=><NewTicketControl />} />
          <Route path='/admin' render={(props)=><Admin currentRouterPath={props.location.pathname} />} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList
  }
}

App.propTypes = {
  masterTicketList: PropTypes.object
};

export default withRouter(connect(mapStateToProps)(App));
