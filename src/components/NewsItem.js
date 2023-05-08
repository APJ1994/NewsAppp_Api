import React from 'react'

const NewsItem=(props)=> {
   let  {title,description,imageurl,newUrl,author,date,source}=props;
    return (
       
        <div>
            <div className="card mb-3">
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'90%'}}>
                      {source}
                      </span> 
                <img src={imageurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown":author} on {new Date(date).toGMTString() }</small></p>
                    <a rel="noreferrer" href={newUrl} target="_blank"className="btn btn-dark">Go somewhere</a>
                </div>
        </div>
        </div>
        
    )
  
}

export default NewsItem