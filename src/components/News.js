import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize: 6,
        category:'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string)  => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
        this.props.setProgress(10);
        let apiURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c6d576f5394c47d1b7d126980e0a581d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true});
        let data = await fetch(apiURL);
        this.props.setProgress(30);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parseData.articles, 
            totalResults: parseData.totalResults,
            loading:false
        });
        this.props.setProgress(100);
    }

    async componentDidMount(){
        this.updateNews();
    }

    handleNextClick = async () => {
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            
            this.setState({ page: this.state.page + 1});
            this.updateNews();
            
        // }
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1});
        this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1});
        let apiURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c6d576f5394c47d1b7d126980e0a581d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(apiURL);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles), 
            totalResults: parseData.totalResults
        });
      };

    render() {
    return (
        <>
            <h2 className='text-center'>NewsMonkey - Top Headlines</h2>
            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length!==this.state.totalResults}
                loader={<Spinner />}
                >
                    <div className='container'>
            <div className='row'>
                {this.state.articles.map((element) => {
                    return <div className='col-md-4' key={element.url}>
                        <NewsItem 
                        title={element.title ? element.title.slice(0,45): ""} 
                        description={element.description ? element.description.slice(0,88): ""} 
                        imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt}/>
                    </div>
                })}
            </div>
            </div>
            </InfiniteScroll>
            {/* <div className='container d-flex justify-content-between'>
                <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&laquo; Previous</button>
                <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &raquo;</button>
            </div> */}
        </>
    )
    }
}

export default News;
