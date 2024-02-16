import { TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import React from "react";

const SearchBar = () => {
  return (
    <TextFieldRoot>
      <TextFieldInput placeholder="Search..." />
    </TextFieldRoot>
  );
};

export default SearchBar;
