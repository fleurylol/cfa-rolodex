"use client";
import { TextFieldInput, TextFieldRoot } from "@radix-ui/themes";
import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <TextFieldRoot>
      <TextFieldInput
        placeholder="Search..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
    </TextFieldRoot>
  );
};

export default SearchBar;
