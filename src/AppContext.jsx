import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const initialState = {
    count: 0,
    germanNouns: ["nnn"],
};

function reducer(state, action) {
    const _state = { ...state };
    switch (action.type) {
        case "increaseCount":
            _state.count++;
            break;
        case "decreaseCount":
            _state.count--;
            break;
        case "loadGermanNouns":
            _state.germanNouns = action.payload;
            break;
    }
    return _state;
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            const _germanNouns = (
                await axios.get("http://localhost:4555/germanNouns")
            ).data;
            dispatch({ type: "loadGermanNouns", payload: _germanNouns });
        })();
    }, []);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
