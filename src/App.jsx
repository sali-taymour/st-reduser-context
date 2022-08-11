import { useContext } from "react";
import { AppContext } from "./AppContext";
import { GermanNounFormRow } from "./components/GermanNounFormRow";
import "./App.scss";
import { ItemButtonArea } from "./components/ItemButtonArea";

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
                        <fieldset className="germanNoun" key={String(item.id)}>
                            <legend>ID: {item.id}</legend>

                            <GermanNounFormRow
                                item={item}
                                label="Article"
                                variable="article"
                            />

                            <GermanNounFormRow
                                item={item}
                                label="Singular"
                                variable="singular"
                            />

                            <GermanNounFormRow
                                item={item}
                                label="Plural"
                                variable="plural"
                            />

                            <div className="buttonRow">
                                <div className="message">{item.message}</div>

                                <ItemButtonArea
                                    dispatch={dispatch}
                                    item={item}
                                />
                            </div>
                        </fieldset>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
