import React        from "react";
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import FailPhoto from './errorimage.jpg';
import { Link } from 'react-router-dom';
import "./Error.css"

class FourOhFour extends React.Component{

    state = {};
    
    componentDidMount(){

        let code = this.props.match.params.code;
        console.log("doing a mount");
        if(code){
            this.setState({errorCode: code});
        }

    };

    render(){

        return(
            <center>
            <div className="space">
            <Card className="result-card text-center">
            <CardBody>

                {/* Main card info */}

                <Row>

                    {/* Display error image */}

                    <Col>
                        <img src={FailPhoto} className="result-image" alt="Final Result"/>
                    </Col>

                    {/* Where users fill in answers */}

                    <Col className="text-left result-text-col">
                        <h1>YOU GOT AN ERROR: {this.state.errorCode ? "CODE" : "NO CODE"}</h1>
                        <Button className="homebutton" href="/">Return Home
                        </Button>
                    </Col>
                </Row>
            </CardBody>
            </Card>
            </div>
          
        </center>



            

        )

    }

}

export default FourOhFour;