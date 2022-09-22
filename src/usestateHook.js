import { useState } from 'react';

const useStateHook = (initialState = '') => {
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        setState(e.target.value);
    };

    const reset = () => {
        setState(initialState);
    };

    return [state, handleChange, reset, setState];
};

export default useStateHook;
