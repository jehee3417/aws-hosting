import React, {Component} from 'react';

class App extends Component {
  state = {
    state: 'waiting'
    , message: 'Click to Start!'
    , result: []
  }

  timeout;
  startTime;
  endTime;
  onClickScreen = () => {
    const {state, message, result} = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready'
        , message: 'Click on it when it\'s green.'
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now'
          , message: 'Click now!!!'
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting'
        , message: 'Too fast. Retry!'
      });
      
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState((prevState) => {
        return {
          state: 'waiting'
          , message: `${this.endTime - this.startTime}ms, Retry.`
          , result: [...prevState.result, this.endTime - this.startTime]
        }
      })
    }
  }

  onReset = () => {
    this.setState({
      state: 'waiting'
      , message: 'Click to Start!'
      , result: []
    })
  }

  renderAverage = () => {
    const {result} = this.state;
    // if (result.length === 0 ) {
    //   return null;
    // } else {
    //   return <div>Average Time: {result.reduce((a, c) => a + c) / result.length}ms</div>;
    // }
    return (
      result.length === 0 
      ? null 
      : <>
          <div>Try count: {result.length}</div>
          <div>Average Time: {result.reduce((a, c) => a + c) / result.length}ms</div>
          <div>
            <h3>History</h3>
            <ul>
              {result.map((v, i) => {
                return (
                  <li key={v + 'rc' + i}>{i + 1}Round: {v}ms</li>
                )
              })}
            </ul>
          </div>
          <div>
            <button onClick={this.onReset}>RESET</button>
          </div>
        </>
    )
  }

  render() {
    const {state, message} = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    )
  }
}


export default App;
