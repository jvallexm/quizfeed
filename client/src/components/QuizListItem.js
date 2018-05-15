import React        from "react";
import { Card, Row, Col, CardFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import GoogleChart from './GoogleChart';
import './css/QuizList.css';

class QuizListItem extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            showComments: false,
            pieChartData: [

            ]
        }   
        this.returnDate = this.returnDate.bind(this);
    }

    componentDidMount(){



            let responses = this.props.responses;
            let pieChartNames = [];
            responses.forEach(i=>{
                if(pieChartNames.indexOf(i) === -1)
                    pieChartNames.push(i);
            })
            let responsesArray = [];
            pieChartNames.forEach(i => responsesArray.push(0));
            responses.forEach( i=> responsesArray[pieChartNames.indexOf(i)]++ );
            let pieChartData = [];
            pieChartData.push(["Results","Percentage Total Responses"])
            for(let i=0;i<pieChartNames.length;i++){
                pieChartData.push([pieChartNames[i],responsesArray[i]]);
            }
            console.log(pieChartData);
            this.setState({pieChartData: pieChartData});


    }

    returnDate(date){

        let then = new Date(date);
        return `${then.getMonth()+1}/${then.getDate()}/${then.getFullYear()}`;

    }

    render(){

        const edit = this.props.edit ? "/editquiz/" : "/quiz/";

        return(

        <Card className="effect6" style={{padding: "20px 20px 5px 20px"}}>

            <Row>
                {/*<Link key={"link-" + q._id}to={"/quiz/" + q._id} style={{ textDecoration: 'none', color: 'black' }}> */}
                <Col md="4" className="quiz-image-box">
                    <div className="img-overlay">
                        <Link to={edit + this.props.id} style={{ textDecoration: 'none', color: 'black' }}>
                            <img className="img-fluid rounded mb-3 mb-md-0" src={this.props.preview || "http://placehold.it/500x300"} alt="" href=""/>
                        </Link>
                        <div className="quiz-rating-box">
                            
                        <h3 className="text-center space-top">

                            <span className="comment-span-words">{this.props.responses.length}</span> <i className="fa fa-users"/>&nbsp;&nbsp;
                            <span className="comment-span"><span className="comment-span-words">{this.props.stars.length}</span> <i className="fa fa-star gold"/></span>&nbsp;&nbsp;
                            <span className="comment-span" onClick={()=>this.setState({showComments: !this.state.showComments})}><span className="comment-span-words">{this.props.comments.length}</span> <i className="fa fa-comments"/></span>
                        </h3>
                        </div>
                    </div>
                </Col>
                <Col md="8">
                <div className="quiz-desc-box">
                    <Link to={edit + this.props.id} style={{ textDecoration: 'none', color: 'black' }}>
                        <h3>{this.props.isDraft ? "(Draft) " :""}{this.props.title}</h3>
                    </Link>
                   
                    {this.props.edit && this.state.pieChartData.length > 0
                    ? <GoogleChart id={this.props.id + "-chart"} data={this.state.pieChartData} />
                    : <p className="quiz-desc">{this.props.blurb}</p> }

                    {! this.props.edit ?
                    <Link to={"/userquizzes/" + this.props.author_id} style={{ textDecoration: 'none', color: 'black' }}>
                    
                        <p className="byline text-right">By {this.props.author}</p>
                        
                    </Link> : ""}
                    </div>
              {/*}      <div id="spacer" style={{width: '100%', height: '50px', float:'left', display:'inline-block'}}></div>*/}

                </Col>
                <hr/>
            </Row> 
            {this.state.showComments ?
                <CardFooter className="comment-footer">
                {this.props.comments.length > 0 ?
                this.props.comments.map((c,i)=>
                    <Comment key={this.props.id + "-comment-" + i} comment={c} date={this.returnDate(c.posted_on)}/>
                ) : "No comments yet.. take the quiz and write one!"}
                </CardFooter>
            : ""}
        </Card>)
    }

}

export default QuizListItem;