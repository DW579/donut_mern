import React, { Component } from "react";
import axios from "axios";
import "../styles/styles.css"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default class CampaignOption extends Component {
    constructor(props) {
        super(props);

        this.copyHtml = this.copyHtml.bind(this);
        this.deleteCampaign = this.deleteCampaign.bind(this);

        this.state = {
            name: this.props.campaignName,
            id: this.props.campaignId
        }
    }

    copyHtml() {
        axios.get("http://localhost:5001/campaigns/" + this.state.id)
            .then(response => {
                console.log("Copied to clipboard")
                navigator.clipboard.writeText(response.data.html);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCampaign() {
        const campaign_id = this.state.id;

        axios.delete("http://localhost:5001/campaigns/" + campaign_id)
            .then(response => {
                if(response.status === 200) {
                    const campaign_data = {
                        id: campaign_id,
                        delete: true
                    }

                    this.props.deleteCallback(campaign_data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <Card style={{marginBottom: "30px"}}>
                <Card.Header as="h5">{this.state.name}</Card.Header>
                <Card.Body>
                    <Button onClick={this.copyHtml} variant="primary">Copy HTML</Button>
                    <Button onClick={this.deleteCampaign} variant="danger" style={{float: "right"}}>Delete</Button>
                </Card.Body>
            </Card>
        )
    }
}