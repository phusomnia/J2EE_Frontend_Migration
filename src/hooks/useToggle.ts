import React from "react";

export function useToggle(initial: boolean = false): any {
    const [value, setValue] = React.useState(initial);
    const toggle = () => setValue(value => !value);
    return [value, toggle];
}