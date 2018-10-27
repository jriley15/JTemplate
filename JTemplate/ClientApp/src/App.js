import React from 'react';
import { Switch, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Startup from './Startup';
import { requireAnonymous, requireAuth } from './components/Authorize';
import NotFound from './components/NotFound'; 
import Test from './components/Test'; 
import { EmailConfirm, EmailResend } from './components/Email'; 
import ForgotPassword from './components/ForgotPassword'; 
import ResetPassword from './components/ResetPassword'; 



export default () => (

  <Startup>

    <Layout>
      <Switch>
          <Route exact path='/' component={Home} />

          <Route path='/login' component={requireAnonymous(Login)} />
          <Route path='/register' component={requireAnonymous(Register)} />

         
          <Route exact path='/emailConfirm' component={requireAnonymous(EmailConfirm)} />
          <Route exact path='/emailResend' component={requireAnonymous(EmailResend)} />

          <Route exact path='/forgotPassword' component={requireAnonymous(ForgotPassword)} />
          <Route exact path='/resetPassword' component={requireAnonymous(ResetPassword)} />

          <Route path='/oauth' component={Test} />


          <Route component={NotFound} />
      </Switch>
    </Layout>

  </Startup>
);
