import React from "react";
import CreateStuff from "./component/crateStuff";
import EditStuff from "./component/EditStuff";
import ListStuff from "./component/ListStuff";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/Navbar";
import { GlobalStyle } from "./GlobalStyle";
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar></Navbar>{" "}
        <Switch>
          <Route path="/" exact component={ListStuff} />
          <Route path="/edit/:id" component={EditStuff} />
          <Route path="/create" component={CreateStuff} />
        </Switch>{" "}
      </Router>
    </>
  );
}

export default App;
