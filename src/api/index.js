import axios from 'axios'

module.exports = { 

  login: function (username){
    return axios.get('https://api.github.com/users/' + username + '/repos');
  },

  signup: function (username){
    return axios.get('https://api.github.com/users/' + username);
  }

}