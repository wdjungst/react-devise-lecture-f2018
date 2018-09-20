import axios from 'axios'

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export const login = (user) => {
  return { type: LOGIN, user }
}

export const handleRegister = (user, history) => {
  return (dispatch) => {
    axios.post('/api/auth', user)
      .then( res => {
        dispatch(login(res.data.data))
        history.push('/')
      })
      .catch( err => console.log(err) )
  }
}

export const handleLogin = (user, history) => {
  return (dispatch) => {
    axios.post('/api/auth/sign_in', user)
      .then( res => {
        dispatch(login(user))
        history.push('/')
      })
      .catch( err => console.log(err) )
  }
}

export const handleLogout = (history) => {
  return (dispatch) => {
    axios.delete('/api/auth/sign_out')
      .then( res => {
        dispatch({ type: LOGOUT })
        history.push('/login')
      })
  }
}

export default (state = {}, action) => {
  switch(action.type) {
    case LOGIN:
      return action.user
    case LOGOUT:
      return {}
    default:
      return state
  }
}

