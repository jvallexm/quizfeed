import React        from "react";
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./Settings.css"

class Settings extends React.Component{

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
                        <img className="pic" alt={this.props.user.givenName} src={this.props.user.imageUrl} />
                        <Button className="homebutton" href="/">Change your name here
                        </Button>    
                    </Col>

                    {/* Where users fill in answers */}

                    <Col className="text-left result-text-col">
                        <h1>Your Display Name: {this.state.errorCode ? "CODE" : "NO CODE"}</h1>
                        <Button className="homebutton" href="/">Change your name here
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

export default Settings;