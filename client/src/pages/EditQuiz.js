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

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{

                if(res.data){
                    console.log("Quiz found");
                } else {
                    console.log("Error: no quiz");
                    this.setState({redirect: true});
                }

            });

        } else {

            console.log("this quiz is new!");

        }

    }

    render(){

        if(this.state.redirect)
            return <Redirect to="/"/>

        return(

            <h1>Poppers Hot</h1>

        )

    }

}

export default EditQuiz;