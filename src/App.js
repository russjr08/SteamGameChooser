import React, { Component } from 'react';
import './App.css';

import Header from './main/Header';
import UserEntry from './main/UserEntry';
import GameGrid from './main/GameGrid';

import { Alert, Container } from 'reactstrap';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorText: "",
      ready: false,
      invalid: false,
      loading: false,
      username: "",
      userid: -1
    }

    this.fetchSteamID = this.fetchSteamID.bind(this);
    this.fetchOwnedGames = this.fetchOwnedGames.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderInvalid = this.renderInvalid.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderGameGrid = this.renderGameGrid.bind(this);
    this.error = this.error.bind(this);
  }

  renderLoading() {
    if(this.state.loading) {
      return (
        <div>
          <Alert color="warning"> Loading! Please wait... </Alert>
        </div>
      )
    }
  }

  renderInvalid() {
    if(this.state.invalid) {
      return (
        <div>
          <Alert color="danger">You need to enter a valid username!</Alert>
        </div>
      )
    }
  }

  renderError() {
    if(this.state.error) {
      return (
        <div>
          <Alert color="danger">
            <strong>ERROR!</strong>
            <hr/>
            <p>{this.state.errorText}</p>
          </Alert>
        </div>
      )
    }
  }

  error(err) {
    this.setState({error: true, errorText: err});
  }

  renderGameGrid() {
    if(this.state.ready) {
      return (
        <GameGrid game_count={this.state.game_count} games={this.state.games} key={Math.random()} />
      )
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Container className="mt-5">
          {this.renderLoading()}
          {this.renderError()}
          {this.renderInvalid()}
          <UserEntry click={this.fetchSteamID} className="d-block mx-auto mb-5" loading={this.state.loading}/>
          {this.renderGameGrid()}
        </Container>
      </div>
    );
  }

  fetchSteamID(username) {
    username = username.trim();

    if(username === "" || username === null) {
      this.setState({invalid: true});
      return;
    } else {
      this.setState({invalid: false});
    }


    this.setState({username: username, loading: true});

    fetch('https://kronosad.com/steam_api/v2/name_resolver/?vanityurl=' + username)
      .then(async (res) => {
          if(res.ok) {
            let data = await res.json();
            console.log(data);
            if(data.response.success === 42) {
              return new Error('We ran into a problem resolving Steam ID');
            }
            return data;
          } 
          return new Error('We ran into a problem resolving Steam ID.');
      })
      .then((data) => {
        if(!this.state.error) {
          this.setState({error: false, userid: data.response.steamid});
          this.fetchOwnedGames(data.response.steamid);
          console.log(data);
        }
      })
      .catch((error) => {
          this.error(error.toString());
          console.error(error);
          return new Error('We ran into a problem resolving Steam ID.');
      });
      
  }

  fetchOwnedGames(id) {
    fetch('https://kronosad.com/steam_api/v2/get_owned_games/?steamid=' + id)
      .then((res) => {
          if(res.ok) {
            console.log(res);
            return res.json();
          }
          return new Error('We ran into a problem grabbing your game data.');
      })
      .then((data) => {
        if(!data.response.games) {
          this.setState({error: true, loading: false});
          console.error("Empty game set found!");
          console.log(data);
          this.setState({game_count: 0, games: []});
          return;
        }
        this.setState({error: false, loading: false, games: data.response.games, game_count: data.response.game_count, ready: true});
        console.log(data);
      })
      .catch((error) => {
        this.setState({error: true, loading: false});
        return Promise.reject();
      })
  }


}

export default App;
