import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
        <div className='footer'>
            <div className='footer-wrapper'>
                <p>{this.props.footerText}</p>
            </div>
        </div>
    )
  }

};
