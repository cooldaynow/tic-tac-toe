import React, { Component } from 'react';
import {Button} from 'reactstrap';
import '../Header/index.scss';
import Count from './Count';

class Header extends Component {

	render() {
		let reset = this.props.reset;
		let first = this.props.first;
		let second= this.props.second;
		return (
			<div className={'header'}>
            <Count first = {first} second = {second} />
            <Button onClick={reset} className="reset">
              Reset All
            </Button>
			</div>
		);
	}
}

export default Header;
