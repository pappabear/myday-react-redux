import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Tasklist from './Tasklist'
import LoginPage from './LoginPage'
import Form from './Form'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Tasklist}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/form' component={Form}/>
      <Route path='/Tasklist' component={Tasklist}/>
    </Switch>
  </main>
)

export default Main