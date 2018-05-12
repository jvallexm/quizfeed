import React from 'react';
import { Card, CardBody, Button, Row, Col, CardFooter } from 'reactstrap';
import "./css/NewResult.css"
import ImageSearch from './Image';

class NewResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            search: false,
            imageIsBroken: false
        }
        this.setImage = this.setImage.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    /* When the question object state changes it updates the state */

    componentWillReceiveProps(){

        this.setState({result: this.props.result});

    }

    /* Updates the state with data when mounting */

    componentWillMount(){

        this.setState({result: this.props.result});

    }
    setImage(src){
        
        this.props.setImage(src,this.props.rInd);
        this.setState({search: false});

    }
    handleChange(e){

        this.props.handleChange(e,this.props.rInd);

    }

    /* Sends broken images back to the quiz component */

    imageError(){

        if(!this.state.imageIsBroken){
            this.props.breakImage(true);
            this.setState({imageIsBroken: true});
        }

    }

    /* Lets the quiz component know when images have been fixed */

    imageFix(){

        if(this.state.imageIsBroken){
            this.props.breakImage(false)
            this.setState({imageIsBroken: false});
        }

    }
    render(){

        return(

            <center>

                <div className="space">

                    <Card className="result-card text-center">

                        <CardBody>
                            
                            {/* Result buttons */}
                            
                            <div className="close-result">

                                {/* Search again after image has been selected */}

                                { this.state.result.image !== "" 
                                    ?

                                        <Button className="btn-search"
                                                aria-label="search" 
                                                onClick={()=> this.setState({search: !this.state.search})} 
                                                title="Save Your Changes!">
                                            <span aria-hidden="true">
                                                <i className={this.state.search ? "fa fa-step-backward" : "fa fa-search"}/>
                                            </span>
                                        </Button> 
                                    : 
                                ""}
                            </div>

                            {/* Delete Result */}

                            <div className="close-trash-question">

                                <i className = "fa fa-trash"
                                   title     = "Delete this result"
                                   onClick   = { ()=>this.props.trash("results",this.props.rInd) }/>
                            </div>

                            {/* Main card info */}

                            <Row>

                                {/* Displays image, search block, or image search */}

                                <Col className="result-image-col">
                                    
                                    { !this.state.search && this.state.result.image === "" 
                                        ?

                                            <div className="search-for result-image-search" onClick={()=>this.setState({search: true})}>
                                                    <i className="fa fa-search"/>
                                                        <h5>Add An Image</h5>
                                            </div>

                                        : this.state.search 
                                        
                                        ? 

                                            <div className="tall">
                                                <ImageSearch setImage={this.setImage}/> 
                                            </div>
                                            
                                        : 

                                            <img onLoad={()=>this.imageFix()} 
                                                 onError={()=>this.imageError()}
                                                 className="result-image" 
                                                 alt="Final Result" 
                                                 src={this.state.result.image}/>
                                    }

                                </Col>

                                {/* Where users fill in answers */}

                                <Col className="text-left result-text-col">
                                    
                                    <div className="row">
                                        
                                        <div className="col-md-4">
                                            <h4>You Got:</h4>
                                        </div>

                                        <div className="col-md-8 result-text-col">

                                            <input className   = "result-headline" 
                                                   name        = "title" 
                                                   placeholder = "Name Your Result Here..."
                                                   value       = { this.state.result.title } 
                                                   onChange    = { this.handleChange }       />
                                            
                                            <div className="text-right input-count">
                                                {this.state.result.title.length} / 50
                                            </div>
                                            
                                        </div>

                                    </div>

                                    <div className="text-area-container">

                                        <textarea 
                                            className="result-text" 
                                            name="text" 
                                            placeholder="...And Describe Your Result Here."
                                            value={this.state.result.text} 
                                            onChange={this.handleChange}/>

                                        <div className="text-right smol-words">
                                            {this.state.result.text.length} / 500
                                        </div>

                                    </div>

                                </Col>

                            </Row>

                        </CardBody>

                        <input  className   = "result-headline url" 
                                name        = "image" 
                                value       = { this.state.result.image } 
                                placeholder = "Or enter an image url" 
                                onChange    = { this.handleChange } />

                    
                    </Card>
                
                </div>
            
            </center>


        )

    }

}

export default NewResult;