import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//List of all store enhancers
const enhancers = [
    //Add getFirebase,getFirestore as extra argument so that we can access them in thunk functions
    applyMiddleware(thunk)
];

//compose is used to combine all enhancers
const composedEnhancers = composeWithDevTools(
    ...enhancers
);

export default function(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );
}