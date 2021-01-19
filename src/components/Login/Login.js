import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Form } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { AiOutlineUser, AiOutlineKey } from 'react-icons/ai';
import { Button } from 'reactstrap';
import Alert from '../Common/Alert';
import { setLoggedUser } from '../../app/loggedUserSlice';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [username, setusername] = useState(localStorage.getItem('username'));
  const [password, setpassword] = useState(localStorage.getItem('password'));
  const [rememberMe, setrememberMe] = useState(localStorage.getItem('remeberMe'))
  const [isErrorResponse, setisErrorResponse] = useState(false);

  const login = async () => {
    rememberUser();
    const { data: users, status } = await axios.get('users');
    switch (status) {
      case 200:
        const userFound = users.find(user => (user.email === username || user.username === username) && (user.password === password));
        if (userFound === undefined) {
          setisErrorResponse(true);
          return;
        }
        history.push('/');
        dispatch(setLoggedUser({ user:userFound, islogged: true }));
        localStorage.setItem('token', 'token_value');
        localStorage.setItem('user', JSON.stringify(userFound));
        break;
      default:
        break;
    }
  }

  const rememberUser = () => {
    if (rememberMe) {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      localStorage.setItem('remeberMe', true);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/')
    }
  },)

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h3 className="text-center">Sign In</h3>
          <Alert isOpen={isErrorResponse} color="danger" message={'Incorrect username or password'} />
          <Form >
            <FormGroup inline>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <AiOutlineUser />
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setusername(e.target.value)} placeholder="username" type="email" defaultValue={username} />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <AiOutlineKey />
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setpassword(e.target.value)} placeholder="password" type="password" defaultValue={password} />
              </InputGroup>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" checked={rememberMe} onChange={()=>setrememberMe(!rememberMe)} />
                Remember me
             </Label>
            </FormGroup>
            <br />
            <Button onClick={() => login()} size="full" color="primary" block>Log In</Button>{' '}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;