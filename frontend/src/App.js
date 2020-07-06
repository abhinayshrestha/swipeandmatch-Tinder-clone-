import React, { Component } from 'react';
import M from "materialize-css";
import Auth from './Container/Auth/Auth';
import { Switch , Route, Redirect, withRouter } from 'react-router-dom';
import Home from './Container/Home/Home';
import { connect } from 'react-redux';
import * as actions from './Store/Actions/AuthActions';
import Aux from './Hoc/ReactAux';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import MainLoader from './Component/UI/MainLoader';

class App extends Component {
 
  componentDidMount () {
     this.props.onAuthCheck();     
  }

  render() {
    let routes = null;
    if(this.props.isAuth){
      routes = (<Switch>
                      <Route path='/app' component={Home} />   
                      <Redirect to='/app' />
                </Switch>);
    }else{
      routes = (<Switch>
                      <Route path='/' exact component={Auth} />
                      <Redirect to='/' />                                  
                </Switch>);
    }   
    return (<Aux f1={M}>
                { !this.props.loading ? routes : <MainLoader />}
            </Aux>);
  }
}
const mapStateToProps = state => {
   return{
       isAuth : localStorage.getItem('token') !==null,
       loading : state.authReducer.loading
   }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuthCheck : () => dispatch(actions.autoSignIn()),
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
