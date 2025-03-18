import { useState } from "react";

export default function useToggle() {
    const [state, setOn] = useState(false);

    const toggle = () => {
        setOn((state) => !state);
    };

    return { state, toggle };
}