import { ItemButtonArea } from "../components/ItemButtonArea";
import { GermanNounFormRow } from "../components/GermanNounFormRow";

export const ItemBox = ({ item }) => {
    return (
        <fieldset className="germanNoun editItem">
            <legend>ID: {item.id}</legend>

            <GermanNounFormRow item={item} label="Article" variable="article" />

            <GermanNounFormRow
                item={item}
                label="Singular"
                variable="singular"
            />

            <GermanNounFormRow item={item} label="Plural" variable="plural" />

            <div className="buttonRow">
                <div className="message">{item.message}</div>

                <ItemButtonArea item={item} />
            </div>
        </fieldset>
    );
};
