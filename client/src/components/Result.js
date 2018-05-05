import React from 'react';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import "./css/NewResult.css"
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
    LivejournalShareButton,
  
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
    WhatsappIcon,
    RedditIcon,
    TumblrIcon,
    EmailIcon,
    LivejournalIcon,
  } from 'react-share';

class NewResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search: false
        }
        this.setImage = this.setImage.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    /* When the question object state changes it updates the state */

    componentWillReceiveProps(){

        console.log("new question new props");
        this.setState({result: this.props.result});

    }

    /* Updates the state with data when mounting */

    componentWillMount(){

        console.log("moutning props")
        this.setState({result: this.props.result});

    }
    setImage(src){
        
        this.props.setImage(src,this.props.rInd);
        this.setState({search: false});

    }
    handleChange(e){

        this.props.handleChange(e,this.props.rInd);

    }
    render(){
        // const shareUrl = window.location.href;
        const shareUrl = 'http://quizfeed.com';
        const title = this.props.title;

        return(
            <center>
            <div className="space">
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
        <div className="Demo__some-network">
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button">
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>
        </div>

        <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button">
            <TwitterIcon
              size={32}
              round />
          </TwitterShareButton>
        </div>

        <div className="Demo__some-network">
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            windowWidth={750}
            windowHeight={600}
            className="Demo__some-network__share-button">
            <LinkedinIcon
              size={32}
              round />
          </LinkedinShareButton>
        </div>

        <div className="Demo__some-network">
          <PinterestShareButton
            url={String(window.location)}
            // media={`${String(window.location)}/${exampleImage}`}
            windowWidth={1000}
            windowHeight={730}
            className="Demo__some-network__share-button">
            <PinterestIcon size={32} round />
          </PinterestShareButton>
        </div>

        <div className="Demo__some-network">
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button">
            <RedditIcon
              size={32}
              round />
          </RedditShareButton>
        </div>

        <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
            className="Demo__some-network__share-button">
            <EmailIcon
              size={32}
              round />
          </EmailShareButton>
        </div>
                    </Row>
           </CardBody>
            </Card>
</div>
</center>


        )

    }

}

export default NewResult;