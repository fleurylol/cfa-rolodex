"use client";
import React, { useState } from "react";
import { Contact } from "@prisma/client";
import ResultBox from "./ResultBox";
import classNames from "classnames";

interface SearchBarProps {
  contacts: Contact[];
}

const SearchBar = ({ contacts }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Contact[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (event.target.value !== "") {
      setResults(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(event.target.value.toLowerCase()),
        ),
      );
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        className={classNames({
          "rounded-tl-md rounded-tr-md border-b-0": searchTerm,
          "rounded-md": !searchTerm,
          "prose w-full border-2 px-2 focus:outline-none": true,
        })}
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {results.length > 0 && (
        <div className="absolute z-10 w-full rounded-bl-md rounded-br-md border-2 bg-white">
          {results.map((result) => (
            <ResultBox
              key={result.id}
              id={result.id}
              name={result.name}
              business={result.businessName}
            />
          ))}
        </div>
      )}
      {results.length === 0 && searchTerm && (
        <div className="absolute z-10 w-full rounded-bl-md rounded-br-md border-2 bg-white">
          <p className="p-2">No results found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
