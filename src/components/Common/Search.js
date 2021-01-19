import React from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import { AiOutlineSearch } from "react-icons/ai";
const Search = ({ callBack }) => {
  return (
    <InputGroup>
      <InputGroupAddon addonType="prepend">
        <InputGroupText><AiOutlineSearch /></InputGroupText>
      </InputGroupAddon>
      <Input placeholder="Search" onChange={(e) => callBack(e.target.value)} />
    </InputGroup>
  );
};

export default Search;
