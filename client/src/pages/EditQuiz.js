import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router'


class EditQuiz extends React.Component{

    state = {

        quiz: {},
        redirect: false

    }
    
    componentDidMount(){

        let id = this.props.match.params.id;

        /* If id is part of the request it tried to find the quiz to edit */

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{

                /* Needs logic to set redirect to true if the user is not the quiz author */
                

                if(res.data){

                    console.log("Quiz found");

                } else {

                    console.log("Error: no quiz");
                    this.setState({redirect: true});

                }

            });

        } else {

            /* Needs logic to redirect if a user is not logged in */

            console.log("this quiz is new!");

        }

    }

    render(){

        if(this.state.redirect)
            return <Redirect to="/404"/>

        return(

            <h1>Loading...</h1>

        )

    }

}

export default EditQuiz;