import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducers/index";

function configureStore() {
  return createStore(reducer, applyMiddleware(thunk,logger));
}

function logger ({getState}) {
  return next => action => {
    console.log('will dispatch', action)

    const restunValue = next(action)
    console.log('state after dispatch', getState())

    return restunValue

  }
}

export default configureStore;