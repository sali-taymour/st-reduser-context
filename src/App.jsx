import { useContext } from "react";
import { AppContext } from "./AppContext";
import "./App.scss";
import { ItemAddBox } from "./components/ItemAddBox";
import { ItemBox } from "./components/ItemBox";

function App() {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div className="App">
            <h1>Site with useContext/useReducer</h1>
            <p>test: {state.count}</p>
            <div className="countArea">
                <button onClick={() => dispatch({ type: "decreaseCount" })}>
                    -
                </button>
                <button onClick={() => dispatch({ type: "increaseCount" })}>
                    +
                </button>
            </div>
            <hr />
            <p className="infoMessage">
                There are {state.germanNouns.length} nouns.
            </p>
            <div className="germanNounArea">
                <ItemAddBox />
                {state.germanNouns.map((item) => {
                    return (
                        <ItemBox key={String(item.id)} item={item}></ItemBox>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
