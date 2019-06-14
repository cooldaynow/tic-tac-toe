import React from 'react';
import '../Turn/index.scss';

export default class Turn extends React.Component {
  render() {
    return (
      <div className="unhead">
        <div className={this.props.turn !== true ? 'turn first fade ' : 'turn first'}>
        Go Player <span className = 'number'>1</span>  ({this.props.player1})
        </div>
        <div className={this.props.turn !== false ? 'turn second fade ' : 'turn second'}>
        Go Player <span className = 'number'>2</span>  ({this.props.player2})
        </div>
      </div>
    );
  }
}
