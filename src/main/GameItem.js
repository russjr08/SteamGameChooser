import React, { Component } from 'react';

class GameItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.generateImgURL(props.game)
        }
        
        this.generateImgURL = this.generateImgURL.bind(this);   
        this.renderTime = this.renderTime.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({url: this.generateImgURL(nextProps.game)});
    }

    generateImgURL(game) {
        return "http://media.steampowered.com/steamcommunity/public/images/apps/" + game.appid + "/" + game.img_logo_url + ".jpg";
    }

    renderTime() {

        if(this.props.game.playtime_forever === 0) {
            return (
                <p>No play time</p>
            )
        }

        if(this.props.game.playtime_forever % 60) {
            var hours = Math.round(this.props.game.playtime_forever / 60)
            if(hours === 1) {
                return (
                    <p>{hours} hour of play time</p>
                )
            } else {
                return (
                    <p>{hours} hours of play time</p>
                )
            }
        } else {
            return (
                <p>{this.props.game.playtime_forever} minutes of play time</p>
            )
        }
    }

    render() {
        return (
            <div onClick={this.props.click}>
                <img src={this.state.url} alt="Game logo" />
                <br/>
                <strong className="mb-0">{this.props.game.name}</strong>
                <br/>
                {this.renderTime()}
            </div>
        )
    }
}

export default GameItem;