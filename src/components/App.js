import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import ResultListContainerFactory from "../components/ResultListContainer"

class App extends Component {
  render() {
    const ResultListContainer = ResultListContainerFactory(React);
    return (
      <div>
        <ResultListContainer />
      </div>
    )
  }
}

export default App
