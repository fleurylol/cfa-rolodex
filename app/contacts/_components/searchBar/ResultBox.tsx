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
      <Link href={`/contacts/${id}`}>
        <div className="flex flex-col border-b-2 px-2 transition-colors last:border-b-0 hover:bg-slate-200">
          <div className="font-bold">{name}</div>
          <div>{business}</div>
        </div>
      </Link>
    </>
  );
};

export default ResultBox;
