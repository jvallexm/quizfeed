import React from "react";
import API   from "../utils/api";
import QuizListItem from '../components/QuizListItem';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import './Home.css';

class Home extends React.Component{

    
    constructor(props){

        super(props);
        this.state = {

            quizzes: [],
            dropdownOpen: false,
            loaded: false
    
        }
        this.toggle = this.toggle.bind(this);
        this.sort   = this.sort.bind(this);
        this.loadItUp   = this.loadItUp.bind(this);

    }
    componentWillMount(){

        this.loadItUp();

    }

    componentDidUpdate(prevProps, prevState, snapshot){

        if(prevProps !== this.props)
            this.loadItUp();

    }

    loadItUp(){

        let id = this.props.match.params.id;

        if(id && !this.props.edit) {

            console.log("finding quizzes by " + id);

            API.getAllByUser(id).then(res=>{
                
                let quizzes = [];

                res.data.forEach(i=>{
                    if(!i.isDraft)
                        quizzes.push(i);
                })

                this.setState({quizzes: quizzes});

            });

        } else if(this.props.edit){

            console.log("findind this user's quizzes " +this.props.user._id)

            API.getAllByUser(this.props.user._id).then(res=>{
                console.log(res.data.length);
                this.setState({quizzes: res.data, loaded: true});
            })

        } else {

            console.log("finding all quizzes");

            API.findAll().then(res=>{

                let quizzes = res.data.sort((a,b)=>{

                    if(a.responses.length > b.responses.length)
                        return -1;
                    else
                        return 1;

                });

                this.setState({quizzes: res.data});

            });

        }
    }

    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    sort(type,ascending){

        let quizzes = this.state.quizzes;
        let up      = ascending ? -1 : 1;
        let down    = ascending ? 1 : -1;

        let sortedQuizzes = quizzes.sort((a,b)=>{

            if(type !== "_id" && type !== "title"){

                if(a[type].length > b[type].length)
                    return up;
                else 
                    return down;

            } else {

                if(a[type] > b[type])
                    return up;
                else
                    return down;

            }

        });

        this.setState({quizzes: sortedQuizzes});

    }

    render(){

        return(

                <div id="quiz-wrapper" className="container-fluid">

                    <div className = "home-nav text-right">
                        <Button onClick={()=>this.nextPath('/newQuiz')}>Create a New Quiz</Button>
                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret>
                                Sort By
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={ ()=>this.sort("responses",true) }>
                                    Most Taken
                                </DropdownItem>
                                <DropdownItem onClick={ ()=>this.sort("stars",true)     }>
                                    Most Stars
                                </DropdownItem>
                                <DropdownItem onClick={ ()=>this.sort("_id",true)       }>
                                    Newest
                                </DropdownItem>
                                <DropdownItem onClick={ ()=>this.sort("_id",false)      }>
                                    Oldest
                                </DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>

                    {this.props.edit && this.state.quizzes.length === 0 && this.state.loaded 
                    ?   <div className="text-center">
                            <h2> Looks Like You Haven't Made Any Quizzes Yet </h2>
                            <Button className="btn-block big-big" onClick={()=>this.nextPath('newQuiz')}>
                                Make A New Quiz!
                            </Button>
                        </div>

                    : ""}

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
                                          edit={this.props.edit}
                                          responses={q.responses}/>

                        </div>
                    )}

                </div>


        )

    }

}

export default Home;