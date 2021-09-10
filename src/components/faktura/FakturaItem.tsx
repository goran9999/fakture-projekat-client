import React from "react";
import Card from "../UI/Card";
interface Props{
    imeIzdavaca:string,
    broj:string,
    imeKupca:string,
    ukupanIznos:number
}
const FakturaItem =(props:Props)=>{

    return <li>
        <p>{props.broj}</p>
        <span>
            <p>{props.imeIzdavaca}</p>
            <p>{props.imeKupca}</p>
        </span>
        <p>Ukupan iznos:{props.ukupanIznos}</p>
        <button>Detalji</button>
        <button>Izmeni</button>
    </li>

}
export default FakturaItem;