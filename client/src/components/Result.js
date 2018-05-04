import React from 'react';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import "./NewResult.css"
import ImageSearch from './ImageSearch';

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

        return(
            <center>
            <div className="space">
            <Card className="result-card text-center">
            <CardBody>

                {/* Main card info */}

                <Row>

                    {/* Displays image, search block, or image search */}

                    <Col>
                        {!this.state.search && this.state.result.image == "" ?
                            <div className="search-for result-image-search" onClick={()=>this.setState({search: true})}>
                                    <i className="fa fa-search"/>
                                        <h5>Add An Image</h5>
                            </div>
                        : this.state.search ? 
                            <div className="tall">
                                <ImageSearch setImage={this.setImage}/> 
                            </div>: 
                        <img className="result-image" alt="Final Result" src={this.state.result.image}/>}
                    </Col>

                    {/* Where users fill in answers */}

                    <Col className="text-left result-text-col">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>You Got:</h4>
                            </div>
                            <div className="col-md-8 result-text-col">

                                <h4> {this.state.result.title} 
                                    </h4>

                            </div>
                        </div>
                        <div className="text-area-container">
                            <p>{this.state.result.text} 
                                </p>
                        </div>
                    </Col>
                </Row>
           </CardBody>
            </Card>
</div>
</center>


        )

    }

}

export default NewResult;