import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import CampaignList from "./components/campaign-list.component";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Router>
      <Container fluid>
        <Navbar />
        <br/>
        <Route path="/" exact component={CampaignList} />
      </Container>
    </Router>
  );
}

export default App;