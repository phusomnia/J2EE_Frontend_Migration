import React, { createContext, useContext } from "react";

const ColorContext = createContext("#000000ff");

export const useColorContext = () => useContext(ColorContext);

export function ColorProvider({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <ColorContext.Provider value={color}>{children}</ColorContext.Provider>
    </>
  );
}
