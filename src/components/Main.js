import React from 'react'
import { Switch, Route } from 'react-router-dom'
//import Tasklist from './Tasklist'
import LoginPage from './LoginPage'
import AddForm from './AddForm'
import Home from './Home'
import Today from './Today'
import Tomorrow from './Tomorrow'
import Week from './Week'
import TaskEditor from './TaskEditor'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/new' component={AddForm}/>
      <Route path='/today' component={Today}/>
      <Route path='/tomorrow' component={Tomorrow}/>
      <Route path='/week' component={Week}/>
      <Route path='/edit/:id' component={TaskEditor}/>
    </Switch>
  </main>
)

export default Main