import Link from "next/link";
import React from "react";

interface ResultBoxProps {
  id: number;
  name: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({ name, id }: ResultBoxProps) => {
  return (
    <>
      <div className="flex flex-col border-b-2 px-2 transition-colors last:border-b-0 hover:bg-slate-200">
        <Link href={`/business/${id}`}>
          <div>{name}</div>
        </Link>
      </div>
    </>
  );
};

export default ResultBox;
