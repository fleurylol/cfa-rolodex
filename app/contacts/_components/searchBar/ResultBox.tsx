import Link from "next/link";
import React from "react";

interface ResultBoxProps {
  id: number;
  name: string;
  business: string;
}

const ResultBox: React.FC<ResultBoxProps> = ({
  name,
  business,
  id,
}: ResultBoxProps) => {
  return (
    <>
      <div className="flex flex-col border-b-2 px-2 transition-colors last:border-b-0 hover:bg-slate-200">
        <Link href={`/contacts/${id}`}>
          <div className="font-bold">{name}</div>
          <div>{business}</div>
        </Link>
      </div>
    </>
  );
};

export default ResultBox;
