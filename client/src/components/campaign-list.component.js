import React, { Component } from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class CampaignList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            html: "",
            campaigns: []
        }
    }

    componentDidMount() {
        // Pull all campaigns from mongodb
        axios.get("http://localhost:5001/campaigns")
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        campaigns: response.data.map(campaign => campaign.name)
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <p>You are on the Campaign List componenet!</p>
                <Form>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Select Zip</Form.Label>
                        <Form.Control type="file" size="lg" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <ul>
                   {
                    this.state.campaigns.map(function(campaign) {
                        return <li
                            key={campaign}
                            value={campaign}
                            >{campaign}</li>;
                    })
                   } 
                </ul>
            </div>
        )
    }
}