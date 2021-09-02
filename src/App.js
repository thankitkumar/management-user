import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Edit from "./components/users/Edit";
function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/edit/:_id" component={Edit} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;