import React, { createContext, useContext } from "react";

const ScaleContext = createContext(1);

export function useScaleContext()
{
    return useContext(ScaleContext);
}

export function ScaleProvider({ scale, children }: { scale: number, children: React.ReactNode }) {
    return <>
        <ScaleContext.Provider value={scale}>
            {children}
        </ScaleContext.Provider>
    </>
}