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
        this.interval = setInterval(()=>{
            console.log("Autosaving...");
            this.save();
        },30000);
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
    save(){

        this.props.save("results",this.props.rInd,this.state.result);

    }
    setImage(src){
        let result = this.state.result;
        result.image = src;
        this.setState({result: result, search: false});
    }
    handleChange(e){

        let result = this.state.result;
        result[e.target.name] = e.target.value;
        this.setState({result: result});

    }
    render(){

        return(
            
            <Card className="result-card text-center container-fluid">
                <div className="close-left">

                    <Button aria-label="Close" 
                            onClick={()=> this.save()} 
                            title="Save Your Changes!">
                        <span aria-hidden="true">
                            <i class="fa fa-save"></i>
                        </span>
                    </Button>

                    {this.state.result.image !== "" ?

                    <Button aria-label="Close" 
                            onClick={()=> this.setState({search: !this.state.search})} 
                            title="Save Your Changes!">
                        <span aria-hidden="true">
                            <i class={this.state.search ? "fa fa-step-backward" : "fa fa-search"}/>
                        </span>
                    </Button> : ""}

                </div>
                <Row>
                    <Col>
                        {!this.state.search && this.state.result.image == "" ?
                            <div className="search-for result-image-search" onClick={()=>this.setState({search: true})}>
                                    <i className="fa fa-search"/>
                                        <h5>Search For An Image</h5>
                            </div>
                        : this.state.search ? 
                            <div className="tall">
                                <ImageSearch setImage={this.setImage}/> 
                            </div>: 
                        <img className="result-image" src={this.state.result.image}/>}
                    </Col>
                    <Col className="text-left">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>You Got</h4>
                            </div>
                            <div className="col-md-8">

                                <input className="result-headline" name="title" value={this.state.result.title} onChange={this.handleChange}/>
                                <div className="text-right input-count">
                                    {this.state.result.title.length} / 50
                                </div>
                            </div>
                        </div>
                        <div className="text-area-container">
                            <div className="text-area-count">
                                {this.state.result.text.length} / 500
                            </div>
                            <textarea className="result-text" name="text" value={this.state.result.text} onChange={this.handleChange}/>
                        </div>
                    </Col>
                </Row>
                <input className="result-headline url" name="image" value={this.state.result.image} placeholder="Or enter an image url" onChange={this.handleChange}/>
            </Card>

        )

    }

}

export default NewResult;