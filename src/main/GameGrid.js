import React, { Component } from 'react';

import GameItem from './GameItem';
import '../App.css';

import { Col } from 'reactstrap';


class GameGrid extends Component {


    constructor(props) {
        super(props);

        this.state = {
            tiles: [],
            rand_game: this.props.games[Math.round(Math.random() * this.props.game_count)]
        }

        console.log(this.state.rand_game);

        this.renderGameCount = this.renderGameCount.bind(this);
        this.renderRandomGame = this.renderRandomGame.bind(this);
        this.genRandomGame = this.genRandomGame.bind(this);
    }

    genRandomGame() {
        this.setState({rand_game: this.props.games[Math.round(Math.random() * this.props.game_count)]});
    }

    componentWillMount() {
        let tiles = this.props.games.map((game) => {
            return (
                <Col sm="3" key={game.appid}>
                    <GameItem className="game" game={game} />
                </Col>
            )
        })

        this.setState({tiles: tiles});
        console.log(tiles);
    }


    renderGameCount() {
        if(this.props.game_count === 1) {
            return (
                <h4>You only have 1 game...</h4>
            )
        }
        
        if(this.props.game_count === 0) {
            return (
                <h4>You have no games!</h4>
            )
        }

        return (
            <h4>You have {this.props.game_count} games!</h4>
        )
    }

    renderRandomGame() {
        return (
            <div>
                <h3>You should play...</h3>
                <i>Click to pick another one</i>
                <br/>
                <GameItem click={() => this.genRandomGame()} game={this.state.rand_game} />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderRandomGame()}
                <h4 className="d-block mx-auto mt-3 mb-2">Picked from your catalog...</h4>
                <div className="d-block mx-auto mt-3 mb-4">{this.renderGameCount()}</div>
                <div className="row">
                    {this.state.tiles}
                </div>
            </div>
        )
    }

}

export default GameGrid;