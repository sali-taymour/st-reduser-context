export const ItemButtonArea = ({ item, dispatch }) => {
    return (
        <>
            <div className="buttonArea">
                {!item.isEditing && !item.isDeleting && (
                    <>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "toggleEditStatus",
                                    payload: { item },
                                })
                            }
                        >
                            Edit
                        </button>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "askIfSureForDelete",
                                    payload: { item },
                                })
                            }
                        >
                            Delete
                        </button>
                        <button>Add</button>
                    </>
                )}
                {item.isEditing && (
                    <>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "cancelEditStatus",
                                    payload: { item },
                                })
                            }
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "saveItem",
                                    payload: { item },
                                })
                            }
                        >
                            Save
                        </button>
                    </>
                )}
                {item.isDeleting && (
                    <>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "cancelDeleteStatus",
                                    payload: { item },
                                })
                            }
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() =>
                                dispatch({
                                    type: "deleteItem",
                                    payload: { item },
                                })
                            }
                        >
                            Yes, delete item!
                        </button>
                    </>
                )}
            </div>
        </>
    );
};
