import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../components/Layout';
import s from './styles.css';
import history from '../history';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      loggedIn: false
    };
  }

  checkLoginState(e) {
    history.push({ pathname: '/about' });
  }

  componentDidMount() {
    FB.getLoginStatus((response) => {
      if (response.authResponse === null) {
        this.setState({
          loggedIn: false
        });
      } else {
        FB.api('/me', {fields: 'id,name,email,friends'}, (response) => {
          console.log(response);
          this.setState({
            loggedIn: true,
            username: response.name
          });
        });
      }
    });
  }

  changeLoginStatus() {
    if (this.state.loggedIn) {
      FB.logout((response) => {
        this.setState({
          loggedIn: false
        });
      });
    } else {
      FB.login((response) => {
        FB.api('/me', {fields: 'id,name,email,friends'}, (response) => {
          console.log(response);
          this.setState({
            loggedIn: true,
            username: response.name
          });
          history.push({ pathname: '/about' });
        });
      },
      {
        scope: 'public_profile,email,user_friends',
        auth_type: 'rerequest'
      });
    }
  }

  render() {
    return (
      <Layout className={s.content}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col">
            <h1>친구목록</h1>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <h1>채팅목록</h1>
          </div>
          <div className="mdl-cell mdl-cell--4-col">
            <h1>채팅방</h1>
          </div>
        </div>
      </Layout>
    );
  };
}

export default HomePage;
