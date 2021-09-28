import React from 'react'
import CreateStuff from "./component/crateStuff";
import EditStuff from "./component/EditStuff";
import ListStuff from "./component/ListStuff";
import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={ListStuff} />
      <Route path="/edit/:id" component={EditStuff} />
      <Route path="/create" component={CreateStuff} />
  </Router>
  );
}

export default App;
