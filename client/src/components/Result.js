import React from 'react';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import "./css/Result.css"
import API          from "../utils/api";
import {
    FacebookShareCount,
    LinkedinShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
  
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    RedditShareButton,
    EmailShareButton,
    TumblrShareButton,
  
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    EmailIcon,
  } from 'react-share';

class NewResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search: false
        }

    }

    /* When the question object state changes it updates the state */

    componentWillReceiveProps(){

        console.log("new question new props");
        this.setState({result: this.props.result});

    }

    /* Updates the state with data when mounting */

    componentWillMount(){

        console.log("moutning props")
        console.log(this.props.stars);
        this.setState({result: this.props.result});

    }

    render(){
        // const shareUrl = window.location.href;
        const shareUrl = 'http://quizfeed.com';
        const title = this.props.title;

        return(
            <center>
            <div className="space">
            <meta property="og:image" content={this.state.result.image}/>
            <meta property="og:image:secure_url" content={this.state.result.image}/>
            <Card className="result-card text-center">
            <CardBody>

                {/* Main card info */}

                <Row>

                    {/* Displays image, search block, or image search */}

                    <Col>
                        <img className="result-image" alt="Final Result" src={this.state.result.image}/>
                    </Col>

                    {/* Where users fill in answers */}

                    <Col className="text-left result-text-col">
                                <h4>You Got: {this.state.result.title}</h4>
                        <div className="text-area-container">
                            <p>{this.state.result.text} 
                                </p>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col sm="12" className="text-right">
                        <div className="share-network">
                            <FacebookShareButton
                                url={shareUrl}
                                quote={title}
                                picture={this.state.result.image}
                                className="share-network-btn">
                                <FacebookIcon
                                size={32}
                                round />
                            </FacebookShareButton>
                        </div>

                        <div className="share-network">
                            <TwitterShareButton
                            url={shareUrl}
                            title={title}
                            className="share-network-btn">
                            <TwitterIcon
                            size={32}
                            round />
                            </TwitterShareButton>
                        </div>

                        <div className="share-network">
                        <WhatsappShareButton
                            url={shareUrl}
                            title={title}
                            separator=":: "
                            className="share-network-btn">
                            <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        </div>

                    <div className="share-network">
                    <LinkedinShareButton
                        url={shareUrl}
                        title={title}
                        windowWidth={750}
                        windowHeight={600}
                        className="share-network-btn">
                        <LinkedinIcon
                        size={32}
                        round />
                    </LinkedinShareButton>
                    </div>

        <div className="share-network">
          <PinterestShareButton
            url={String(window.location)}
            // media={`${String(window.location)}/${exampleImage}`}
            media={this.state.result.image}
            windowWidth={1000}
            windowHeight={730}
            className="share-network-btn">
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>

        <div className="share-network">
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="share-network-btn">
            <RedditIcon
              size={32}
              round />
          </RedditShareButton>
        </div>

        <div className="share-network">
          <TumblrShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="share-network-btn">
            <TumblrIcon
              size={32}
              round />
          </TumblrShareButton>
        </div>


        <div className="share-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="share-network-btn">
            <EmailIcon
              size={32}
              round />
          </EmailShareButton>
        </div>
        </Col>
                    </Row>
           </CardBody>
            </Card>
        </div>
            <Button onClick={this.props.stars.indexOf(this.props.user._id) === -1 ? ()=>this.props.pushStar() : ""}>
                {
                    ! this.props.user
                    ? <span>Login to Give This Quiz a <i className="fa fa-star"/>!</span>
                    : this.props.stars.indexOf(this.props.user._id) === -1 
                    ? <span>Give This Quiz a <i className="fa fa-star"/>!</span>
                    : <span>You Gave This Quiz a <i className="fa fa-star"/>!</span>}
            </Button>
</center>


        )

    }

}

export default NewResult;