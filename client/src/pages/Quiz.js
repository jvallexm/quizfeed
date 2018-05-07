import React        from "react";
import API          from "../utils/api";
import { Redirect } from 'react-router';
import Question from '../components/Question';
import "./EditQuiz.css";
import Result from "../components/Result";
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



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
                stars: []
            },
            redirect: false,
            score: [],
            answered: 0,
            finalResult: false,
            pushed: false

        };
        this.score = this.score.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.pushStar = this.pushStar.bind(this);
        this.pullStar = this.pullStar.bind(this);

    }

    scrollToBottom = () => {
        scroll.scrollToBottom();
    }
    
    componentDidUpdate(){

        if(this.state.finalResult){
            this.scrollToBottom();
        }
        console.log ("how many answered" + this.state.answered)
        console.log("quiz question length " + this.state.quiz.questions.length);


        // scroller.scrollTo('myScrollToElement', {
        //     duration: 1500,
        //     delay: 100,
        //     smooth: true,      
        //   })

    }

    pushStar(){

        let quiz = this.state.quiz;
        quiz.stars.push(this.props.user._id);
        API.pushStar(quiz._id,{user_id: this.props.user._id}).then(res=>console.log(res));
        this.setState({quiz: quiz});

    }

    pullStar(){

        let quiz = this.state.quiz;
        let remove = quiz.stars.splice(quiz.stars.indexOf(this.props.user._id),1);
        API.pullStar(quiz._id,{user_id: this.props.user._id}).then(res=>console.log(res));
        this.setState({quiz: quiz});

    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function () {
          console.log("begin", arguments);
        });
    
        Events.scrollEvent.register('end', function () {
          console.log("end", arguments);
        });
    
      }

    
    componentWillMount(){

        let id = this.props.match.params.id;

        /* If id is part of the request it tried to find the quiz to edit */

        if(id) {

            console.log("finding quizzes with id " + id);

            API.getQuizById(id).then(res=>{


                if(res.data){

                    let score = [];
                    res.data.results.forEach(i => score.push(0));
                    this.setState({quiz: res.data, score: score, published: true});

                } else {

                    console.log("Error: no quiz");
                    this.setState({redirect: true});

                }

            });

        }

    }

    

    score(qInd,aInd,plusOne,plusTwo){

        let quiz        = this.state.quiz;      // This quiz
        let score       = this.state.score;     // The current score array
        let answered    = this.state.answered;  // How many of the questions have been answered
        let finalResult = false;                // If a final answer should be rendered
        let resultCheck = 0;                    // How many of the quiz questions have been answered

        quiz.questions[qInd].answered = true;  // Sets this question to be answered

        /* Sets the picked values of all the answers to false */

        quiz.questions[qInd].answers.forEach(i => {

            /* If an answer has already been picked it removes the score values from the scores array */

            if(i.picked){
                if(i.plusOne)
                    score[i.plusOne] --;
                if(i.plusTwo)
                    score[i.plusTwo] -= 2;
            }
            i.picked = false
        });

        /* Sets the current answer to picked */

        quiz.questions[qInd].answers[aInd].picked = true;

        /* Adds the current picked answer scores to the score  */

        if(plusOne > -1)
            score[plusOne] ++;
        if(plusTwo > -1)
            score[plusTwo] +=2

        /* Counts the number of answered questions */

        quiz.questions.forEach(i=>{
            if(i.answered)
                resultCheck++;
        })

        /*

        Test to make sure scoring works */

        for(let i=0;i<quiz.results.length;++i){

            console.log(`Score for ${quiz.results[i].title}: ${score[i]}`)

        }

        /* If the number of questions is equal to the total it scores the quiz */

        if(resultCheck === quiz.questions.length){

            let largest = -1;                 // index of the answer with the largest score
            for(let i=0;i<quiz.results.length;i++){

                if(largest == -1 || score[i]>score[largest])
                    largest=i;

            }
            finalResult = quiz.results[largest]; // sets the final result to be the result at the result index with the highest score
            if(!this.state.pushed)
                API.pushResponse(this.state.quiz._id,{name: finalResult.title}).then(r=>{
                    console.log(r);
                    this.setState({pushed:true})  
                });

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
                                      qInd            = { i                        }
                                      backgroundColor = { ele.backgroundColor      }
                                      color           = { ele.color                }
                                      type            = { ele.type                 } 
                                      results         = { this.state.quiz.results  } 
                                      score           = { this.score               }
                                      id              = { "question-"+i            }/>
                            
                        )}

                </center>

                { this.state.finalResult ?

                    <div id="result">

                      <Result ref="result" result   = { this.state.finalResult } 
                                           title    = { this.state.quiz.title } 
                                           user     = { this.props.user }
                                           stars    = { this.state.quiz.stars ? this.state.quiz.stars : [] }
                                           pushStar = {this.pushStar }
                                           pullStar = { this.pullStar }/>

                    </div>
                    
                    :""}

             </div>

        )

    }

}

export default Quiz;