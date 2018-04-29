import React from "react";
import { InputGroup, Card, CardBody, CardTitle, Button, ButtonGroup, Label, Input } from 'reactstrap';
import "./NewAnswer.css"

const NewAnswer = () => {

    return(

                    <div className="col-md-4">
                        <Card className="mb-4 box-shadow">
                            <a href="https://placeholder.com"><img className="card-img-top" src="http://via.placeholder.com/150x150"></img></a>
                            <CardBody>
                            <p><input name="Answer" className="answer-title" placeholder="Type Your Answer Here" onChange={this.handleChange} /></p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <ButtonGroup className="pull-right">
                                        <Button type="button" className="btn btn-sm btn-outline-secondary pull-right">Add an Image</Button>
                                        <Button type="button" className="btn btn-sm btn-outline-secondary pull-right">Delete Answer</Button>
                                    </ButtonGroup>
                                </div>
                            </CardBody>
                        </Card>
                    </div>





    )

}

export default NewAnswer;