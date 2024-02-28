import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageBoxProps {
  link: string;
  img: string; //src={"/images/CateringComp.png"}
  name: string;
}

const PageBox: React.FC<PageBoxProps> = ({ link, img, name }) => {
  return (
    <Link href={link}>
      <Box className="max-w-auto rounded-md border">
        <Box className="m-5 flex flex-col items-center justify-center">
          <div className="mb-5 border">
            <Image
              src={img}
              alt=""
              width={332}
              height={332}
              loading={"lazy"}
            ></Image>
          </div>
          <Text>{name}</Text>
        </Box>
      </Box>
    </Link>
  );
};

export const pages = [
  {
    link: "https://fleurylol.github.io/CateringOCR/",
    img: "/images/CateringComp.png",
    name: "Catering Companion",
  },
  {
    link: "https://fleurylol.github.io/CherryValeMap/",
    img: "/images/MallLogo.png",
    name: "CherryVale Mall Parking Map",
  },
];

export default PageBox;
