"use client";
import { Box, Text } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";



const PageBox = () => {
  return (
    <Link href="https://www.radix-ui.com/themes/docs/components/card">
      <Box className="max-w-auto rounded-md border">
        <Box className="m-5 flex flex-col items-center justify-center">
          <div className="mb-5 border">
            <Image
              src={"/images/CateringComp.png"}
              alt=""
              width={332}
              height={332}
              loading={"lazy"}
            ></Image>
          </div>
          <Text>Catering Compantion</Text>
        </Box>
      </Box>
    </Link>
  );
};

export default PageBox;
