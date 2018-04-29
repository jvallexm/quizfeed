import React from "react";
import { InputGroup, Card, CardBody, CardTitle, Button, ButtonGroup, Label, Input, CardHeader } from 'reactstrap';
import "./NewAnswer.css"
import ImageSearch from "./ImageSearch";

class NewAnswer extends React.Component {

    constructor(props){

        super(props);
        this.state = {

            search: false

        }

        this.setImage = this.setImage.bind(this);

    }

    setImage(src){

        this.props.imageChange(src,this.props.ind);
        this.setState({search: false});

    }

    render()
    {
        return(

            <div className="col-md-4">
                
                <Card className="mb-4 box-shadow">
                    <CardHeader>

                        { !this.state.search && !this.props.image 
                        ?
                                
                            <div className="search-for" onClick={()=>this.setState({search: true})}>
                                <i className="fa fa-search"/>
                                    <h5>Search For An Image</h5>
                                </div>

                        : this.props.image && !this.state.search
                        ? <img className="answer-image" src={this.props.image}/>
                        : <ImageSearch setImage={this.setImage}/> }

                            </CardHeader>
                            <CardBody>
                                <input name="Answer" className="answer-title" placeholder="Type Your Answer Here" onChange={this.handleChange} />
                                {this.props.image ?
                                <div className="d-flex justify-content-between align-items-center">
                                    <ButtonGroup className="pull-right">
                                        <Button type="button" onClick={()=>this.setState({search: !this.state.search})}className="btn btn-sm btn-outline-secondary pull-right">{this.state.search ? "Nevermind" : "Choose a New Image"}</Button>
                                    </ButtonGroup>
                                </div>:""}
                            </CardBody>
                        </Card>
                    </div>





    )

    }

}

export default NewAnswer;