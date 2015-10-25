/*
 * Module dependencies
 */

import React from 'react';
import uid from 'uid';



let VideoCard = React.createClass({
  render: function() {

    let img = this.props.img;
    let link = `https://www.youtube.com/watch?v=${this.props.id}`;
    let title = this.props.title;

    return (
      <article className="video-card">
        <a href={link}>
          <img src={img}/>
          <h3 className="video-card__title">{title}</h3>
        </a>
      </article>
    );
  }
});

export default VideoCard;
