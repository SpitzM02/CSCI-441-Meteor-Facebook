import {Mongo} from 'meteor/mongo';

export const RedditDB = new Mongo.Collection('redditDB_user_posts');
export const RedditDbUsers = new Mongo.Collection('redditDB_users');

export const Calculate_rank_and_position_for_posts = (user_posts_collection) => {
    let rank = 1;

    return user_posts_collection.map((post, index) => {
      if(index !== 0 && user_posts_collection[index - 1].votes > post.votes) {

        rank++;
      }


      return {
        ...post,
        rank,
        position: rank
      };
    });
};
