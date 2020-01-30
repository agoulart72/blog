import React, { Component } from 'react';
import queryString from 'query-string';
import { IndexService } from '../service/IndexService';
import idxSvc from '../service/IndexService';

class ArtPaginator extends Component {

    state = {
        total : 0,
        page: 0,
        show: 3,
    }

    constructor() {
        super();
    }

    isNumber(n) { return !isNaN(parseInt(n)) && !isNaN(n - 0) }

    async componentDidMount() {
        let idxLen = await idxSvc.getLength();
        
        const parsed = queryString.parse(location.search);
        let page = 0, show = 3;
        if (parsed) {
            if (parsed.page && this.isNumber(parsed.page)) page = parseInt(parsed.page);
            if (parsed.show && this.isNumber(parsed.show)) show = parseInt(parsed.show);
        }

        this.setState({ total: idxLen, page: page, show: show })
    }

    render() {

        const { total, page, show } = this.state;

        let previous = page > 0 ? ( <a href={"?page="+(page-1)} className="button previous">Previous Page</a> ) : "";
        let next = (page+1)*show <= total ? ( <a href={"?page="+(page+1)} className="button next">Next Page</a> ) : "";

        let pageTotal = total / show;
        console.log("ArtPaginator :::", pageTotal);

        let pageButtons = [];

        let firstButton = page > 2 ? page -2 : 0;
        let lastButton = page + 3;

        if (firstButton > 0) {
            pageButtons.push(<a key="0" href="?page=0">1</a>)
        }
        if (firstButton > 1) {
            pageButtons.push(<span>&hellip;</span>);
        }

        for (let i = firstButton; i < lastButton && i < pageTotal; i++) {
            let activeButton = (page==i)?'active':'';
            pageButtons.push( <a key={i} href={"?page="+i} className={ activeButton } >{i+1}</a> );
        }

        if (lastButton < pageTotal -2 ) {
            pageButtons.push(<span>&hellip;</span>);
        }
        if (lastButton < pageTotal -1) {
            pageButtons.push( <a key={pageTotal} href={"?page"+pageTotal} >{pageTotal+1}</a> );
        }

        return (
            <div className="pager">
                {previous}
                    <div className="pages"> 
                        {pageButtons}
                    </div>
                {next}
            </div> 
        );
    }

}

export default ArtPaginator;
