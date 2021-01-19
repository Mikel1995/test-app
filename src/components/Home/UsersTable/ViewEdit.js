import React, { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { Col, FormGroup, Input, Label, Row, FormText, Button, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import InputComponent from './InputComponent';
import axios from 'axios';
import { displayConfig } from '../../../Const';
import { isValid, revertValueAsync } from '../../../helpers';
import Alert from '../../Common/Alert';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../../app/loggedUserSlice';


const ViewEdit = ({ }) => {
    const loggedUser = useSelector(selectLoggedUser).user || JSON.parse(localStorage.getItem('user'));
    const router = useRouteMatch();
    const [user, setuser] = useState({});
    const [showAlert, setshowAlert] = useState(false);
    const [password, setpassword] = useState('');
    const [retypedPassword, setretypedPassword] = useState('')

    const pageType = router.path === '/add' ? 'Add' : 'Update';
    const userId = getUserId(router, loggedUser);

    const getUser = async () => {
        const { data, status } = await axios.get(`/users/${userId}`);
        switch (status) {
            case 200:
                setuser(data)
                break;
            default:
                break;
        }
    }

    const updateorAddUser = async () => {
        const { status } = pageType === 'Add' ? await axios.post('/users', { ...user }) : await axios.put(`/users/${userId}`, { ...user });
        switch (status) {
            case 200 || 201:
                setshowAlert(true)
                revertValueAsync(setshowAlert, 2);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        getUser(userId);
    }, [])

    const buildColumn = (configInputs) => {
        return configInputs.map((input, i) => {
            return (
                <>
                    <InputComponent key={i} label={input.label} type={input.type} name={input.name} user={user} onChangeCallBack={setuser} />
                    <br />
                </>
            )
        })
    }

    const buildPasswordInputs = () => {
        if (pageType === 'Add') {
            return (
                <>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Password</InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name={password} defaultValue={password} onChange={(e) => setpassword(e.target.value)} />
                    </InputGroup>
                    <br />
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Retype Password</InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name={retypedPassword} defaultValue={retypedPassword} onChange={(e) => setretypedPassword(e.target.value)} />
                    </InputGroup>
                    {password !== retypedPassword ? <p class="text-danger">Password don't match</p> : null}
                    <br />
                </>
            )
        }
    }

    return (
        <Row>
            <Col xs="3">
                <img src={user.photo || "https://idearator.herokuapp.com/assets/user-default-c412d9c43636016aaa4e754262a99f21.png"} className="img-fluid" alt="Responsive image" />
                <FormGroup>
                    <Input type="text" onChange={(e) => setuser({ ...user, photo: e.target.value })} />
                    <FormText color="muted">
                        Paste Url Here
                </FormText>
                </FormGroup>
            </Col>
            <Col xs="9">
                <Alert isOpen={showAlert} color="success" message={pageType === 'Add' ? "User has been Added" : 'User has been Updated'} />
                <h2>{pageType === 'Add' ? 'Add User' : 'Update User'}</h2>
                {user !== undefined ? <Row>
                    <Col xs="6">
                        {buildColumn(displayConfig.firstCol)}
                        {buildPasswordInputs()}
                        <Button disabled={password !== retypedPassword || !isValid(user)} color="success" size="lg" className="mr-5" onClick={() => updateorAddUser()}>Save</Button>
                        <Link to="/"><Button color="secondary" size="lg">Cancel</Button></Link>
                    </Col>
                    <Col xs="6">
                        {buildColumn(displayConfig.secondCol)}
                    </Col>
                </Row> : null}
            </Col>
        </Row>
    )
}
export default ViewEdit;

function getUserId(router, user) {
    const { path, params } = router;
    if (path === '/profile') {
        return user.id;
    }
    return params.id;
}