import React from "react";
import { useHistory } from 'react-router-dom'
import { StatusFakture } from "../../models/faktura";
import Valuta from "../../models/valuta";
import { formatirajCenu, formatirajDatum, kapitalizujPrvoSlovo, vratiCssKlasuStatusaFakture } from "../../utils/utils";

import styles from './ListaFaktura.module.css'

interface Props {
    imeIzdavaca: string,
    broj: string,
    imeKupca: string,
    datumIzdavanja: Date
    ukupanIznos: number
    valutaPlacanja: Valuta
    status: StatusFakture
}

const FakturaItem = (props: Props) => {

    const history = useHistory();

    const vidiDetaljeHandler = () => {
        history.push(`/fakture/${props.broj}`)
    }

    return (
        <tr>
            <td className={styles.td}>#{props.broj}</td>
            <td className={styles.td}>{props.imeIzdavaca}</td>
            <td className={styles.td}>{props.imeKupca}</td>
            {/* neki bag sa typescript datumima pa je moralo ovako */}
            <td className={styles.td}>{formatirajDatum(new Date(props.datumIzdavanja.toString()))}</td>
            <td className={styles.td}>{formatirajCenu(props.ukupanIznos, props.valutaPlacanja)}</td>
            <td className={styles.td}>
                <span className={`${styles.status} ${styles[vratiCssKlasuStatusaFakture(props.status)]}`}>
                    {kapitalizujPrvoSlovo(props.status)}
                </span>
            </td>
            <td className={styles.td}><button className={styles['btn-detalji']} onClick={vidiDetaljeHandler}>Detalji</button></td>
            <td className={styles.td}><button className={styles['btn-detalji']} onClick={vidiDetaljeHandler}>Storniraj</button></td>
        </tr>
    )
}

export default FakturaItem;