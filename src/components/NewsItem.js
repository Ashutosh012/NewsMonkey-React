import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let {title, description, imageURL, newsURL, author, date} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
            <img src={imageURL ? imageURL : "https://techcrunch.com/wp-content/uploads/2023/02/this-week-in-apps-splash-2023.webp?resize=1200,637"} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                {/* <a href={newsURL} target="_blank" rel='noreferrer' className="btn btn-primary">Read More</a> */}
                <p className='card-text'><small className='text-muted'>By {author ? author : 'Unknown'} on {date}</small></p>
                <a href={newsURL} target='_blank' rel='noreferrer' className='btn btn-sm btn-dark'>Read More</a>
            </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
