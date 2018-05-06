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

        if(id && !this.props.edit) {

            console.log("finding quizzes by " + id);

            API.getAllByUser(id).then(res=>{

                this.setState({quizzes: res.data});

            });

        } else if(this.props.edit){

            console.log("findind this user's quizzes " +this.props.user._id)

            API.getAllByUser(this.props.user._id).then(res=>{
                console.log(res.data.length);
                this.setState({quizzes: res.data});
            })

        }else {

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

                        <div className="space-bottom" key={q._id} >

                            <QuizListItem title={q.title}
                                          author={q.author}
                                          author_id={q.author_id}
                                          blurb={q.blurb}
                                          stars={q.stars}
                                          id={q._id}
                                          comments={q.comments}
                                          user={this.props.user}
                                          edit={this.props.edit}/>

                        </div>
                    )}

                </div>


        )

    }

}

export default Home;