import React from "react";
import {useHistory} from 'react-router-dom'
import { StatusFakture } from "../../models/faktura";

interface Props {
    imeIzdavaca: string,
    broj: string,
    imeKupca: string,
    ukupanIznos: number
    status: StatusFakture
}

const FakturaItem = (props: Props) => {

    const history = useHistory();

    const vidiDetaljeHandler = () => {
        history.push(`/fakture/${props.broj}`)
    }

    return (
        <tr>
            <td>{props.broj}</td>
            <td>{props.imeIzdavaca}</td>
            <td>{props.imeKupca}</td>
            <td>{props.ukupanIznos}</td>
            <td>{props.status}</td>
            <td><button onClick={vidiDetaljeHandler}>Detalji</button></td>
        </tr>
    )

}
export default FakturaItem;