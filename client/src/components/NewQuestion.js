import React        from "react";
import NewAnswer    from "./NewAnswer";
import {Card, CardBody, Button, CardFooter, Row } from 'reactstrap';
import { SketchPicker } from 'react-color';
import "./css/NewQuestion.css"

class NewQuestion extends React.Component{

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
                <div className="sidebar">
                    <i className="fa fa-arrow-up" onClick={()=>console.log("Hot Poppers")}/>
                    {this.props.qInd + 1}
                    <i className="fa fa-arrow-down" onClick={()=>console.log("Hot Poppers")}/>
                </div>

                {/* Renders color picker */}

                { this.state.displayColorPicker 
                
                ? <div className="popover">
                    <div className="cover" onClick={ this.handleClose }/>
                        <SketchPicker color ={ this.state.bg ? this.props.backgroundColor : this.props.color}
                                      onChangeComplete={ this.handleChangeComplete }/>
                 </div> 
                
                : null 
                
                }
                
                <div className="close">

                    {/* Background color fill */}

                    <Button aria-label="Fill" 
                            onClick={()=> this.handleClick(true)} 
                            title="Change Background Color!">
                        <span aria-hidden="true">
                            <i className="fas fa-paint-brush"></i>
                        </span>
                    </Button>

                    {/* Text Color Fill */}

                    <Button aria-label="Font" 
                            onClick={()=> this.handleClick(false)} 
                            title="Change Font Color!">
                        <span aria-hidden="true">
                            <i className="fas fa-font"></i>
                        </span>
                    </Button>

                </div>

                <div className="close-bottom-right">

                    <Button className="btn-trash"
                            aria-label="Trash" 
                            onClick={()=>this.props.trash()} 
                            title="Save Your Changes!">
                        <span aria-hidden="true">
                            <i className="fas fa-trash"></i>
                        </span>
                    </Button>

                </div>

                

                <CardBody className="question-card-body" style={{backgroundColor: this.props.backgroundColor}}>

                
               
                    <input className   = "question-title" 
                           name        = "question" 
                           id          = "quizQuestion" 
                           value       = { this.props.question.question }
                           placeholder = { this.props.color === "black" ? "Type Your Question Here!" : "Enter a Title to See Your Color Changes!"}

                           onChange    = { this.handleChange} 
                           style       = { {backgroundColor: this.props.backgroundColor, color: this.props.color}}/>
  
                    <br/>

                </CardBody>
                <CardFooter>
                
                <Row>
                {   this.props.question.answers ?
                    this.props.question.answers.map((ele,i)=>

                        <NewAnswer key             = { "question-" + this.props.qInd + "-answer-" + i } 
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
                
                    <Card className="mb-4 box-shadow">
                        <CardBody>
                            <Button color="success" onClick={()=>this.props.pushNewAnswer(this.props.qInd)}>Add a new Answer Block</Button>
                        </CardBody>
                    </Card>
                </div> :""}
                </Row>
                         

                </CardFooter>
                </Card>
                
            </div>

        )

    }

}

export default NewQuestion;