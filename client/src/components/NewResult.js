import React from 'react';
import { InputGroup, Card, CardBody, CardTitle, Button, ButtonGroup, Label, Input, CardHeader, Row, Col } from 'reactstrap';
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
            
            <Card className="result-card text-center container-fluid">
            <CardBody>

                {/* Result buttons */}

                <div className="close-left">

                    {/* Search again after image has been selected */}

                    {this.state.result.image !== "" ?

                    <Button aria-label="Text" 
                            onClick={()=> this.setState({search: !this.state.search})} 
                            title="Save Your Changes!">
                        <span aria-hidden="true">
                            <i class={this.state.search ? "fa fa-step-backward" : "fa fa-search"}/>
                        </span>
                    </Button> : ""}

                </div>

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
                        <img className="result-image" src={this.state.result.image}/>}
                    </Col>

                    {/* Where users fill in answers */}

                    <Col className="text-left result-text-col">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>You Got:</h4>
                            </div>
                            <div className="col-md-8 result-text-col">

                                <input 
                                    className="result-headline" 
                                    name="title" 
                                    placeholder="Name Your Result Here..."
                                    value={this.state.result.title} 
                                    onChange={this.handleChange}/>
                                <div className="text-right input-count">
                                    {this.state.result.title.length} / 50
                                </div>
                            </div>
                        </div>
                        <div className="text-area-container">
                            <div className="text-area-count">
                                {this.state.result.text.length} / 500
                            </div>
                            <textarea 
                                className="result-text" 
                                name="text" 
                                placeholder="...And Describe Your Result Here."
                                value={this.state.result.text} 
                                onChange={this.handleChange}/>
                        </div>
                    </Col>
                </Row>
                <input className="result-headline url" name="image" value={this.state.result.image} placeholder="Or enter an image url" onChange={this.handleChange}/>
           </CardBody>
            </Card>

        )

    }

}

export default NewResult;