import React        from "react";
import Answer    from "./Answer";
import {Card, Row } from 'reactstrap';
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

            <Card className="question-card soft-jumbo" style={{backgroundColor: this.props.backgroundColor, color: this.props.color}}>
               
                    <h2>{this.props.question.question}</h2>

            </Card>
            <div className="answer-row">
                <Row>
                    {   this.props.question.answers ?
                        this.props.question.answers.map((ele,i)=>

                            <Answer key             = { "question-" + this.props.qInd + "-answer-" + i } 
                                    ind             = { i                                              }
                                    image           = { ele.image                                      }
                                    qInd            = { this.props.qInd                                }
                                    type            = { this.props.type                                } 
                                    title           = { ele.title                                      }
                                    color           = { ele.color                                      }
                                    backgroundColor = { ele.backgroundColor                            } 
                                    results         = { this.props.results                             }
                                    picked          = { ele.picked                                     }
                                    plusOne         = { ele.plusOne                                    } 
                                    plusTwo         = { ele.plusTwo                                    } 
                                    howMany         = { this.props.question.answers.length             } 
                                    score           = { this.props.score                               }/>
                        ) : ""
                    }
                    
                </Row>
            
            </div>

                
            </div>

        )

    }

}

export default Question;