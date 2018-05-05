import React        from "react";
import { Row, Col } from 'reactstrap';


const QuizListItem = (props) =>{


  return(

    <Row>
        <Col md="4">
          <a href="#">
            <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/500x300" alt=""></img>
          </a>
        </Col>
        <Col md="8">
          <h3>{props.title}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
          <p className="byline text-right">By {props.author}</p>
          </Col>
          <hr/>
      </Row> )

}

export default QuizListItem;