import React from 'react';
import {RedditDB} from './../api/redditDB.js';

export default class ReplyToPost extends React.Component{
    processFormData(event){
        event.preventDefault();
        let newReply= event.target.formInputReply.value;
        if(newReply){
            RedditDB.insert({
                reply: newReply,
                votes:0
            });
        };

    }
    mapReplies(passed_posts){
        let allReplies = RedditDB.find({}, { reply:1, _id:0}, {sort: {votes: -1}}).fetch();
        return allReplies.map((post) => {
          return <p>{post.reply}</p>;
        });
    }
    render(){
        return(
            <div className='replyToPost'>
                <form className='form' onSubmit={this.processFormData.bind(this)}>
                    <input className='form__input' type='text' name='formInputReply' placeholder='Your Reply'/>
                        <button className='button'>Reply to this post</button>
                </form>
                {this.mapReplies(this.props.passedPropReplies)}
            </div>
        );
    }
}
