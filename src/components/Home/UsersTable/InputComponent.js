import React from 'react'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'

const InputComponent = ({ name, type, label, user, onChangeCallBack }) => {
    const buildInputType = (type) => {
        if (type === 'select') {
            return <Input type="select" name={name} >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
            </Input>
        }

        return <Input type={type} name={name} defaultValue={user[name]} onChange={(e)=>onChangeCallBack({...user, [name]:e.target.value})} />
    }

    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText>{label}</InputGroupText>
            </InputGroupAddon>
            {buildInputType(type)}
        </InputGroup>
    )
}
export default InputComponent;