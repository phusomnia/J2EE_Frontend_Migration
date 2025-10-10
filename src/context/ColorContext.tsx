import React, { createContext, useContext } from "react";

const ColorContext = createContext("#ef4444");

const useColorContext = () => useContext(ColorContext)

export function ColorProvider({ color, children }: { color: string, children: React.ReactNode }) {
    return <>
        <ColorContext.Provider value={color}>
            {children}
        </ColorContext.Provider>
    </>
}