import React, { Component } from 'react';

export class Newsitem extends Component {
  render() {
    const { title, description, imageUrl, newsurl ,author,date} = this.props; 
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img src={!imageUrl ? "https://dims.apnews.com/dims4/default/f8ab479/2147483647/strip/true/crop/4032x2268+0+378/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F05%2F2e%2F8a7a1b6a778943a036359d0485da%2F27cb7f0baa2a4a6e83f0477faad483c1" : imageUrl} className="card-img-top" alt={title || "Image not available"}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p> 
            <p className="card-text"><small className="text-body-secondary">By {!author?"unknown":author}on {new Date(date).toGMTString()}</small></p>
            <a href={newsurl} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
