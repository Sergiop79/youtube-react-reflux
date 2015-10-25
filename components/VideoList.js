
/*
 * Module dependencies
 */

 import React from 'react';
 import Reflux from 'reflux';
 import VideoStore from '../stores/VideoStore';
 import VideoActions from '../actions/VideoActions';
 import VideoCard from './VideoCard';
 import Button from './Button';
 import uid from 'uid';


 let VideoList = React.createClass({
  mixins: [Reflux.connect(VideoStore, 'videostore')],

  render: function() {
    if(this.state.videostore) {
      return (
          <section className="video-list">
            {
              this.state.videostore.map((video) => {
                return <VideoCard img={video.thumbnailUrl} id={video.id} title={video.title} key={uid()}/>
              })
            }
            <button onClick={this.handleClick} className="load-btn">Load More</button>
          </section>
      );
    } else {
      return <p>no hay imagenes</p>
    }
  },

  handleClick: function () {
    console.log('Load More');
    VideoActions.loadMore();
  }

 });

 export default VideoList;
