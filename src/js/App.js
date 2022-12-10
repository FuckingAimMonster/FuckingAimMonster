import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MainFirst from "./pages/MainFirst";
import MainSecond from "./pages/MainSecond";
import Precautions from "./pages/Precautions";
import SignUpFirst from "./pages/SignUpFirst";
import SignUpSecond from "./pages/SignUpSecond";
import SignUpThird from "./pages/SignUpThird";
import MyInfo from "./pages/MyInfo";
import ModifyMyInfo from "./pages/ModifyMyInfo";
import LoadingView from "./pages/LoadingView";
import Result from "./pages/Result";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register/first" component={SignUpFirst} />
      <Route exact path="/register/second" component={SignUpSecond} />
      <Route exact path="/register/third" component={SignUpThird} />
      <Route exact path="/precautions" component={Precautions} />
      <Route exact path="/main/first" component={MainFirst} />
      <Route exact path="/main/second/:dpi" component={MainSecond} />
      <Route exact path="/loading" component={LoadingView} />
      <Route exact path="/myinfo" component={MyInfo} />
      <Route exact path="/myinfo/modify" component={ModifyMyInfo} />
      <Route exact path="/result" component={Result} />
    </Switch>
  );
};

export default App;
