import React, { Component } from "react";

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
        this.setState({
            campaigns: ["First campaign", "Second campaign"]
        })
    }

    render() {
        return (
            <div>
                <p>You are on the Campaign List componenet!</p>
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