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

                { this.state.displayColorPicker 
                
                ? <div className="popover">
                    <div className="cover" onClick={ this.handleClose }/>
                        <SketchPicker color ={ this.state.bg ? this.props.backgroundColor : this.props.color}
                                      onChangeComplete={ this.handleChangeComplete }/>
                 </div> 
                
                : null 
                
                }

                <Card className="mb-4 box-shadow">

                        {this.props.type !== "image" ?

                       <div className="close">

                        {/* Background color fill */}
                        { this.props.type === "text" ?
                        <Button aria-label="Close" 
                                onClick={()=> this.handleClick(true)} 
                                title="Change Background Color!">
                            <span aria-hidden="true">
                                <i class="fas fa-paint-brush"></i>
                            </span>
                        </Button> : ""}

                        {/* Text Color Fill */}

                        {this.props.title !== "" ?

                        <Button aria-label="Close" 
                                onClick={()=> this.handleClick(false)} 
                                title="Change Font Color!">
                            <span aria-hidden="true">
                                <i class="fas fa-font"></i>
                            </span>
                        </Button> : ""}

                        </div> :""}

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

                                {this.props.image && this.props.type !=="text" ?
                                <div className="d-flex justify-content-between align-items-center">
                                    <ButtonGroup className="pull-right">
                                        <Button type="button" onClick={()=>this.setState({search: !this.state.search})}className="btn btn-sm btn-outline-secondary pull-right">{this.state.search ? "Nevermind" : "Choose a New Image"}</Button>
                                    </ButtonGroup>
                                </div>:""}
                            </CardBody>
                            <CardFooter>    
                                <div>
                                    +2 Points
                                    <select>
                                         {this.props.results.map((r,i)=> <option key={"answer-" + this.props.ind + "-primary-" +i }>{r.title}</option> )}
                                    </select>
                                </div>
                                <div>
                                    +1 Point 
                                    <select>
                                     {this.props.results.map((r,i)=> <option key={"answer-" + this.props.ind + "-secondary-" +i }>{r.title}</option> )}
                                    </select>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>





    )

    }

}

export default NewAnswer;