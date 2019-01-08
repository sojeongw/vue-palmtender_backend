import React from "react"
import { Switch, Route } from "react-router-dom"
import { RestrInfoPage, MapPage, NotFoundPage } from "pages"

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={MapPage} />
      <Route path="/restrInfo/:restrSelected" component={RestrInfoPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
)

export default App
