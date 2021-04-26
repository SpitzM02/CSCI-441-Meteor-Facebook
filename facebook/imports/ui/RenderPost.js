import React from 'react';
import {RedditDB} from './../api/redditDB.js';
import PropTypes from 'prop-types';
import ReplyToPost from './ReplyToPost.js'

export default class RenderPost extends React.Component{
    render(){
        console.log(this.props.post_prop_obj.topic);
        return(
            <>
                <div key={this.props.post_prop_obj._id} id={this.props.post_prop_obj.position}>
                    <div className='post'>
                        <div>
                            <h3 className='postTopic'>{this.props.post_prop_obj.topic}</h3>
                            <p className='postStats'>This topic is in place: {this.props.post_prop_obj.position} with {this.props.post_prop_obj.votes} like(s)</p> {''}
                        </div>
                        <div>
                            <button className='postActions' onClick={()=>{
                                RedditDB.update({_id: this.props.post_prop_obj._id}, {$inc: {votes: 1}});
                            }}>C</button>
                            <button className='button button--round' onClick={() => {
                                //dont allow negative likes
                                if(this.props.post_prop_obj.votes>=1){
                                    RedditDB.update({_id: this.props.post_prop_obj._id},{$inc: {votes: -1}})
                                }
                            }}>D</button>
                            <button onClick={() => {
                                RedditDB.remove({_id: this.props.post_prop_obj._id})
                            }}>X</button>
                            <ReplyToPost passedPropReplies= {this.props.post_prop_obj}/>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}

RenderPost.propTypes = {
  passedPropReplies:PropTypes.array.isRequired
};
