import React, { Component } from 'react'
import { Button, Form, Segment, Header } from 'semantic-ui-react'
import { handleRegister} from '../reducers/user'
import { connect } from 'react-redux'

const styles = {
  error: {
    color: 'red'
  }
}

class Register extends Component {
  state = { email: '', password: '', passwordConfirmation: '', error: null }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, passwordConfirmation } = this.state;

    if(password === passwordConfirmation)
      this.props.dispatch(handleRegister({ email, password, passwordConfirmation }, this.props.history))
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { password, passwordConfirmation } = this.state
      if ((password || passwordConfirmation) && (password !== passwordConfirmation))
        this.setState({ error: 'Passwords must match' })
      else
        this.setState({ error: null })
    });
  }

  render() {
    const { error, email, password, passwordConfirmation } = this.state;

    return(
      <Segment basic>
        <Header as='h1' textAlign='center'>Register</Header>
        { error && <Header as="h3" style={styles.error}>{error}</Header> }
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Email</label>
            <input
              required
              autoFocus
              name='email'
              value={email}
              placeholder='Email'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              required
              name='password'
              value={password}
              placeholder='Password'
              type='password'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password Confirmation</label>
            <input
              required
              name='passwordConfirmation'
              value={passwordConfirmation}
              placeholder='Password Confirmation'
              type='password'
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment textAlign='center' basic>
            <Button primary type='submit'>Submit</Button>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

export default connect()(Register);
