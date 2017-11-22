import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Pokedux from '../components/pokedex/index';

export default function Router(){
  return (
    <div>
      <BrowserRouter>
       <div>
        <Switch>
           <Route path="/" component={Pokedux} />
         </Switch>
       </div>
      </BrowserRouter>
    </div>
  );
}

