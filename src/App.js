import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./Components/Nav/Nav.component";
import Main from "./Pages/Main/Main.component";
import Footer from "./Components/Footer/Footer.component";
import ProductList from "./Pages/ProductList/ProductList.component";
import Signup from "./Pages/Signup/Signup.component";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/productlist" component={ProductList} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
