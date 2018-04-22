import React from "react";
import API   from "../utils/api";

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

            <h1>Hot Poppers</h1>

        )

    }

}

export default Home;