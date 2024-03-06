import { Separator } from "@radix-ui/themes";
import React from "react";

interface ResultBoxProps {
  name: string;
  business: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({
  name,
  business,
}: ResultBoxProps) => {
  return (
    <>
      <div className="flex flex-col border-b-2 px-2 transition-colors last:border-b-0 hover:bg-slate-200">
        <div className="font-bold">{name}</div>
        <div>{business}</div>
      </div>
    </>
  );
};

export default ResultBox;
