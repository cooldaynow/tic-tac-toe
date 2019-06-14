import React, {Component} from 'react';
import '../Count/index.scss';

class Count extends Component {
  render() {
		let first = this.props.first;
		let second = this.props.second;
		let draw = this.props.draw;
    return (
      <div className={'count__screen'}>
        <div className = 'count'> {first} <div>Player 1</div></div>
        <div className = 'count'> {second} <div>Player 2</div></div>
        <div className = 'count'> {draw} <div>Draw</div></div>
      </div>
    );
  }
}

export default Count;
