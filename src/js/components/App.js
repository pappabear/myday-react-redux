import React from "react";
import List from "./List";
import Form from "./Form";
import MDemo from './MDemo';
import Header from './Header';

const data = {
  menus: [
    { text: 'Today', link: '/ListPage?dt=2018-02-01' },
    { text: 'Tomorrow', link: '/ListPage?dt=2018-02-03' },
  ],
}

const App = () => (

  <div>
    <Header />
    <MDemo />
  </div>


  
);

export default App;