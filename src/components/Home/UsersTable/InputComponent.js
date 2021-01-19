import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { isInputDisabled } from "../../../helpers";

const InputComponent = ({
  pageType,
  loggedUser,
  canUpdate,
  name,
  type,
  label,
  user,
  onChangeCallBack
}) => {
  const buildInputType = type => {
    if (type === "select") {
      return (
        <Input
          disabled={loggedUser.userLevel ==='User'}
          type="select"
          name={name}
          value={user.userLevel}
          onChange={e => onChangeCallBack({ ...user, [name]: e.target.value })}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </Input>
      );
    }
    return (
      <Input
        disabled={(pageType === "Update" && canUpdate === false) || isInputDisabled(pageType, loggedUser, user.id)}
        invalid={user[name] === undefined || user[name] === ""}
        type={type}
        name={name}
        value={user[name]}
        onChange={e => onChangeCallBack({ ...user, [name]: e.target.value })}
      />
    );
  };

  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          {label}
        </InputGroupText>
      </InputGroupAddon>
      {buildInputType(type)}
    </InputGroup>
  );
};
export default InputComponent;
