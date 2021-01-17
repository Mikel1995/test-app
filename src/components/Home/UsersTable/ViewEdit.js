import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Col, FormGroup, Input, Label, Row, FormText, Button } from 'reactstrap';
import InputComponent from './InputComponent';
import axios from 'axios';
import { displayConfig } from '../../../Const';
import { revertValueAsync } from '../../../helpers';
import Alert from '../../Common/Alert';


const ViewEdit = (props) => {
    const userId = useRouteMatch('/user/:id').params.id;
    const [user, setuser] = useState({});
    const [showAlert, setshowAlert] = useState(false);

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

    const updateUser = async () => {
        const { data, status } = await axios.put(`/users/${userId}`, { ...user });
        switch (status) {
            case 200:
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

    return (
        <Row>
            <Col xs="3">
                <h2>{`${user.first_name} ${user.last_name}`}</h2>
                <img src="..." class="img-fluid" alt="Responsive image" />
                <FormGroup>
                    <Label for="exampleFile">File</Label>
                    <Input type="file" name="file" id="exampleFile" />
                    <FormText color="muted">
                        hange Profile Photo Here
                </FormText>
                </FormGroup>
            </Col>
            <Col xs="9">
                <Alert isOpen={showAlert} color="success" message="User has been updated" />
                {user !== undefined ? <Row>
                    <Col xs="6">
                        {buildColumn(displayConfig.firstCol)}
                        <Button color="success" size="lg" className="mr-5" onClick={() => updateUser()}>Save</Button>
                        <Button color="secondary" size="lg">Canclel</Button>
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