/*
 * Module dependencies
 */

 import React from 'react';
 import VideoActions from '../actions/VideoActions';

 let VideoSearch = React.createClass({
  render: function() {
    return (
      <form action="#" className="search-form" onSubmit={this.handleQuerySubmit}>
        <input type="text" placeholder="Search some videos ..." className="search-input" ref="query" />
      </form>
    )
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
  }
 });

 export default VideoSearch;
