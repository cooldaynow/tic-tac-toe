import React, {Component} from 'react';
import './index.scss';
import {Button} from 'reactstrap';
import WinScreen from '../Win';
import LoadScreen from '../Load';
import Header from '../Header';
import Turn from '../Turn';
import Top from '../Navbar';

class TicTacToe extends Component {
  state = {
    ticTac: '',
    turn: '',
    condition: false,
    values: [],
    active: false,
    start: '',
    player1: '',
    player2: '',
    winButtons: [],
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
      turn: !this.state.turn,
      condition: !this.state.condition,
    }));

    this.result();
  };

  checkWin = (board, player) => {
    let winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winningCombo = [];
    let result = winCombos.some(combination => {
      let winning = true;
      for (let i = 0, len = combination.length; i < len; i++) {
        let elem = combination[i];
        if (board[elem] !== player) {
          winning = false;
        }
      }
      if (winning) {
        winningCombo = combination;
      }
      return winning;
    });
    return [result, winningCombo];
  };

  result = async () => {
    let board = this.state.values;
    let drawBoard = board.filter(elem => elem !== null && elem !== undefined)
      .length;
    let active, winner, winButtons;
    let turn = this.state.turn;
    let player1 = this.state.player1;
    let first = this.state.count.first;
    let second = this.state.count.second;
    let draw = this.state.count.draw;

    if (this.checkWin(board, 'x')[0]) {
      winButtons = this.checkWin(board, 'x')[1];
      active = true;
      winner = 'x';
      turn = '';
      player1 === winner ? first++ : second++;
    } else if (this.checkWin(board, 'o')[0]) {
      winButtons = this.checkWin(board, 'o')[1];
      active = true;
      winner = 'o';
      turn = '';
      player1 === winner ? first++ : second++;
    } else if (drawBoard === 9) {
			winButtons = [];
      active = true;
      winner = 'draw';
      turn = '';
      draw++;
    }

    await this.setState(prevState => {
      return {
        active: active,
        winner: winner,
        turn: turn,
        winButtons: winButtons,
        count: {first: first, second: second, draw: draw},
      };
    });
    this.reloadAfterWin(this.reload);
  };

  reloadAfterWin = callback => {
    let gameEnd = this.state.active;
    if (gameEnd) {
      setTimeout(() => {
        this.setState({delay: true, turn: ''});
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
      turn: true,
      winner: '',
      condition: condition,
    });
  };
  resetAll = () => {
    this.setState({
      condition: false,
      turn: '',
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
          key={i}
          id={i}
          className={
            this.state.active && this.state.winButtons.includes(i)
              ? 'buttons win'
              : 'buttons'
          }
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
    let player2;
    choice === 'x' ? (player2 = 'o') : (player2 = 'x');

    this.setState({
      start: true,
      turn: true,
      player1: choice,
      player2: player2,
      condition: condition,
    });
  };
  render() {
    let winner = this.state.winner;
    let player1 = this.state.player1;
    let player2 = this.state.player2;
    let first = this.state.count.first;
    let second = this.state.count.second;
    let draw = this.state.count.draw;
    let turn = this.state.turn;
    return (
      <div id="tic__tac">
				<div className = 'top'>
				<Top />
        <Turn turn={turn} player1={player1} player2={player2} />
        <div className="tic__tac__container">
          <Header
            resetAll={this.resetAll}
            first={first}
            second={second}
            draw={draw}
          />
          <div className="screen">
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
      </div>
    );
  }
}

export default TicTacToe;
