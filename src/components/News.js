import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps={
    country:'in',
    pageSize:5,
    category:'general'

  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string

  }

  CapitalizeFirstLetter=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
    // articles=[{"source":{"id":"news24","name":"News24"},"author":"sport","title":"WATCH | Faf intervenes as fiery Kohli loses cool in IPL post-match row","description":"Indian cricket star Virat Kohli was fined on Tuesday for the second time in this IPL after a post-match altercation with former national team-mate Gautam Gambhir.","url":"https://www.news24.com/sport/cricket/ipl/watch-faf-intervenes-as-fiery-kohli-loses-cool-in-ipl-post-match-row-20230502","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/825/ce547ea212ec4859a929a090fdb6f9d9.jpg","publishedAt":"2023-05-02T09:35:15+00:00","content":"<ul><li>Virat Kohli has copped another fine after a post-match altercation in the Indian Premier League.</li><li>Matters got so heated that Kohli's Royal Challengers Bangalore skipper, Faf du Plessis… [+2668 chars]"}];
     constructor(props){
        super(props);
        console.log('Hello i am construtor');
        this.state={

            articles:[],
            loading:false,
            page:1,
            totalResults:0

            // this.article
            
        }
        document.title=`${this.CapitalizeFirstLetter(this.props.category)}-React News App`;
    }
async UpdateNews(){
  this.props.setProgress(10);
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles: parseData.articles,
          totalResults:parseData.totalResults,
          loading:false
        });
        this.props.setProgress(100);
}
   async componentDidMount(){

        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03b4c561c5654ac1a59f3617223d795d&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parseData=await data.json();
        // console.log(parseData);
        // this.setState({articles: parseData.articles,
        //   totalResults:parseData.totalResults,
        //   loading:false
        // });
        this.UpdateNews();
    }

    handlePrevClick= async()=>{
    //   console.log('prev');
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03b4c561c5654ac1a59f3617223d795d&page=${this.state.page -1 }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //   let data=await fetch(url);
    //   let parseData=await data.json();
    //   console.log(parseData);
    // this.setState({
    //   page:this.state.page - 1,
    //   articles: parseData.articles,
    //   loading:false
    // })
    this.setState({page:this.state.page - 1})
    this.UpdateNews();
    }

    handleNextClick= async()=>{
    //   console.log('next');
    //   if(!(this.state.page + 1>Math.ceil(this.state.totalResults/20))){
  
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=03b4c561c5654ac1a59f3617223d795d&page=${this.state.page +1 }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true})
    //     let data=await fetch(url);
    //     let parseData=await data.json();
    //     // console.log(parseData);
    //   this.setState({
    //     page:this.state.page + 1,
    //     articles: parseData.articles,
    //     loading:false
      
    //   })
    // }
    this.setState({page:this.state.page +1});
    this.UpdateNews();
    
    }

   fetchMoreData=async()=>{
      this.setState({page:this.state.page + 1})
      const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&page=${this.state.page}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles: this.state.articles.concat(parseData.articles),
          totalResults:parseData.totalResults,
          // loading:false
        });
    }
  render() {
    return (
      <div className="container my-3">
        <h2>News App-Top Headings</h2>
       {this.state.loading && <Spinner/>}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
       <div className="container">
        <div className="row">
        { this.state.articles.map((element)=>{
            
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title} description={element.description} imageurl={element.urlToImage} newUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            
        })}
        </div>
        </div>
        </InfiniteScroll>

       
            
        {/* <div className="col-md-4">
        <NewsItem title="Newstitle" description="Mydesc" imageurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"/>
        </div>
        < div className="col-md-4">
        <NewsItem title="Newstitle" description="Mydesc" imageurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"/>
        </div> */}
       
        
        
        {/* <div className="container mt-3 d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
        <button disabled={this.state.page + 1>Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
        </div> */}

        
      </div>
    )
  }
}

export default News