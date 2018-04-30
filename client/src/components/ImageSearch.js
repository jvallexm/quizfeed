import React from 'react';
import API   from "../utils/api";
import "./NewQuestion.css"


class ImageSearch extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            query: "",
            images: [],
            loading: false,
            noneFound: false,
            lastQuery: ""
        }
    }

    handleChange = (e) =>{

        this.setState({query: e.target.value});

    }

    handleSubmit = (e)=>{

        e.preventDefault();
        if(this.state.query === "")
            return false;
        API.getImages(this.state.query).then((data)=>{

            let images = [];
            data.data.data.forEach(i=>images.push(i.assets.preview.url));
            this.setState({images: images, 
                           loading: false, 
                           noneFound: images.length > 0 ? false : true, 
                           lastQuery: this.state.query});

        })
        console.log("Form submitted!");
        this.setState({loading: true, noneFound: false});

    }

    render(){
        return(

            <div className="image-search">
                <h5>Search for Images</h5>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange}/><button type="submit"><i className="fa fa-search"/></button>
                </form>
                {this.state.noneFound ? <h5>We couldn't find {this.state.lastQuery}. Try searching for something else!</h5> :""}
                {this.state.images.map((img,i)=>

                    <img key={"searc-image-"+img} src={img} alt={this.state.lastQuery} className="search-image" onClick={()=>this.props.setImage(img)}/>

                )}
                {this.state.loading?<h4>Loading <i className="fa fa-spinner fa-spin"/></h4>:""}
            </div>

        )
    }

}

export default ImageSearch;