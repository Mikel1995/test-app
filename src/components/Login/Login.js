import React, { useState } from 'react';
import axios from 'axios'
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Form } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { AiOutlineUser, AiOutlineKey } from 'react-icons/ai';
import { Button } from 'reactstrap';
import Alert from '../Common/Alert';
import { setLoggedUser } from '../../app/loggedUserSlice';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';

const Login = ({ history }) => {
  const dispatch = useDispatch();

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isErrorResponse, setisErrorResponse] = useState(false);

  const login = async () => {
    const { data: users, status } = await axios.get('users');
    switch (status) {
      case 200:
        const userFound = users.find(user => (user.email === username || user.username === username) && (user.password === password));
        if (userFound === undefined) {
          setisErrorResponse(true);
          return;
        }
        history.push('/')
        dispatch(setLoggedUser({ user:userFound, islogged: true }))
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h3 className="text-center">Sign In</h3>
          <Alert isOpen={isErrorResponse} message={'Incorrect username or password'} />
          <Form >
            <FormGroup inline>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <AiOutlineUser />
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setusername(e.target.value)} placeholder="username" type="email" />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <AiOutlineKey />
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => setpassword(e.target.value)} placeholder="password" type="password" />
              </InputGroup>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />
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

export default withRouter(Login);