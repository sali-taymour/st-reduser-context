import { createContext, useReducer, useEffect, useRef } from "react";
import axios from "axios";

const baseUrl = "http://localhost:4555";

export const AppContext = createContext();

const initialState = {
    count: 0,
    germanNouns: [],
    isAdding: false,
    addItem: {
        article: "",
        singular: "",
        plural: "",
    },
};

function reducer(state, action) {
    const _state = { ...state };
    let item = null;
    let property = null;
    let value = null;
    let originalItem = null;
    let message = null;
    switch (action.type) {
        case "increaseCount":
            _state.count++;
            break;
        case "decreaseCount":
            _state.count--;
            break;
        case "loadGermanNouns":
            _state.germanNouns = action.payload.germanNouns;
            break;
        case "toggleEditStatus":
            item = action.payload.item;
            item.isEditing = !item.isEditing;
            item.message = item.isEditing ? "Editing item..." : "";
            break;
        case "changeItemRowValue":
            item = action.payload.item;
            property = action.payload.property;
            value = action.payload.value;
            item[property] = value;
            break;
        case "cancelEditStatus":
            item = action.payload.item;
            originalItem = item.originalItem;

            item.isEditing = false;
            item.message = "";
            item.article = originalItem.article;
            item.singular = originalItem.singular;
            item.plural = originalItem.plural;
            break;
        case "cancelDeleteStatus":
            item = action.payload.item;

            item.isDeleting = false;
            item.message = "";
            break;
        case "saveItem":
            item = action.payload.item;

            item.isEditing = false;
            item.isProcessing = false;
            item.message = "";
            break;
        case "handleFailedSave":
            item = action.payload.item;
            originalItem = item.originalItem;
            message = action.payload.message;

            item.isProcessing = false;
            item.message = message;
            break;
        case "askIfSureForDelete":
            item = action.payload.item;

            item.isDeleting = true;
            break;
        case "deleteItem":
            item = action.payload.item;

            _state.germanNouns = [
                ...state.germanNouns.filter((m) => m.id !== item.id),
            ];
            break;
        case "turnOnProcessingStatus":
            item = action.payload.item;

            item.isProcessing = true;
            break;
        case "turnAddingOn":
            _state.isAdding = true;
            break;
        case "clearAddBox":
            _state.isAdding = false;
            _state.addItem = {
                article: "",
                singular: "",
                plural: "",
            };
            break;
        case "addItem":
            item = action.payload.item;

            _state.germanNouns.push(item);
            _state.isAdding = false;
            _state.addItem = {
                article: "",
                singular: "",
                plural: "",
            };
            break;
    }
    return _state;
}

export const AppProvider = ({ children }) => {
    const [state, dispatchCore] = useReducer(reducer, initialState);

    const firstAddInput = useRef(null);

    useEffect(() => {
        (async () => {
            const _germanNouns = (await axios.get(`${baseUrl}/germanNouns`))
                .data;
            _germanNouns.forEach((item) => {
                item.isEditing = false;
                item.isDeleting = false;
                item.isProcessing = false;
                item.message = "";
                item.originalItem = { ...item };
            });
            dispatchCore({
                type: "loadGermanNouns",
                payload: { germanNouns: _germanNouns },
            });
        })();
    }, []);

    const dispatch = async (action) => {
        const item = action.payload?.item;
        let backendItem = {};
        if (item) {
            backendItem = {
                id: item.id,
                article: item.article,
                singular: item.singular,
                plural: item.plural,
            };
        }
        switch (action.type) {
            case "saveItem":
                dispatchCore({
                    type: "turnOnProcessingStatus",
                    payload: { item },
                });
                try {
                    const response = await axios.put(
                        `${baseUrl}/germanNouns/${item.id}`,
                        backendItem
                    );
                    if ([200, 201].includes(response.status)) {
                        dispatchCore(action);
                    } else {
                        dispatchCore({
                            type: "handleFailedSave",
                            payload: {
                                item,
                                message: `API Error: ${response.status}`,
                            },
                        });
                    }
                } catch (err) {
                    dispatchCore({
                        type: "handleFailedSave",
                        payload: { item, message: `Error: ${err.message}` },
                    });
                }
                break;
            case "deleteItem":
                dispatchCore({
                    type: "turnOnProcessingStatus",
                    payload: { item },
                });
                try {
                    const response = await axios.delete(
                        `${baseUrl}/germanNouns/${item.id}`
                    );
                    if ([200, 201].includes(response.status)) {
                        dispatchCore(action);
                    } else {
                        dispatchCore({
                            type: "handleFailedSave",
                            payload: {
                                item,
                                message: `API Error: ${response.status}`,
                            },
                        });
                    }
                } catch (err) {
                    dispatchCore({
                        type: "handleFailedSave",
                        payload: { item, message: `Error: ${err.message}` },
                    });
                }
                break;
            case "addItem":
                const addItem = {
                    article: item.article,
                    singular: item.singular,
                    plural: item.plural,
                };
                dispatchCore({
                    type: "turnOnProcessingStatus",
                    payload: { item: addItem },
                });
                try {
                    const response = await axios.post(
                        `${baseUrl}/germanNouns`,
                        addItem
                    );
                    if ([200, 201].includes(response.status)) {
                        dispatchCore({
                            type: "addItem",
                            payload: { item: response.data },
                        });
                    } else {
                        dispatchCore({
                            type: "handleFailedSave",
                            payload: {
                                item,
                                message: `API Error: ${response.status}`,
                            },
                        });
                    }
                } catch (err) {
                    dispatchCore({
                        type: "handleFailedSave",
                        payload: { item, message: `Error: ${err.message}` },
                    });
                }
                break;
            default:
                dispatchCore(action);
                break;
        }
    };

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                firstAddInput,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
