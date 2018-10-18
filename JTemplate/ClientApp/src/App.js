import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';

import Login from './components/Login';
import Register from './components/Register';
import Startup from './Startup';
import Tetris from './components/Tetris/Play';

//<Route path='/fetch-data/:startDateIndex?' component={FetchData} />


export default () => (

  <Startup>

    <Layout>

          <Route exact path='/' component={Home} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <Route path='/tetris' component={Tetris} />
    </Layout>

  </Startup>
);
