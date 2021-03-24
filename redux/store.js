import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});
const enhancer = composeEnhancers(applyMiddleware(...middleware));
const makeStore = () => createStore(rootReducer, enhancer);

export const wrapper = createWrapper(makeStore);
