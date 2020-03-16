import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { createStore } from "redux";
import * as serviceWorker from "./serviceWorker";

import { LSsave } from "./localStorage";
import App from "./components/App";
import reducer from "./reducer";
import "./index.css";

const store = createStore(reducer);

store.subscribe(() => {
    const state = store.getState();
    LSsave(state);
});

export default store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
