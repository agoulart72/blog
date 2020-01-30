import React, { Component } from 'react';
import axios from "axios";

class Article extends Component {

    state = {
        isLoading: true,
        article: null,
    }

    async componentDidMount() {
        // console.log("Home Auth :::", this.state);
        axios.create({
            baseURL: "/",
            responseType: "html"
        }).get(this.props.file
         ).then (artData => {
           //console.log("Article :: ", artData.data);
           this.setState({article: {__html:artData.data}, isLoading: false });
        }).catch(error => {
            console.error("Error loading article :::", error);
        });

    }

    render() {
        const { isLoading, article } = this.state;

        // console.log(isLoading);
        // console.log(article);

        return (
            <div>
            { isLoading? (
               <span>Loading ...</span>
            ):(
               <div dangerouslySetInnerHTML={article}></div>
            )}
            </div>
        )

    }
}

export default Article;