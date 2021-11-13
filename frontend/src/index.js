import React from "react"
import ReactDOM from "react-dom"
import { App } from "./components"
import { Provider } from "react-redux"

import configureReduxStore from "./redux/store"
const store = configureReduxStore()


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
)
