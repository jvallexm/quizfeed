import React from "react";
import API   from "../utils/api";
import { Jumbotron, Button } from 'reactstrap';

class Home extends React.Component{

    state = {

        quizzes: []

    }

    componentDidMount(){

        let id = this.props.match.params.id;

        if(id) {

            console.log("finding quizzes by " + id);

            API.getAllByUser(id).then(res=>{

                this.setState({quizzes: res.data});

            });

        } else {

            console.log("finding all quizzes");

            API.findAll(id).then(res=>{

                this.setState({quizzes: res.data});

            });

        }

    }

    render(){

        return(

                <div>
      <Jumbotron>
        <h1 className="display-3">Hot Poppers</h1>
        <h3>(quizfeed)</h3>
        <p className="lead">
          <Button color="primary">Create a Quiz</Button>
        </p>
      </Jumbotron>
    </div>

        )

    }

}

export default Home;