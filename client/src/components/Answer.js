import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter, FormGroup, Label, Col, Input } from 'reactstrap';
import "./NewAnswer.css"
import Image from "./Image";
import {SketchPicker} from 'react-color';

class Answer extends React.Component {

    constructor(props){

        super(props);
        this.state = {

            search: false,
            bg: false,
            showUrl: false

        }

        this.setImage = this.setImage.bind(this);

    }

    setImage(src){

        this.props.imageChange(src,this.props.qInd,this.props.ind);
        this.setState({search: false});

    }

        /* Click andler for the color picker */

    handleClick = (bg) => {

        /* If bg is true, it sets the color picker to check the background
        Otherwise is changes the text color  */

        this.setState({ displayColorPicker: !this.state.colorpicker,
                    bg: bg ? true : false })
    };

    /* Close handler for the color picker */

    handleClose = () => {

        this.setState({ displayColorPicker: false })

    };

    handleChangeComplete = (color) =>{
        
        this.props.colorChange(color,this.state.bg,this.props.qInd,this.props.ind)

    }

    render()
    {
        return(

            <div className={this.props.howMany < 4 ? "col-md-6" : "col-md-4"}>

                {/* Color picker popover */}

                { 
                
                    this.state.displayColorPicker 
                    
                    ? <div className="popover">
                        <div className="cover" onClick={ this.handleClose }/>
                            <SketchPicker color ={ this.state.bg ? this.props.backgroundColor : this.props.color}
                                        onChangeComplete={ this.handleChangeComplete }/>
                    </div> 
                    
                    : null 
                
                }

                {/* Icons bar */}

                <Card className="mb-4 box-shadow">

                    <CardHeader className={this.props.type === "text" ? "text-block-head" : "image-head"}>

                        {/* Renders text if the block type is not image */}

                        {
                            this.props.type !== "image" && !this.state.search && (this.props.image || this.props.type === "text")
                            ?    
                                <div className="text-float" style={this.props.type === "text" ? {color: this.props.color, backgroundColor: this.props.backgroundColor} : {color: this.props.color }}>
                                    <h2>{this.props.title}</h2>
                                </div>

                            :""

                        }

                        {/* Renders either a search block or the image based on state*/}

                        { !this.state.search && !this.props.image && this.props.type !== "text"

                        ?
                                
                            <div className="search-for" onClick={()=>this.setState({search: true})}>
                                <i className="fa fa-search"/>
                                    <h5>Search For An Image</h5>
                            </div>

                        : this.props.image && !this.state.search && this.props.type !== "text"

                        ? <img className="answer-image" alt="" src={this.props.image}/>

                        : this.props.type !== "text" ? <Image setImage={this.setImage}/> : ""}
                        
                        

                    </CardHeader>
                    
                    <CardBody className="text-center answer-block">


                        {/* Image URL */}

                                {this.props.type !== "text"  && this.state.showUrl?
                                <input name        = "image" 
                                       className   = "answer-title" 
                                       placeholder = "Enter Your Image URL Here" 
                                       data-ind    = {this.props.ind}
                                       onChange    = {this.props.handleChange} 
                                       value       = {this.props.image ? this.props.image : ""}/> : ""}


                        {/* Question Title */}

                                {this.props.type !== "image" ?
                                <h1>{this.props.ind}
                                       </h1> :""}

                       


                            </CardBody>
                            
                        </Card>

                    </div>





    )

    }

}



export default Answer;