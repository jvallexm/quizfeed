import React        from "react";
import { Row, Col } from 'reactstrap';


const QuizListItem = () =>{


  return(

    <Row>
        <Col md="4">
          <a href="#">
            <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/500x300" alt=""></img>
          </a>
        </Col>
        <Col md="4">
          <h3>Quiz Zero</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
          <p class="byline text-right">by Jamez Kurosami</p>
          </Col>
          <hr/>
      </Row> )

}

export default QuisListItem;