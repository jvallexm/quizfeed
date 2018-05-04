import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Button, Jumbotron, Row } from "reactstrap";
import Question from '../components/Question';
import PickingRow from '../components/PickingRow';
import "./EditQuiz.css";
import { SketchPicker } from 'react-color';
import Result from "../components/Result";



class Quiz extends React.Component{
    

    constructor(props){

        super(props);
        this.state = {

            quiz: {
                title: "",
                questions: [],
                results: [],
                isDraft: true,
                backgroundColor: "#b7f5a2",
                color: "black",
                _id: Date.now(),
                author: this.props.user.name,
                author_id: this.props.user._id,
                comments: [],
                stars: [],
                results: []
            },
            redirect: false,
            score: []

        }

    }
    
    
    componentWillMount(){

        let id = this.props.match.params.id;

        API.findAll().then(arr=>console.log(arr));

        /* If id is part of the request it tried to find the quiz to edit */

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{


                if(res.data){

                    this.setState({quiz: res.data, published: true});

                } else {

                    console.log("Error: no quiz");
                    this.setState({redirect: true});

                }

            });

        }

    }

    render(){

        // Redirects on an error

        if(this.state.redirect)
            return <Redirect to="/404"/>
            
        return(
        
            <div className="container">

                <section className="jumbotron text-center" style={{backgroundColor: this.state.quiz.backgroundColor}}>

                    {/* Quiz Title */}

                 
                        <h1  style= { {color: this.state.quiz.color} }>
 { this.state.quiz.title }</h1>
                   

                </section>

                <center>

                        {this.state.quiz.questions.map((ele,i)=>

                            <Question key                     = { "question-"+i                  }
                                      question                = { ele                            } 
                                      save                    = { this.saveBlock                 }
                                      qInd                    = { i                              }
                                      backgroundColor         = { ele.backgroundColor            }
                                      color                   = { ele.color                      }
                                      type                    = { ele.type                       } 
                                      results                 = { this.state.quiz.results        } />
                            
                        )}

                </center>

                                {
                    this.state.quiz.results.map((ele,i)=>

                        <Result key={"result-"+i}
                                   result={ele}
                                   save={this.saveBlock}
                                   rInd={i}
                                   handleChange={this.handleResultChange}
                                   setImage    = { this.handleResultImageChange }
                                   trash = {()=>this.deleteBlock("results",i)}/>

                    )
                }
             </div>

        )

    }

}

export default Quiz;