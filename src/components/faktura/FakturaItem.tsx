import React from "react";

interface Props {
    imeIzdavaca: string,
    broj: string,
    imeKupca: string,
    ukupanIznos: number
}

const FakturaItem = (props: Props) => {

    return (
        <li>
            <p>{props.broj}</p>
            <span>
                <p>{props.imeIzdavaca}</p>
                <p>{props.imeKupca}</p>
            </span>
            <p>Ukupan iznos:{props.ukupanIznos}</p>
            <button>Detalji</button>
        </li>
    )

}
export default FakturaItem;