import Dashboard from './Components/DashboardComponent';
import Inventry from './Components/InventryComponent';
import Item from './Components/ItemComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/item">
            <Item />
          </Route>
          <Route path="/inventry">
            <Inventry />
          </Route>
        </Switch>
      </Router>
      </header>
    </div>
  );
}

export default App;
