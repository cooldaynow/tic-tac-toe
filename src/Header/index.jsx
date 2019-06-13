import React, { Component } from 'react';
import {Button} from 'reactstrap';
import '../Header/index.scss';
import Count from './Count';

class Header extends Component {

	render() {
		let resetAll = this.props.resetAll;
		let first = this.props.first;
		let second= this.props.second;
		let draw = this.props.draw;
		return (
			<div className={'header'}>
            <Count first = {first} second = {second} draw = {draw} />
            <Button onClick={resetAll} className="reset">
              Reset All
            </Button>
			</div>
		);
	}
}

export default Header;
