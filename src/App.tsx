import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(): JSX.Element {
    return (
        <>
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/"></Route>
                    <Route path="/browse"></Route>
                    <Route path="/about"></Route>
                    <Route path="/signin"></Route>
                    <Route path="/signup"></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
