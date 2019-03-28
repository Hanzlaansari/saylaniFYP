import { createStore,combineReducers} from 'redux';
import zameenReducer from './reducers/zameenReducer'
import userReducer from './reducers/userReducer'   
let allreducer = combineReducers({ zameenReducer, userReducer});
let store = createStore(allreducer);

export default store;