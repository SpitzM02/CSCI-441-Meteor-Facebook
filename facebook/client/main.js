import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {RedditDB, Calculate_rank_and_position_for_posts} from './../imports/api/redditDB.js';
import App from './../imports/ui/App.js';

Meteor.startup(() =>  {

  // Tracker tracks queries and reruns code when queries change
  Tracker.autorun(() => {

    let allPostsInDB = RedditDB.find({}, {sort: {votes: -1}}).fetch();
    let positioned_posts = Calculate_rank_and_position_for_posts(allPostsInDB);

    ReactDOM.render(<App
        passedPropAllPosts={positioned_posts}
      />, document.getElementById('content'));

  });

});
