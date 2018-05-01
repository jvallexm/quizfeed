import React from 'react';
import { Card, Col, Row, CardBody } from "reactstrap";
import "./PickingRow.css"

const PickingRow = (props) =>{

    return(

        <div id="picking-row">
                    <Row>
                        <Col>
                        <Card className="pick-card" onClick={()=>props.newImageBlock()}>
                                <CardBody className="pick-card-body text-center">
                                <img className="pick-img img-fluid" alt="IMAGE answer" src="/images/question_block_image.png"/>
                                <p>Add Question with IMAGE answers</p>
                                
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="pick-card" onClick={()=>props.newTextBlock()}>
                            <CardBody className="pick-card-body text-center">
                            <img className="pick-img img-fluid" alt="TEXT answer" src="/images/question_block_text.png"/>
                                <p>Add a Question with TEXT answers</p>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="pick-card" onClick={()=>props.newImageAndTextBlock()}>
                            <CardBody className="pick-card-body text-center">
                            <img className="pick-img img-fluid" alt="IMAGE and TEXT answer" src="/images/question_block_both.png"/>
                                <p>Add a Question with IMAGE & TEXT answers</p>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
        </div>
    );

}

export default PickingRow;