import { useContext } from "react";
import { AppContext } from "../AppContext";
import { GermanNounFormRow } from "./GermanNounFormRow";

export const ItemAddBox = () => {
    const { state, dispatch, firstAddInput } = useContext(AppContext);

    const item = state.addItem;

    return (
        <>
            {state.isAdding && (
                <fieldset className="germanNoun addItem">
                    <legend>Add New Item</legend>
                    <GermanNounFormRow
                        item={item}
                        label="Article"
                        variable="article"
                        isAdding={true}
                        firstAddInput={firstAddInput}
                    />

                    <GermanNounFormRow
                        item={item}
                        label="Singular"
                        variable="singular"
                        isAdding={true}
                    />

                    <GermanNounFormRow
                        item={item}
                        label="Plural"
                        variable="plural"
                        isAdding={true}
                    />

                    <div className="buttonRow">
                        <div className="message">{item.message}</div>

                        <div className="buttonArea">
                            <button
                                onClick={() =>
                                    dispatch({ type: "clearAddBox" })
                                }
                            >
                                Clear
                            </button>
                            <button
                                onClick={() =>
                                    dispatch({
                                        type: "addItem",
                                        payload: { item },
                                    })
                                }
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </fieldset>
            )}
        </>
    );
};
