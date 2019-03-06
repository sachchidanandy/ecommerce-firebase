import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebase from '../config/FirebaseConfig';

//List of all store enhancers
const enhancers = [
    //Add getFirebase,getFirestore as extra argument so that we can access them in thunk functions
    applyMiddleware(thunk.withExtraArgument({ getFirebase,getFirestore })),
    //Add firebase config in reduxFirestore
    reduxFirestore(firebase),
    //Add firebase config in reactReduxFirebase
    reactReduxFirebase(firebase)
];

//compose is used to combine all enhancers
const composedEnhancers = compose(
    ...enhancers
);

export default function(initialState) {
    return createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );
}