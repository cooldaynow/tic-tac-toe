import React, {Component} from 'react';
import '../Win/index.scss';

class WinScreen extends Component {
  winMessage = () => {
    let winner = this.props.winner;
    let player1 = this.props.player1;
    let message = '';
    if (winner === 'draw') {
      message = 'Draw :)';
    } else if (winner === player1) {
      message = 'Player ONE win !! :D';
    } else {
      message = 'Player TWO win !! :D';
    }
    return message;
  };

  render() {
    return (
      <div className="win__screen">
        <p>{this.winMessage()}</p>
      </div>
    );
  }
}

export default WinScreen;
