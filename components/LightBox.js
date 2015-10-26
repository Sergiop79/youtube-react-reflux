/*
 * Module dependencies
 */

import React from 'react';
import VideoActions from '../actions/VideoActions';

let LightBox = React.createClass({
  render: function() {
    let videoId = this.props.id
    let videoUrl = `https://www.youtube.com/embed/${videoId}`;
    
    if (this.props.show) {
      return (
        <div className="lightbox">
          <iframe width="560" height="315" src={videoUrl} frameBorder="0" allowFullScreen></iframe>
        </div>
      )
    } else {
      return null;
    }
  }
});

export default LightBox;
