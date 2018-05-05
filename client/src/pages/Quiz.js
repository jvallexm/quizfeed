import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import { Button, Jumbotron, Row } from "reactstrap";
import Question from '../components/Question';
import PickingRow from '../components/PickingRow';
import "./EditQuiz.css";
import { SketchPicker } from 'react-color';
import Result from "../components/Result";
import ReactDOM from 'react-dom';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



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
            score: [],
            answered: 0,
            finalResult: false

        },
        this.score = this.score.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);

    }

    scrollToBottom = () => {
        scroll.scrollToBottom();
    }
    
    componentDidUpdate(){


        if(this.state.finalResult){
            console.log("trying to scroll to bottom");
            this.scrollToBottom();
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

                    let score = [];
                    res.data.results.forEach(i => score.push(0))
                    this.setState({quiz: res.data, score: score, published: true});

                } else {

                    console.log("Error: no quiz");
                    this.setState({redirect: true});

                }

            });

        }

    }

    score(qInd,aInd,plusOne,plusTwo){

        let quiz     = this.state.quiz;
        let score    = this.state.score;
        let answered = this.state.answered;

        let oldAnswer;
        quiz.questions[qInd].answered = true;
        quiz.questions[qInd].answers.forEach(i => {
            if(i.picked){
                console.log(i);
                if(i.plusOne)
                    score[i.plusOne] --;
                if(i.plusTwo)
                    score[i.plusTwo] -= 2;
            }
            i.picked = false
        });
        quiz.questions[qInd].answers[aInd].picked = true;
        if(plusOne > -1)
            score[plusOne] ++;
        if(plusTwo > -1)
            score[plusTwo] +=2
        let finalResult = false;
        let resultCheck = 0;
        quiz.questions.forEach(i=>{
            if(i.answered)
                resultCheck++;
        })
        if(resultCheck === quiz.questions.length){

            let largest = 0;
            for(let i=0;i<score.length;i++){

                if(i>largest)
                    largest=i;

            }
            finalResult = quiz.results[largest];

        }


        this.setState({quiz: quiz, score: score, answered: answered, finalResult: finalResult});

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

                            <Question key             = { "question-"+i            }
                                      question        = { ele                      } 
                                      save            = { this.saveBlock           }
                                      qInd            = { i                        }
                                      backgroundColor = { ele.backgroundColor      }
                                      color           = { ele.color                }
                                      type            = { ele.type                 } 
                                      results         = { this.state.quiz.results  } 
                                      score           = { this.score               }/>
                            
                        )}

                </center>

                <div >

                    { this.state.finalResult ?

                      <Result ref="result" result={this.state.finalResult} />
                    
                    :""}

                </div>

             </div>

        )

    }

}

export default Quiz;