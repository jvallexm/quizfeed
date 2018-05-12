import React        from "react";
import Answer    from "./Answer";
import {Card, Row } from 'reactstrap';
import "./css/NewQuestion.css"

const Question = (props) => {

        return(

            <div className="space">

            <Card className="question-card soft-jumbo" style={{backgroundColor: props.backgroundColor, color: props.color}}>
               
                    <h2>{props.question.question}</h2>

            </Card>
            <div className="answer-row">
                <Row>
                    {   props.question.answers ?
                        props.question.answers.map((ele,i)=>

                            <Answer key             = { "question-" + props.qInd + "-answer-" + i } 
                                    ind             = { i                                         }
                                    image           = { ele.image                                 }
                                    qInd            = { props.qInd                                }
                                    type            = { props.type                                } 
                                    title           = { ele.title                                 }
                                    color           = { ele.color                                 }
                                    backgroundColor = { ele.backgroundColor                       } 
                                    results         = { props.results                             }
                                    picked          = { ele.picked                                }
                                    plusOne         = { ele.plusOne                               } 
                                    plusTwo         = { ele.plusTwo                               } 
                                    howMany         = { props.question.answers.length             } 
                                    score           = { props.score                               }
                                    answered        = { props.question.answered                   } />
                        ) : ""
                    }
                    
                </Row>
            
            </div>

                
            </div>

        )


}

export default Question;