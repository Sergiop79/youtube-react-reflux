
/*
 * Module dependencies
 */

 import React from 'react';
 import Reflux from 'reflux';
 import VideoStore from '../stores/VideoStore';
 import VideoActions from '../actions/VideoActions';
 // import VideoSearch from './VideoSearch';
 import VideoCard from './VideoCard';
 import Button from './Button';
 import uid from 'uid';


 let VideoList = React.createClass({
  mixins: [Reflux.connect(VideoStore, 'videostore')],

  render: function() {
    if(this.state.videostore) {
      return (
          <section>
            <form action="#" className="search-form" onSubmit={this.handleQuerySubmit}>
              <input type="text" placeholder="Search some videos ..." className="search-input" ref="query" />
            </form>
            <section className="video-list">
              {
                this.state.videostore.map((video) => {
                  return <VideoCard img={video.thumbnailUrl} id={video.id} title={video.title} key={uid()}/>
                })
              }
            </section>
            <button onClick={this.handleClick} className="load-btn">Load More</button>
          </section>
      );
    } else {
      return <p>Sorry no videos :(</p>
    }
  },

  handleQuerySubmit: function (e) {
    e.preventDefault();
    let query = this.refs.query.value.trim();

    if (!query) {
      return;
    }

    console.log(`submited: ${query}`);

    VideoActions.fetchList(query);
    this.refs.query.value = '';
    return;
  },

  handleClick: function () {
    console.log('Load More');
    VideoActions.loadMore();
  }

 });

 export default VideoList;
