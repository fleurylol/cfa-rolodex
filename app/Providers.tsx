"use client";
import React from "react";
import { Next13ProgressBar } from "next13-progressbar";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NextUIProvider>
        {children}
        <Next13ProgressBar
          height="4px"
          color="white"
          showOnShallow
        />
      </NextUIProvider>
    </>
  );
};

export default Providers;
