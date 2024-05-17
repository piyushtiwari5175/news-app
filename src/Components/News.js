import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinning from './Spinning';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps={
        country: "in",
        pageSize: 8,
        category: "science"
    }

    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        console.log("this constructor of news component");
        this.state = {
            article: [], 
            loading: false,
            page: 1
        };
        document.title=`${this.capitalizeFirstLetter(this.props.category)} NewsTak`
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        console.log("cfh");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28a576d49e9b4c7ab674ac5144102c14&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json(); 
        console.log(parsedData);
        this.setState({ 
            article: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        }); 
    }

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28a576d49e9b4c7ab674ac5144102c14&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json(); 
        console.log(parsedData);
        this.setState({ 
            article: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        });
    }

    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=28a576d49e9b4c7ab674ac5144102c14&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                article: parsedData.articles,
                page: this.state.page + 1,
                totalResults: parsedData.totalResults,
                loading: false
            });
        }
    }
    
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '40px 0px' }}>News Tak Top Headlines From {this.capitalizeFirstLetter(this.props.category)}</h1>
                {this.state.loading && <Spinning/>}
                <div className="row">
                    {!this.state.loading && this.state.article.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <Newsitem 
                                    title={element.title ? element.title : ""} 
                                    description={element.description ? element.description : ""} 
                                    imageUrl={element.urlToImage} 
                                    newsurl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
