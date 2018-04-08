import React, { Component } from 'react';
import '../styles/article.css';
import { getThumb } from '../utilies';
import {domain} from '../config.json';

class Article extends Component {
  render() {
    let {cls, data} = this.props,
        {
          snippet,
          pub_date,
          source,
          multimedia,
          _id
        } = data,
        thumb = domain+getThumb(multimedia, 'blog480');
    return (
      <div className={`article ${cls}`}>
        <div className="article-wrapper rounded" onClick={()=>{ this.props.openModal(_id) }}>
          <div
            className="article-inner d-flex align-items-end px-3 py-3"
            style={{backgroundImage: `url(${thumb})`}}
          >
            <div className="article-content">
              <h3 className="title">{source}</h3>
              <div className="info font-weight-light font-italic">
                <small>{pub_date}</small>
              </div>
              <div className="snippet">
                <p>{snippet}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
