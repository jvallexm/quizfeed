import React from "react";
import { Card, CardHeader } from 'reactstrap';
import "./css/Answer.css"

const Answer = (props)=> {

    return(

        <div className={props.howMany < 5 ? "col-md-6" : "col-md-4"}>
            
            {/* Icons bar */}

            <Card className="mb-4" style={
                !props.answered ? null: props.picked ? {border: "solid green 5px"} : {opacity: "0.5"}}>

                <CardHeader className={props.type === "text" ? "text-block-head" : "image-head"} 
                            onClick={()=>props.score(props.qInd,props.ind,props.plusOne,props.plusTwo, props.scroll)}>
                    
                    {/* Drop shadow for image and text blocks */}

                    { props.type==="imageAndText" 
                        ? 
                            <div className="drop-shadow"/> 
                        : 
                    null }

                    {/* Shows a checkmark if the image has been picked */}

                    { props.picked 
                        ? 
                            <div className="close"><i className="fa fa-check"/></div>
                        : 
                    null }

                    {/* Renders floating text if the block type is not image */}

                    { props.type !== "image" && (props.image || props.type === "text")
                        ?    
                            <div className="text-float" style={props.type === "text" ? {color: props.color, backgroundColor: props.backgroundColor} : {color: props.color }}>
                                <h2>{props.title}</h2>
                            </div>
                        : 
                    null }

                    {/* Renders an image if there is one */}

                    { props.image && props.type !== "text"
                        ? 
                            <div className="grow pic">
                                <img className="answer-image" alt="" src={props.image}/>
                            </div>
                        
                        : 
                    null }
                        
                </CardHeader>
                            
            </Card>

        </div>

    )


}



export default Answer;