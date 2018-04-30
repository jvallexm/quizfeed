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
                                Add an Image Block
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="pick-card" onClick={()=>props.newTextBlock()}>
                            <CardBody className="pick-card-body text-center">
                                Add a Text Block
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="pick-card" onClick={()=>props.newImageAndTextBlock()}>
                            <CardBody className="pick-card-body text-center">
                                Add an Image and Text Block
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
        </div>
    );

}

export default PickingRow;