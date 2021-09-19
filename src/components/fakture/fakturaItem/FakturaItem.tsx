import { useHistory } from 'react-router-dom'
import { StatusFakture } from "../../../models/faktura";
import Valuta from "../../../models/valuta";
import { formatirajCenu, formatirajDatum, kapitalizujPrvoSlovo, vratiCssKlasuStatusaFakture } from "../../../utils/utils";

import styles from '../listaFaktura/ListaFaktura.module.css'

interface Props {
    broj: string,
    imeKupca: string,
    datumIzdavanja: Date
    rokPlacanja: Date
    ukupanIznos: number
    valutaPlacanja: Valuta
    status: StatusFakture
}

const FakturaItem = ({ broj, imeKupca, datumIzdavanja, rokPlacanja, valutaPlacanja, ukupanIznos, status }: Props) => {

    const history = useHistory();

    const vidiDetaljeHandler = () => {
        history.push(`/fakture/${broj}`)
    }

    return (
        <tr className={styles.tr}>
            <td className={styles.td}>#{broj}</td>
            <td className={styles.td}>{imeKupca}</td>
            {/* neki bag sa typescript datumima pa je moralo ovako */}
            <td className={styles.td}>{formatirajDatum(new Date(datumIzdavanja.toString()))}</td>
            <td className={styles.td}>{formatirajDatum(new Date(rokPlacanja.toString()))}</td>
            <td className={styles.td}>{formatirajCenu(ukupanIznos, valutaPlacanja)}</td>
            <td className={styles.td}>
                <span className={`${styles.status} ${styles[vratiCssKlasuStatusaFakture(status)]}`}>
                    {kapitalizujPrvoSlovo(status)}
                </span>
            </td>
            <td className={styles.td}><button className={styles['btn-detalji']} onClick={vidiDetaljeHandler}>Detalji</button></td>
            <td className={styles.td}><button className={styles['btn-detalji']} onClick={vidiDetaljeHandler}>Storniraj</button></td>
        </tr>
    )
}

export default FakturaItem;