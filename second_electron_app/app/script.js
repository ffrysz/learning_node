import React from 'react';
import { render } from 'react-dom';
import AppDescription from './AppDescription';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: {
        off: true,
        work: false,
        rest: false,
      },
      time: 0,
      timer: null
    }
  }

  render() {

    const { status } = this.state;
    // console.log(status);

    return (
      <div>
        <h1>Protect your eyes</h1>
        <AppDescription />
        {(status.off) &&
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        }
        {(status.work) && <img src="./images/work.png" />}
        {(status.rest) && <img src="./images/rest.png" />}
        {(!status.off) &&
          <div className="timer">
            18:23
          </div>
        }
        {(status.off) && <button className="btn">Start</button>}
        {(!status.off) && <button className="btn">Stop</button>}
        <button className="btn btn-close">X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
