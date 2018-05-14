import React from "react";
import API   from "../utils/api";
import QuizListItem from '../components/QuizListItem';
import { Redirect } from 'react-router';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import './Home.css';

class Home extends React.Component{

    
    constructor(props){

        super(props);
        this.state = {

            quizzes: [],
            dropdownOpen: false,
            loaded: false,
            redirect: false,
            errorCode: "",
            userImage: ""
    
        }
        this.toggle = this.toggle.bind(this);
        this.sort   = this.sort.bind(this);
        this.loadItUp   = this.loadItUp.bind(this);
        this.success = this.success.bind(this);

    }
    componentWillMount(){

        this.loadItUp();

    }

    componentDidUpdate(prevProps, prevState, snapshot){

        if(prevProps !== this.props){
            this.loadItUp();
        }

    }

    loadItUp(){

        let id = this.props.match.params.id;

        if(id && !this.props.edit && !this.props.faves) {

            // console.log("finding quizzes by " + id);

            API.getAllByUser(id).then(res=>{
                
                let quizzes = [];

                res.data.forEach(i=>{
                    if(!i.isDraft)
                        quizzes.push(i);
                })

                API.getUser(id).then(res=>{
                    if(res.data.errors)
                        this.setState({redirect: true, errorCode: "5"})
                    else
                        this.setState({userImage: res.data.imageUrl, userName: res.data.givenName});

                });

                this.setState({quizzes: quizzes, byId: id, loaded: true});

            });

        } else if(this.props.edit){

            if(!this.props.user._id)
                this.setState({redirect: true, errorCode: "3"});
            
            else{

                // console.log("findind this user's quizzes " +this.props.user._id)

                API.getAllByUser(this.props.user._id).then(res=>{
                    console.log(res.data.length);
                    this.setState({quizzes: res.data, loaded: true});
                });

            }

        } else if(this.props.faves){

            if(!this.props.user._id){

                this.setState({redirect: true, errorCode: "4"});

            } else {

                API.getFavorites(this.props.user._id).then(res=>{
                    console.log(res);
                    this.setState({quizzes: res.data});
                });

            }

        } else {

            // console.log("finding all quizzes");

            API.findAll().then(res=>{

                let quizzes = res.data.sort((a,b)=>{

                    let aHotness = a.responses.length + (2 * a.stars.length) + (3 * a.comments.length);
                    let bHotness = b.responses.length + (2 * b.stars.length) + (3 * b.comments.length);
                    if(aHotness > bHotness)
                        return -1;
                    else
                        return 1;

                });

                this.setState({quizzes: quizzes, byId: false});

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

    failure(res){

        console.log(res);
  
    }
  
    success(res){
  
        let newUser = res.profileObj;
        newUser.stars = [];
        newUser._id = newUser.googleId;
        API.getUser(newUser._id,newUser)
           .then(user =>{
             this.props.setUser(user.data);
        });
  
    }

    sort(type,ascending){

        let quizzes = this.state.quizzes;
        let up      = ascending ? -1 : 1;
        let down    = ascending ? 1 : -1;

        let sortedQuizzes = quizzes.sort((a,b)=>{

            if(type === "hotness"){            

                let aHotness = a.responses.length + (2 * a.stars.length) + (3 * a.comments.length);
                let bHotness = b.responses.length + (2 * b.stars.length) + (3 * b.comments.length);
                if(aHotness > bHotness)
                    return up;
                else
                    return down;

            } else if(type !== "_id" && type !== "title"){

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

        if(this.state.redirect)
            return <Redirect to={"/404/" + this.state.errorCode}/>;

        return(

                <div id="quiz-wrapper" className="container-fluid">

                    <div className = "home-nav text-right">

                        {this.props.user._id ?

                        <Button title={this.props.user._id ? "Create a New Quiz" : "You Need to Login to Create a Quiz!"}
                                className="btn-info btn-newquiz"
                                disabled={this.props.user._id ? false : true}
                                onClick={()=>this.nextPath('/newQuiz')}>Create a New Quiz</Button>
                        :        
                        <Button className="btn-info btn-newquiz">               
                        <GoogleLogin
                            clientId="827588567531-e91v1ho0plbtqgcbd8am9cn5sj6rlvqh.apps.googleusercontent.com"
                            onSuccess={this.success}
                            onFailure={this.failure}
                            tag="span"
                            style={{}}
                            type="span"> 
                            Login to Create a New Quiz
                        </GoogleLogin>
                        </Button>}

                        <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                            <DropdownToggle caret className="btn-sortby" style={{verticalAlign: "bottom"}}>
                                Sort By
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={ ()=>this.sort("hotness",true) }>
                                    Hotness
                                </DropdownItem>
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

                    <section className="text-center container-fluid">
                        {this.state.byId && this.state.userImage===""?
                            <h3>Loading <i className="fa fa-spinner fa-spin"/></h3>
                        : this.state.byId ?
                            <div>
                                <img className="home-img" src={this.state.userImage} alt="User"/> 
                                <h3>Quizzes By {this.state.userName}</h3>
                            </div>
                        : ""}
                    </section>

                    {this.props.edit && this.state.quizzes.length === 0 && this.state.loaded 
                    ?   <div className="text-center">
                            <h2> Looks Like You Haven't Made Any Quizzes Yet </h2>
                            <Link to="/newquiz">
                                <Button className="btn-block big-big">
                                    Make A New Quiz!
                                </Button>
                            </Link>
                        </div>

                    : ""}

                    {this.props.faves && this.state.quizzes.length === 0 && this.state.loaded 
                    ?   <div className="text-center">
                            <h2> Looks Like You Haven't Starred Any Quizzes Yet! </h2>
                            <Button className="btn-block big-big">
                                <Link to="/">
                                    Back to the Home Page!
                                </Link>
                            </Button>
                        </div>

                    : ""}

                    {this.state.byId && this.state.loaded && this.state.quizzes.length ===0?
                        <div className="text-center container-fluid">
                            <h2>Looks Like {this.state.userName} hasn't made any quizzes yet!</h2>
                        </div>

                    :""}
                

                    {this.state.quizzes.map((q,i)=> 

                        <div className="space-bottom" key={q._id} >

                            <QuizListItem title={q.title}
                                          author={q.author}
                                          author_id={q.author_id}
                                          author_image={q.authorImage}
                                          blurb={q.blurb}
                                          stars={q.stars}
                                          id={q._id}
                                          comments={q.comments}
                                          user={this.props.user}
                                          edit={this.props.edit}
                                          responses={q.responses}
                                          preview={q.previewImage}
                                          isDraft={q.isDraft}/>

                        </div>
                    )}

                </div>


        )

    }

}

export default Home;