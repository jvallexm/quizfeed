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

    }

    render(){

        return(

            <div className="space">

            <Card className="question-card">

                <CardBody className="question-card-body" style={{backgroundColor: this.props.backgroundColor}}>
               
                    <h2>{this.props.question.question}</h2>

                </CardBody>
                <CardFooter>
                
                <Row>
                {   this.props.question.answers ?
                    this.props.question.answers.map((ele,i)=>

                        <Answer key             = { "question-" + this.props.qInd + "-answer-" + i } 
                                ind             = { i                                              }
                                image           = { ele.image === "" ? false : ele.image           }
                                qInd            = { this.props.qInd                                }
                                type            = { this.props.type                                } 
                                title           = { ele.title                                      }
                                color           = { ele.color                                      }
                                backgroundColor = { ele.backgroundColor                            } 
                                results         = { this.props.results                             }
                                plusOne         = { ele.plusOne                                    } 
                                plusTwo         = { ele.plusTwo                                    } 
                                howMany         = { this.props.question.answers.length             } />
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