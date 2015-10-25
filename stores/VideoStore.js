

/*
 * Module dependencies
 */

import Reflux from 'reflux';
import request from 'superagent';
import nocache from 'superagent-no-cache';
import VideoActions from '../actions/VideoActions';
import config from '../config';

let _apiKey = config.apiKey;

let _query = 'ramp druid';

let _maxResults = '9';

let VideoStore = Reflux.createStore({
  listenables: [VideoActions],
  videoList: [],
  nextPageToken: '',
  baseUrl: 'https://www.googleapis.com/youtube/v3/search',

  init: function () {
    this.fetchList();
  },
  
  fetchList: function() {
    let queryObj = {
      part: 'snippet',
      maxResults: _maxResults,
      type: 'video',
      q: _query,
      key: _apiKey,
    }
    // Make the API call
    request
      .get(this.baseUrl)
      .use(nocache)
      .query(queryObj)
      .end((err, res) => {
        if(err) {
          console.log(`fetchList error ${err}`);
        } else {
          console.log('fetchList OK');

          // Set the value for the next page of de API
          this.nextPageToken = res.body.nextPageToken;
          console.log(this.nextPageToken);

          let items = res.body.items;

          if (items.length) {
            items.map((item) => {

              // Parse the response data to one video
              let video = {
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.medium.url
              }

              this.videoList.push(video);

            });

            // Trigger the video list
            this.trigger(this.videoList);
          } 
        }
      });
  },

  loadMore: function() {
    let queryObj = {
      part: 'snippet',
      maxResults: _maxResults,
      type: 'video',
      q: _query,
      key: _apiKey,
      pageToken: this.nextPageToken
    }

    //Make the API call
    request
      .get(this.baseUrl)
      .use(nocache)
      .query(queryObj)
      .end((err, res) => {
        if(err) {
          console.log(`Load more Error ${err}`);
        } else {
          // Set the value for the next page of de API
          this.nextPageToken = res.body.nextPageToken;
          console.log(this.nextPageToken);

          let items = res.body.items;

          if(items.length) {
            items.map((item) => {

              // Parse the response data to one video
              let video = {
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.medium.url
              }

              this.videoList.push(video);

            });

            // Trigger the video list
            this.trigger(this.videoList);
          }
        }
      });

  }
});

export default VideoStore;
