import React from "react";
import API   from "../utils/api";
import QuizListItem from '../components/QuizListItem';
import './Home.css';

class Home extends React.Component{

    state = {

        quizzes: []

    }

    componentDidMount(){


        if(this.props.user){

            console.log("has user");

        }
        let id = this.props.match.params.id;

        if(id) {

            console.log("finding quizzes by " + id);

            API.getAllByUser(id).then(res=>{

                this.setState({quizzes: res.data});

            });

        } else {

            console.log("finding all quizzes");

            API.findAll().then(res=>{

                this.setState({quizzes: res.data});

            });

        }

    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render(){

        return(

                <div id="quiz-wrapper" className="container-fluid">

                    <div className="jumbotron text-center" onClick={()=>this.nextPath('/newQuiz')}> 
                        Create a New Quiz!
                    </div>

                    {this.state.quizzes.map((q,i)=> 

                        <div className="space-bottom">

                            <QuizListItem key={q._id} 
                                          title={q.title}
                                          author={q.author}
                                          author_id={q.author_id}
                                          blurb={q.blurb}
                                          stars={q.stars}
                                          id={q._id}/>

                        </div>
                    )}

                </div>


        )

    }

}

export default Home;