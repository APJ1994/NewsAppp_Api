import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    // articles=[{"source":{"id":"news24","name":"News24"},"author":"sport","title":"WATCH | Faf intervenes as fiery Kohli loses cool in IPL post-match row","description":"Indian cricket star Virat Kohli was fined on Tuesday for the second time in this IPL after a post-match altercation with former national team-mate Gautam Gambhir.","url":"https://www.news24.com/sport/cricket/ipl/watch-faf-intervenes-as-fiery-kohli-loses-cool-in-ipl-post-match-row-20230502","urlToImage":"https://cdn.24.co.za/files/Cms/General/d/825/ce547ea212ec4859a929a090fdb6f9d9.jpg","publishedAt":"2023-05-02T09:35:15+00:00","content":"<ul><li>Virat Kohli has copped another fine after a post-match altercation in the Indian Premier League.</li><li>Matters got so heated that Kohli's Royal Challengers Bangalore skipper, Faf du Plessis… [+2668 chars]"}];
     constructor(){
        super();
        console.log('Hello i am construtor');
        this.state={

            articles:[],
            loading:false

            // this.article
            
        }
    }

   async componentDidMount(){

        let url="https://newsapi.org/v2/top-headlines?country=in&categpry&apiKey=03b4c561c5654ac1a59f3617223d795d";
        let data=await fetch(url);
        let parseData=await data.json();
        console.log(parseData);
        this.setState({articles: parseData.articles});
    }
  render() {
    return (
      <div className="container my-3">
        <h2>News App-Top Headings</h2>
       
        <div className="row">
        {this.state.articles.map((element)=>{
            
            return <div className="col-md-4" key={element.url}>
            <NewsItem  title={element.title} description={element.description} imageurl={element.urlToImage} newUrl={element.url}/>
            </div>
            
        })}
            
        {/* <div className="col-md-4">
        <NewsItem title="Newstitle" description="Mydesc" imageurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"/>
        </div>
        < div className="col-md-4">
        <NewsItem title="Newstitle" description="Mydesc" imageurl="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg"/>
        </div> */}
       
        
        </div>

        
      </div>
    )
  }
}

export default News