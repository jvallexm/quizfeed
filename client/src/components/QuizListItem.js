import React        from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, CardSubtitle, Button, Row,Col} from 'reactstrap';


const QuizListItem = (props) =>{


  return(

    <Card style={{padding: "20px"}}>
        <Row>
            <Col md="4">
                <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/500x300" alt=""/>
                <h3 style={{marginTop: "10px"}} className="text-center">{props.stars.length} <i className="fa fa-star"/></h3>
            </Col>
            <Col md="8">
                <h3>{props.title}</h3>
                <span className="byline">By {props.author}</span>
                <p>{props.blurb}</p>
           
            </Col>
            <hr/>
        </Row> 
      </Card>)

}

export default QuizListItem;