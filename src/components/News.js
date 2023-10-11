import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


 const News=(props)=>{
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
 const CapitalizeFirstLetter=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
    // articles=[{"source":{"id":"news24","name":"News24"},"author":"sport","title":"WATCH | Faf intervenes as fiery Kohli loses cool in IPL post-match row","description":"Indian cricket star Virat Kohli was fined on Tuesday for the second time in this IPL after a post-match altercation with former national team-mate Gautam Gambhir.","url":"https://www.news24.com/sport/cricket/ipl/watch-faf-intervenes-as-fiery-kohli-loses-cool-in-ipl-post-match-row-20230502","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/825/ce547ea212ec4859a929a090fdb6f9d9.jpg","publishedAt":"2023-05-02T09:35:15+00:00","content":"<ul><li>Virat Kohli has copped another fine after a post-match altercation in the Indian Premier League.</li><li>Matters got so heated that Kohli's Royal Challengers Bangalore skipper, Faf du Plessis… [+2668 chars]"}];
    
       
    
const UpdateNews=async()=>{
 props.setProgress(10);
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        // this.setState({loading:true})
        setLoading(true)
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        setArticles(parseData.articles)
        setTotalResults(parseData.totalResults)
        setLoading(false)
       props.setProgress(100);
}

useEffect(() => {
  document.title=`${CapitalizeFirstLetter(props.category)}-React News App`;
  UpdateNews();

}, [])

  
    const handlePrevClick= async()=>{
    //   console.log('prev');
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03b4c561c5654ac1a59f3617223d795d&page=${this.state.page -1 }&pageSize=${props.pageSize}`;
    //   this.setState({loading:true})
    //   let data=await fetch(url);
    //   let parseData=await data.json();
    //   console.log(parseData);
    // this.setState({
    //   page:this.state.page - 1,
    //   articles: parseData.articles,
    //   loading:false
    // })
    setPage(page-1)
    UpdateNews();
    }

    const handleNextClick= async()=>{
    //   console.log('next');
    //   if(!(this.state.page + 1>Math.ceil(this.state.totalResults/20))){
  
    //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=03b4c561c5654ac1a59f3617223d795d&page=${this.state.page +1 }&pageSize=${props.pageSize}`;
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
    
    setPage(page+1)
    UpdateNews();
    
    }

   const fetchMoreData=async()=>{
     
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page+1}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        // this.setState({loading:true})

        setPage(page+1)
        let data=await fetch(url);
        let parseData=await data.json();
        setArticles(articles.concat(parseData.articles))
        setTotalResults(parseData.totalResults)
        console.log(parseData);
    };
    return (
      <>      
      <div className="container my-3">
        <h2>News App-Top Headings</h2> 
       {loading && <Spinner/>}
       <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
       <div className="container">
        <div className="row">
        { articles.map((element)=>{
            
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
      </>

    )
      }

News.defaultProps={
  country:'in',
  pageSize:5,
  category:'general'

}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string

}

export default News