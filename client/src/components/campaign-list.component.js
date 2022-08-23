import React, { Component } from "react";
import axios from "axios";
import donut_gif from "../images/donut.gif"

import CampaignOption from "./campaign-option.component";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class CampaignList extends Component {
    constructor(props) {
        super(props);

        this.handleCallback = this.handleCallback.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: "",
            html: "",
            image_folder_exist: false,
            campaign_names: [],
            campaigns: [],
            loading: false,
            uploading: ""
        }
    }


    handleCallback(campaign_data){
        if(campaign_data.delete) {
            this.setState({
                campaigns: this.state.campaigns.filter(function(campaign) {
                    return campaign._id !== campaign_data.id;
                })
            })
        }
    }

    componentDidMount() {
        // Pull all campaigns from mongodb
        axios.get("http://localhost:5001/campaigns")
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        campaign_names: response.data.map(campaign => campaign.name),
                        campaigns: response.data.map(campaign => campaign)
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
        }, () => {
            const current_name = this.state.name;
            const campaign_names = this.state.campaign_names;

            // Search the campaign_names array, if the user provided name is in the array put a red border on input and disable the submit button
            if(campaign_names.find(campaign_name => campaign_name === current_name) !== undefined) {
                e.target.setAttribute("style", "border: 2px solid red; outline: none");
                this.setState({
                    image_folder_exist: true
                })
            }
            else {
                e.target.setAttribute("style", "outline: none;")
                this.setState({
                    image_folder_exist: false
                })
            }
            
        })
        
    }

    async onSubmit(e) {
        e.preventDefault();

        // console.log(e.target[1].files) //html file
        // console.log(e.target[2].files) //images

        // Display loading screen and hide dashboard
        this.setState({
            loading: true
        })

        // Images that the user uploaded
        const uploaded_images = e.target[2].files;

        // Build the campaign object to ultimatly pass to the server through axios post
        const campaign = {
            name: this.state.name,
            images_folder_path: "",
            html: ""
        }

        // Create imagekit.io folder to host images, if folder name already exist throw error
        const folder_name = {
            folder_name: this.state.name
        }

        await axios.post("http://localhost:5001/campaigns/create_image_folder", folder_name)
            .then(res => {
                console.log(res.data);
                campaign.images_folder_path = "/" + res.data;
            })
            .catch((error) => {
                console.log(error);
            })

        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });

        for(let uploaded_image of uploaded_images) {
            const base64 = await toBase64(uploaded_image);

            const image = {
                base64: base64,
                file_name: uploaded_image.name,
                images_folder_path: campaign.images_folder_path
            }

            await axios.post('http://localhost:5001/campaigns/host_image', image)
                    .then(res => {
                        console.log(res.data)
                        this.setState({
                            uploading: res.data
                        })
                    });
        }

        this.setState({
            uploading: "Finish uploading images"
        })
        console.log("Finish uploading images")

        

        // Promise to read html file contents. Since FileReader() takes a little bit of time to read the html file, the promise will stop the code for the reader to finish then we can send data to the server through axios
        const uploadFileToText = new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (evt) => {
                resolve(evt.target.result);
            };

            reader.readAsText(e.target[1].files[0]);

        });

        uploadFileToText
            .then((result) => {

                const image_url = '"https://ik.imagekit.io/c2lziyvdx' + campaign.images_folder_path;

                const final_html = result.replace(/"images/g, image_url);

                campaign.html = final_html;

                axios.post('http://localhost:5001/campaigns/add', campaign)
                    .then(res => {
                        console.log(res.data);

                        this.setState({
                            name: "",
                            campaigns: [...this.state.campaigns, res.data],
                            loading: false,
                            uploading: ""
                        })

                        // Reset the upload file inputs to have no files
                        e.target[1].value = null;
                        e.target[2].value = null;
                    });
            })
    }

    render() {
        const loading = this.state.loading;

        return (
            <div>
                {loading
                    ?
                    <Row>
                        <Col>
                            <img src={donut_gif} style={{display: "block", marginLeft: "auto", marginRight: "auto"}} alt="donut"></img>
                            <h1 style={{textAlign: "center"}}>Uploading....</h1>
                            <h2 style={{textAlign: "center"}}>{this.state.uploading}</h2>
                        </Col>
                    </Row>
                    :
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input 
                                required
                                type="text" 
                                style={{outline: "none"}}
                                value={this.state.name}
                                onChange={this.onChangeName}></input>
                            <input 
                                required
                                type="file" 
                                accept=".html"></input>
                            <input 
                                required
                                type="file" 
                                accept=".png, .jpg, .jpeg, .gif"
                                multiple></input>
                            <input 
                                disabled={this.state.image_folder_exist}
                                type="submit"></input>
                        </form>
                        {
                            this.state.campaigns.map(campaign => (

                                <CampaignOption 
                                key={campaign.name} 
                                campaignName={campaign.name}
                                campaignId={campaign._id}
                                deleteCallback={this.handleCallback}
                                ></CampaignOption>
                            ))
                        }
                    </div>
                }
            </div>
        )
    }
}