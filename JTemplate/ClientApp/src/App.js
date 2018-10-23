import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Startup from './Startup';
import { requireAnonymous, requireAuth } from './components/Authorize';
import Test from './components/Test'; 


//<Route path='/fetch-data/:startDateIndex?' component={FetchData} />


export default () => (

  <Startup>

    <Layout>

          <Route exact path='/' component={Home} />

          <Route path='/login' component={requireAnonymous(Login)} />
          <Route path='/register' component={requireAnonymous(Register)} />

          <Route path='/test' component={requireAuth(Login)} />

    </Layout>

  </Startup>
);
