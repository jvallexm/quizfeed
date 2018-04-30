import React from "react";
import { InputGroup, Card, CardBody, CardTitle, Button, ButtonGroup, Label, Input, CardHeader, CardFooter } from 'reactstrap';
import "./NewAnswer.css"
import ImageSearch from "./ImageSearch";
import {SketchPicker} from 'react-color';

class NewAnswer extends React.Component {

    constructor(props){

        super(props);
        this.state = {

            search: false,
            bg: false

        }

        this.setImage = this.setImage.bind(this);

    }

    setImage(src){

        this.props.imageChange(src,this.props.ind);
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
        
        this.props.colorChange(color,this.state.bg,this.props.ind)

    }

    render()
    {
        return(

            <div className="col-md-4">

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

                       <div className="close">

                        {/* Background color fill */}

                        { 
                            this.props.type === "text" 
                            
                            ?
                            
                            <Button aria-label="Close" 
                                    onClick={()=> this.handleClick(true)} 
                                    title="Change Background Color!">
                                <span aria-hidden="true">
                                    <i class="fas fa-paint-brush"></i>
                                </span>
                            </Button> 
                            
                            : ""
                        }

                        {/* Text Color Fill */}

                        {
                            
                            this.props.title !== "" && this.props.type !== "image" 
                            
                            ?

                            <Button aria-label="Close" 
                                    onClick={()=> this.handleClick(false)} 
                                    title="Change Font Color!">
                                <span aria-hidden="true">
                                    <i class="fas fa-font"></i>
                                </span>
                            </Button> 
                            
                            : ""
                        }

                        {/* Image Search */}

                        {this.props.image && this.props.type !=="text"  ?

                            <Button aria-label="Close" 
                                    onClick={()=>this.setState({search: !this.state.search})} 
                                    title={this.state.search ? "Go Back" : "Search for a new image"}>
                                <span aria-hidden="true">
                                    <i className={this.state.search ? "fa fa-step-backward" : "fa fa-search"}/>
                                </span>
                            </Button> : 
                        ""} 
                        
                        </div>

                    <CardHeader className={this.props.type === "text" ? "text-block-head" : "image-head"}>

                        {/* Renders text if the block type is not image */}

                        {this.props.type !== "image" && !this.state.search && (this.props.image || this.props.type == "text")
                            ?    <div className="text-float" style={this.props.type === "text" ? {color: this.props.color, backgroundColor: this.props.backgroundColor} : {color: this.props.color }}>
                                    {this.props.title}
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

                        ? <img className="answer-image" src={this.props.image}/>

                        : this.props.type !== "text" ? <ImageSearch setImage={this.setImage}/> : ""}
                        
                        

                    </CardHeader>
                    
                        <CardBody>

                            {/* Question Title */}
                                {this.props.type !== "image" ?
                                <input name        = "title" 
                                       className   = "answer-title" 
                                       placeholder = "Type Your Answer Here" 
                                       data-ind    = {this.props.ind}
                                       onChange    = {this.props.handleChange} /> :""}

                                {/* Image URL */}
                                {this.props.type !== "text" ?
                                <input name        = "image" 
                                       className   = "answer-title" 
                                       placeholder = "Add Image by URL" 
                                       data-ind    = {this.props.ind}
                                       onChange    = {this.props.handleChange} 
                                       value       = {this.props.image ? this.props.image : ""}/> : ""}


                            </CardBody>
                            <CardFooter>    
                                <div>
                                    +2 Points
                                    <select name="plusTwo" onChange={this.props.handleChange} data-ind = {this.props.ind} value={this.props.plusTwo}>
                                         <option value="-1">-</option>
                                         {this.props.results.map((r,i)=> <option key={"answer-" + this.props.ind + "-primary-" +i } value={i}>{r.title}</option> )}
                                    </select>
                                </div>
                                <div>
                                    +1 Point 
                                    <select name="plusOne" onChange={this.props.handleChange} data-ind = {this.props.ind} value={this.props.plusOne}>
                                        <option value="-1">-</option>
                                        {this.props.results.map((r,i)=> <option key={"answer-" + this.props.ind + "-secondary-" +i } value={i}>{r.title}</option> )}
                                    </select>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>





    )

    }

}

export default NewAnswer;