import React from 'react';
import PropTypes from 'prop-types';
import LoginBar from './Loginbar.js'
import AddTopics from './AddTopic.js';
import TopicList from './TopicList.js';
import RenderPost from './RenderPost.js';
import Footer from './Footer.js';
//import Footer from './Footer.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <LoginBar/>
        <div className='wrapper'>
          <AddTopics />
          <div>
              <TopicList passed_posts={this.props.passedPropAllPosts}/>
          </div>
        </div>
        <Footer footerText='&#169; Not Facebook'/>
      </>
    )
  }

};

App.propTypes = {
  passedPropAllPosts: PropTypes.array.isRequired
};
