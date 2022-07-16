import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CampaignList from "./components/campaign-list.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={CampaignList} />
    </Router>
  );
}

export default App;
