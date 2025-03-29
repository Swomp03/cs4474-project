import { useState } from "react";

export default function useToggle(initialState = false) {
    const [state, setOn] = useState(initialState);

    const toggle = () => {
        setOn((state) => !state);
    };

    return { state, toggle };
}