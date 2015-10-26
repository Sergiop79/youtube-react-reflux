
/*
 * Module dependencies
 */

 import React from 'react';
 import Reflux from 'reflux';
 import VideoStore from '../stores/VideoStore';
 import VideoActions from '../actions/VideoActions';
 import VideoSearch from './VideoSearch';
 import VideoCard from './VideoCard';
 import LightBox from './LightBox';
 import Button from './Button';
 import uid from 'uid';


 let VideoList = React.createClass({
  mixins: [Reflux.connect(VideoStore, 'videostore')],

  render: function() {
    if(this.state.videostore) {
      return (
          <section>
          <VideoSearch />
            <section className="video-list">
              {
                this.state.videostore.map((video) => {
                  return <VideoCard img={video.thumbnailUrl} id={video.id} title={video.title} key={uid()}/>
                })
              }
            </section>
            <button onClick={this.handleClick} className="load-btn">Load More</button>
            <LightBox id="zL46dpNEPPA" show="true" />
          </section>
      );
    } else {
      return <p>Sorry no videos :(</p>
    }
  },

  

  handleClick: function () {
    console.log('Load More');
    VideoActions.loadMore();
  }

 });

 export default VideoList;
