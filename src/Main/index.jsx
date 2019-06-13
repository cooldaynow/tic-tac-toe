import React, {Component} from 'react';
import './index.scss';
import {Button} from 'reactstrap';
import WinScreen from '../Win';
import LoadScreen from '../Load';
import Header from '../Header';

class Main extends Component {
  state = {
    ticTac: '',
    condition: false,
    values: [],
    active: false,
    start: '',
    player1: '',
    count: {first: 0, second: 0, draw: 0},
  };

  handleButtons = async ev => {
    let values = [...this.state.values];
    let id = ev.target.id;
    let ticTac;

    if (ev.target.innerHTML !== '') {
      return false;
    }
    if (this.state.condition) {
      ticTac = 'x';
    } else {
      ticTac = 'o';
    }

    values[id] = ticTac;
    await this.setState(prevState => ({
      values: values,
      ticTac: ticTac,
      condition: !this.state.condition,
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

  result = async () => {
    let board = this.state.values;
    let drawBoard = board.filter(elem => elem !== null && elem !== undefined)
      .length;
    let active;
    let winner;
    let player1 = this.state.player1;
    let first = this.state.count.first;
    let second = this.state.count.second;
    let draw = this.state.count.draw;

      if (this.checkWin(board, 'x')) {
      active = true;
      winner = 'x';
      player1 === winner ? first++ : second++;
    } else if (this.checkWin(board, 'o')) {
      active = true;
      winner = 'o';
      player1 === winner ? first++ : second++;
    }else if (drawBoard === 9) {
      active = true;
      winner = 'draw';
      draw++;
    }

    await this.setState(prevState => {
      return {
        active: active,
        winner: winner,
        count: {first: first, second: second, draw: draw},
      };
    });
    this.reloadAfterWin(this.reload);
  };

  reloadAfterWin = callback => {
    let gameEnd = this.state.active;
    if (gameEnd) {
      setTimeout(() => {
        this.setState({delay: true});
        callback.call();
      }, 800);
    }
  };
  reload = () => {
    setTimeout(() => {
      this.reset();
    }, 1200);
  };
  reset = () => {
    let condition;
    let player1 = this.state.player1;

    player1 === 'x' ? (condition = true) : (condition = false);
    this.setState({
      values: [],
      active: false,
      delay: false,
      winner: '',
      condition: condition,
    });
  };
  resetAll = () => {
    this.setState({
      condition: false,
      delay: false,
      values: [],
      active: false,
      start: '',
      player1: '',
      count: {first: 0, second: 0, draw: 0},
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
          {this.state.values[i] === 'x'
            ? 'X'
            : this.state.values[i] === 'o'
            ? 'O'
            : null}
        </Button>,
      );
      i++;
    }
    return arr;
  };
  choice = (choice, condition) => {
    this.setState({start: true, player1: choice, condition: condition});
  };
  render() {
    let winner = this.state.winner;
    let player1 = this.state.player1;
    let first = this.state.count.first;
    let second = this.state.count.second;
    let draw = this.state.count.draw;
    return (
      <div id="main">
        <div className="container">
          <Header
            resetAll={this.resetAll}
            first={first}
            second={second}
            draw={draw}
          />
          <div className="wrap">
            {this.state.delay ? (
              <WinScreen winner={winner} player1={player1} />
            ) : this.state.start ? (
              this.renderButtons()
            ) : (
              <LoadScreen choice={this.choice} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
