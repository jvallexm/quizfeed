import React from "react";
import { Card, CardHeader } from 'reactstrap';
import "./Answer.css"
import Image from "./Image";

class Answer extends React.Component {

    constructor(props){

        super(props);
        this.state = {

        }


    }


    render()
    {
        return(

            <div className={this.props.howMany < 4 ? "col-md-6" : "col-md-4"}>


                {/* Icons bar */}

                <Card className="mb-4 box-shadow" style={this.props.picked ? {border: "solid red 5px"} : null}>

                    <CardHeader className={this.props.type === "text" ? "text-block-head" : "image-head"} onClick={()=>this.props.score(this.props.qInd,this.props.ind,this.props.plusOne,this.props.plusTwo)}>

                        {/* Renders text if the block type is not image */}

                        {this.props.picked ? <div className="close"><i className="fa fa-check"/></div>: "" }

                        {
                            this.props.type !== "image" && !this.state.search && (this.props.image || this.props.type === "text")
                            ?    
                                <div className="text-float" style={this.props.type === "text" ? {color: this.props.color, backgroundColor: this.props.backgroundColor} : {color: this.props.color }}>
                                    <h2>{this.props.title}</h2>
                                </div>

                            :""

                        }

                        {/* Renders either a search block or the image based on state*/}

                        { this.props.image && !this.state.search && this.props.type !== "text"

                        ? 
                        
                        <div className="grow pic">
                        <img className="answer-image" alt="" src={this.props.image}/>
                        </div>

                        : this.props.type !== "text" ? <Image setImage={this.setImage}/> : ""}
                        
                        

                    </CardHeader>
                    

                            
                        </Card>

                    </div>





    )

    }

}



export default Answer;