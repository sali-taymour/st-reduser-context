import { useContext } from "react";
import { AppContext } from "./AppContext";
import "./App.scss";

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
            <p>There are {state.germanNouns.length} nouns.</p>
            <div className="germanNounArea">
                {state.germanNouns.map((item) => {
                    return (
                        <fieldset className="germanNoun" key={item.id}>
                            <legend>ID: {item.id}</legend>

                            <div className="row">
                                <label>Article</label>
                                <div className="value">{item.article}</div>
                            </div>

                            <div className="row">
                                <label>Singular</label>
                                <div className="value">{item.singular}</div>
                            </div>

                            <div className="row">
                                <label>Plural</label>
                                <div className="value">{item.plural}</div>
                            </div>
                        </fieldset>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
