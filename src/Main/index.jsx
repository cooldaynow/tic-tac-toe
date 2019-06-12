import React, {Component} from 'react';
import './index.scss';
import {Button} from 'reactstrap';
import Xpic from '../delete.png';

const X = () => {
  return (
    <div className="img">
      <img src={Xpic} alt="X" />
    </div>
  );
};

class Main extends Component {
  state = {
    ticTac: '',
    condition: false,
    values: [],
    active: false,
  };

  handleButtons = async ev => {
    let values = [...this.state.values];
    let id = ev.target.id;
    let condition;
    let ticTac;

    if (ev.target.innerHTML !== '') {
      return false;
    }
    if (this.state.condition) {
      ticTac = 'x';
      condition = false;
    } else {
      ticTac = 'o';
      condition = true;
    }

    values[id] = ticTac;
    await this.setState(prevState => ({
      values: values,
      ticTac: ticTac,
      condition: condition,
    }));

    this.result();
  };

  checkWin = (board, player) => {
    let a = board[0];
    let b = board[1];
    let c = board[2];
    let d = board[3];
    let e = board[4];
    let f = board[5];
    let g = board[6];
    let h = board[7];
    let i = board[8];
    if (
      (a === player && b === player && c === player) ||
      (d === player && e === player && f === player) ||
      (g === player && h === player && i === player) ||
      (a === player && d === player && g === player) ||
      (b === player && e === player && h === player) ||
      (c === player && f === player && i === player) ||
      (a === player && e === player && i === player) ||
      (c === player && e === player && g === player)
    ) {
      return true;
    } else {
      return false;
    }
  };

  result = () => {
    let board = this.state.values;
    if (this.checkWin(board, 'x')) {
      console.log('Winner player: X');
      this.setState({active: true});
    } else if (this.checkWin(board, 'o')) {
      this.setState({active: true});
      console.log('Winner player: O');
    }
  };
  reset = () => {
    this.setState({
      ticTac: '',
      condition: false,
      values: [],
      active: false,
    });
  };
  renderButtons = () => {
    let i = 0;
    let arr = [];

    while (i < 9) {
      arr.push(
        <Button
          disabled={this.state.active}
          key={i + Math.random() * 999}
          id={i}
          className={'buttons'}
          onClick={ev => this.handleButtons(ev)}>
          {this.state.values[i] === 'x' ? (
            <X />
          ) : this.state.values[i] === 'o' ? (
            'НУЛЬ'
          ) : null}
        </Button>,
      );
      i++;
    }
    return arr;
  };
  render() {
    return (
      <div id="main">
        <div className="container">
          <div className="button__reset">
            <Button onClick={this.reset} className = 'reset'>Reset All</Button>
          </div>
          <div className="wrap"> {this.renderButtons()}</div>
        </div>
      </div>
    );
  }
}

export default Main;
