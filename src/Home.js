import React, { Component } from 'react';
import queryString from 'query-string';
import axios from "axios";

import Article from "components/Article";
import idxSvc from './service/IndexService';

class Home extends Component {

    state = {
        page: 0,
        articles: [],
        isLoading: true,
    }

    constructor() {
        super();
        // let p = async () => getUser();
        // p().then((r) => this.setState({user: r}));
    }

    isNumber(n) { return !isNaN(parseInt(n)) && !isNaN(n - 0) }

    async componentDidMount() {
        // console.log("Home Auth :::", this.state);
        // axios.create({
        //     baseURL: "/",
        //     responseType: "json"
        // }).get('/art_list.json', {
        //     params: {
        //       results: 3,
        //       inc: 'article,file'
        //     }
        // }).then (artData => {
        //   this.setState({articles: artData.data , isLoading: false});          
        // });
        const parsed = queryString.parse(location.search);
        console.log("Query Parameters : ", parsed);
        let page = 0, show = 3;
        if (parsed) {
            if (parsed.page && this.isNumber(parsed.page)) page = parseInt(parsed.page);
            if (parsed.show && this.isNumber(parsed.show)) show = parseInt(parsed.show);
        }
        await idxSvc.getArticles(page, show).then(artData => {
            console.log(artData);
            this.setState({articles: artData , isLoading: false});  
        });
    }
    
    render() {
        const { page, articles, isLoading } = this.state;
        const items = [];

        for (const [idx, art] of articles.entries()) {
            // console.log("### art : ", art);
            items.push(<li key={idx}><Article file={art.file}></Article></li>)
        }

        return (
            <div>
                <ul>{items}</ul>                
            </div>
        )
    }

}

export default Home;
