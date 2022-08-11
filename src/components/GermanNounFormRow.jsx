import { useContext } from "react";
import { AppContext } from "../AppContext";

export const GermanNounFormRow = ({
    item,
    label,
    variable,
    isAdding,
    firstAddInput,
}) => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div className="row">
            <label>{label}</label>
            {!item.isEditing && !isAdding ? (
                <div className="value">{item[variable]}</div>
            ) : (
                <input
                    type="text"
                    value={item[variable]}
                    onChange={(e) =>
                        dispatch({
                            type: "changeItemRowValue",
                            payload: {
                                item,
                                property: variable,
                                value: e.target.value,
                            },
                        })
                    }
                    ref={firstAddInput}
                />
            )}
        </div>
    );
};
