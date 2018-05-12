import React from "react";
import { Card, CardBody, Button, CardHeader, CardFooter, Tooltip,} from 'reactstrap';
import "./css/NewAnswer.css"
import ImageSearch from "./Image";
import {SketchPicker} from 'react-color';

class NewAnswer extends React.Component {

    constructor(props){

        super(props);
        this.state = {

            search: false,
            bg: false,
            showUrl: false,
            tooltipOpen: false,
            imageIsBroken: false

        }

        this.toggle = this.toggle.bind(this);
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

    imageError(){

        if(!this.state.imageIsBroken){
            this.props.breakImage(true);
            this.setState({imageIsBroken: true});
        }

    }

    imageFix(){

        if(this.state.imageIsBroken){
            this.props.breakImage(false)
            this.setState({imageIsBroken: false});
        }

    }

    toggle() {
        this.setState({
          tooltipOpen: !this.state.tooltipOpen
        });
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

                    <div className="close">

                    {/* Background color fill */}

                    { 
                        this.props.type === "text" 
                            
                        ?
                            
                        <Button aria-label = "Close" 
                                onClick    = {()=> this.handleClick(true)} 
                                title      = "Change Background Color!">

                            <span aria-hidden="true">
                                <i className="fas fa-paint-brush"/>
                            </span>

                        </Button> 
                            
                        : ""

                    }

                    {/* Text Color Fill */}

                    {
                            
                        this.props.title !== "" && this.props.type !== "image" 
                            
                        ?

                        <Button aria-label = "Close" 
                                onClick    = {()=> this.handleClick(false)} 
                                title      = "Change Font Color!">

                            <span aria-hidden="true">
                                <i className="fas fa-font"/>
                            </span>
                        </Button> 
                            
                        : ""

                    }

                    {/* Image Search */}

                    {
                        this.props.image && this.props.type !=="text"  
                            
                        ?

                        <Button className="btn-search"
                                aria-label="Close" 
                                onClick={()=>this.setState({search: !this.state.search})} 
                                title={this.state.search ? "Go Back" : "Search for a new image"}>

                            <span aria-hidden="true">
                                <i className={this.state.search ? "fa fa-step-backward" : "fa fa-search"}/>
                            </span>

                        </Button> 
                            
                        : ""
                    } 
                        
                    </div>

                    <div className="close-trash">

                        <Button className="btn-trash"
                                aria-label="Trash" 
                                onClick={()=>this.props.trash()} 
                                title="Delete This Answer">
                            <span aria-hidden="false">
                                <i className="fas fa-trash"></i>
                            </span>
                        </Button>

                    </div>

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

                        ? 
                            <div className="nogrow pic">
                                <img className="answer-image" 
                                     alt="" 
                                     src={this.props.image}
                                     onError={()=>this.imageError()}
                                     onLoad={()=>this.imageFix()}
                                     style={this.state.imageIsBroken ? {border: "5px solid red"} :{}}/>
                            </div>

                        : this.props.type !== "text" ? <ImageSearch setImage={this.setImage}/> : ""}
                        
                        

                    </CardHeader>
                    
                    <CardBody className="text-center answer-block">


                        {/* Image URL */}

                                {this.props.type !== "text"  && this.state.showUrl?

                                <input name        = "image" 
                                       className   = "answer-title url greybox" 
                                       placeholder = "Enter Your Image URL Here" 
                                       data-ind    = {this.props.ind}
                                       onChange    = {this.props.handleChange} 
                                       value       = {this.props.image ? this.props.image : ""}/> : ""}

                                {this.props.type !== "text" ?

                                <button className="smol" onClick={()=>this.setState({showUrl: !this.state.showUrl})}>{this.state.showUrl ? "Hide URL" : "Add Image By Url"}</button>

                                :""}


                        {/* Question Title */}

                                {this.props.type !== "image" ?
                                <input name        = "title" 
                                       className   = "answer-title text-center greybox" 
                                       placeholder = "Type Your Answer Text Here" 
                                       data-ind    = {this.props.ind}
                                       onChange    = {this.props.handleChange} 
                                       value       = {this.props.title} /> :""}

                       


                            </CardBody>
                            <CardFooter >    

                                <h6 className="text-center">

                                    <div className="right-float">
                                        <span id={"q-"+this.props.qInd+"-a-"+this.props.ind}>
                                            <i className="fas fa-question-circle" style={{opacity: .5}}/>
                                        </span>
                                    </div>
                                    
                                    Result Scoring 

                                </h6>

                                <Tooltip placement="bottom" 
                                         isOpen={this.state.tooltipOpen} 
                                         target={"q-"+this.props.qInd+"-a-"+this.props.ind} 
                                         toggle={this.toggle}>

                                    Use these menus to choose the result that correlates to your answer. +2 points correlates strongly, while +1 point correlates less so. <br/>You can always leave the second menu empty. <br/>If you don't see any options in the menus, create a few results first! 
                                    
                                </Tooltip>
                                

                                {/* Selector for +2 Points */}

                            <div className = "point-block">
                                <div className="text-right">

                                    +2 Points &nbsp;
                                    <select name     = "plusTwo" 
                                            onChange = {this.props.handleChange} 
                                            data-ind = {this.props.ind} 
                                            value    = {this.props.plusTwo}>

                                         <option value="-1">{this.props.results.length === 0 ? "Add a Result To Score" : "-" }</option> 

                                         {this.props.results.map((r,i)=> 

                                            <option key={"answer-" + this.props.ind + "-primary-" +i } value={i}>
                                                {r.title}
                                            </option> 

                                         )}

                                    </select>
                                </div>

                                {/* Selector for +1 Points */}

                                <div className="text-right">
                                    +1 Point &nbsp;
                                    <select name     = "plusOne" 
                                            onChange = {this.props.handleChange} 
                                            data-ind = {this.props.ind} 
                                            value    = {this.props.plusOne}>

                                        <option value="-1">{this.props.results.length === 0 ? "Add a Result To Score" : "-" }</option>

                                        {this.props.results.map((r,i)=> 

                                            <option key={"answer-" + this.props.ind + "-secondary-" +i } value={i}>
                                                {r.title}
                                            </option> 

                                        )}

                                    </select>
                                </div>
                                </div>
                            </CardFooter>
                        </Card>

                    </div>

        )

    }

}



export default NewAnswer;