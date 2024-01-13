import dynamic from "next/dynamic";
import React, { ReactNode } from "react";

const NoSsr = ({ children }: { children: ReactNode }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
