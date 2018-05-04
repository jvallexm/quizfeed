import React        from "react";
import Answer    from "./Answer";
import {Card, CardBody, Button, CardFooter, Row } from 'reactstrap';
import { SketchPicker } from 'react-color';
import "./NewQuestion.css"

class Question extends React.Component{

    constructor(props){
        super(props);

        this.state = {

        }

        /* Binding state handlers to be passed to children */

        this.handleChange           = this.handleChange.bind(this);
        this.handleAnswerChange      = this.handleAnswerChange.bind(this);
        this.handleChangeComplete    = this.handleChangeComplete.bind(this);

    }

    /* Handler for answer text changes */

    handleAnswerChange(e){

        let index   = parseInt(e.target.getAttribute("data-ind"),10);
        this.props.handleAnswerChange(e,this.props.qInd,index);

    }

    handleChange(e){

        this.props.handleQuestionChange(e,this.props.qInd);

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

    handleChangeComplete(color){

        this.props.handleColorChange(color,this.state.bg,this.props.qInd);

    }


    render(){

        return(

            <div className="space">

            <Card className="question-card">

                <CardBody className="question-card-body" style={{backgroundColor: this.props.backgroundColor}}>
               
                    <input className   = "question-title" 
                           name        = "question" 
                           id          = "quizQuestion" 

                           placeholder = {this.props.color === "black" ? "Type Your Question Here!" : "Enter a Title to See Your Color Changes!"}

                           onChange    = {this.handleChange} 
                           style       = {{backgroundColor: this.props.backgroundColor, color: this.props.color}}/>
  
                    <br/>

                </CardBody>
                <CardFooter>
                
                <Row>
                {   this.props.question.answers ?
                    this.props.question.answers.map((ele,i)=>

                        <Answer key             = { "question-" + this.props.qInd + "-answer-" + i } 
                                   ind             = { i                                              }
                                   image           = { ele.image === "" ? false : ele.image           }
                                   qInd            = { this.props.qInd                                }
                                   imageChange     = { this.props.handleAnswerImageChange             }
                                   handleChange    = { this.handleAnswerChange                        } 
                                   type            = { this.props.type                                } 
                                   title           = { ele.title                                      }
                                   colorChange     = { this.props.handleAnswerColorChange             } 
                                   color           = { ele.color                                      }
                                   backgroundColor = { ele.backgroundColor                            } 
                                   results         = { this.props.results                             }
                                   plusOne         = { ele.plusOne                                    } 
                                   plusTwo         = { ele.plusTwo                                    } 
                                   howMany         = { this.props.question.answers.length             } 
                                   trash           = { ()=>this.props.trashAnswer(this.props.qInd,i)  }/>
                    ) : ""
                }
                {this.props.question.answers.length < 9 ?
                
                <div className={this.props.question.answers.length < 3 ? "col-md-6" : "col-md-4"}>
                

                </div> :""}
                </Row>
                         

                </CardFooter>
                </Card>


                
            </div>

        )

    }

}

export default Question;