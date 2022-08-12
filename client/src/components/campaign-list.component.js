import React, { Component } from "react";
import axios from "axios";

export default class CampaignList extends Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        // console.log(this.state.name)
        // console.log(e.target[1].files)
        // console.log(e.target[2].files)

        // Promise to read html file contents. Since FileReader() takes a little bit of time to read the html file, the promise will stop the code for the reader to finish then we can send data to the server
        const uploadFileToText = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (evt) => {
                resolve(evt.target.result);
            };

            reader.readAsText(e.target[1].files[0])

        });

        uploadFileToText
            .then((result) => {

                const campaign = {
                    name: this.state.name,
                    html: result
                }

                axios.post('http://localhost:5001/campaigns/add', campaign)
                    .then(res => console.log(res.data));
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input 
                        required
                        type="text" 
                        value={this.state.name}
                        onChange={this.onChangeName}></input>
                    <input 
                        type="file" 
                        accept=".html"></input>
                    <input 
                        type="file" 
                        accept=".png, .jpg, .jpeg, .gif"
                        multiple></input>
                    <input 
                        type="submit"></input>
                </form>
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