import logo from './logo.svg';
import './styles/App.css';
import { startAction } from "./store/actions/startAction";
import { stopAction } from "./store/actions/stopAction";
import { rotateAction } from './store/actions/rotateAction';
import { colorAction } from './store/actions/colorAction';
import { makeASandwichWithSecretSauce } from './store/actions/thunkAction';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';


const App = (props) => {
  return(
        <div className="App">
      <header className="App-header">
        <img src={logo} className={
          "App-logo" +
          (props.rotateReducer.rotating ? "" : " App-logo-paused")
        }
          alt="logo"/>
          <button onClick={() => props.rotateAction(!props.rotateReducer.rotating)}>Show alert</button>
          <button onClick={() => props.colorAction('blue')}>Show alert</button>
          <button onClick={() => props.makesandwitch('sandy')}>Show photos</button>
          <p style={{color: props.colorChangeReducer.color}}>This text will change color on button click.</p>
          <p>just to check what will be returning from the dispatch -- {props.thunkReducer.error?.message}</p>
      </header>
    </div>
  )
}

App.propTypes = {
  rotating: PropTypes.bool,
  rotateAction: PropTypes.func,
  colorAction: PropTypes.func,
  thunkReducer: PropTypes.object,
  color: PropTypes.string,
  rotateReducer : PropTypes.object,
  colorChangeReducer : PropTypes.object,
  makesandwitch: PropTypes.func
};

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  startAction: () => dispatch(startAction),
  stopAction: () => dispatch(stopAction),
  rotateAction: (payload) => dispatch(rotateAction(payload)),
  colorAction: (payload) => dispatch(colorAction(payload)),
  makesandwitch: (payload) => dispatch(makeASandwichWithSecretSauce(payload))

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
