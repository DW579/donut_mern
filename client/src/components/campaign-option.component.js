import React, { Component } from "react";
import axios from "axios";

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
        axios.delete("http://localhost:5001/campaigns/" + this.state.id)
            .then(response => {
                console.log(response)
                if(response.status === 200) {
                    console.log("successful delete, tell parent")
                    this.props.parentCallback("Data from child");
                    // window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <div 
                    style={{display: "inline-block", paddingRight: "20px"}}
                    >
                        {this.state.name}
                    </div>
                <div 
                    style={{display: "inline-block", paddingRight: "20px"}} 
                    onClick={this.copyHtml}
                    >
                        Copy
                    </div>
                <div 
                    style={{display: "inline-block"}}
                    onClick={this.deleteCampaign}
                    >
                        Delete
                    </div>
            </div>
        )
    }
}