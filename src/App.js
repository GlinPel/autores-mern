import {
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Edit from "./components/Edit";
import NewAuthor from "./components/NewAuthor";

function App() {
  return (
    <div className="container mt-5">
      <Switch>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/new">
          <NewAuthor />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
