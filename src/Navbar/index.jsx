import React from 'react';
import '../Navbar/index.scss';

export default class Top extends React.Component {
  render() {
    return (
      <div className="navbar">
        <nav>
          <a href="https://github.com/cooldaynow/tic-tac-toe">
            Simple Tic-Tac-Toe
          </a>
        </nav>
      </div>
    );
  }
}
