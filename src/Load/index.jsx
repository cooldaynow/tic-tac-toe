import React, {Component} from 'react';
import {Button} from 'reactstrap';
import '../Load/index.scss';

class LoadScreen extends Component {
  render() {

    return (
        <div className="load__screen">
          <p>Player 1 : Would you like X or O?</p>
         <div className = 'load__wrap__buttons'> <Button
            onClick={() =>
							this.props.choice('o', false)
            }
					className = 'load__buttons'
					>
            O
          </Button>
          <Button
            onClick={() =>
							this.props.choice('x', true)
            }
					className = 'load__buttons'
					>
            X
          </Button>
				</div>
        </div>
    );
  }
}

export default LoadScreen;
