import StavkaFakture from '../../../models/stavkaFakture';
import Valuta from '../../../models/valuta';
import { formatirajCenu, izracunajUkupnuVrednostStavke, kapitalizujPrvoSlovo } from '../../../utils/utils';

import styles from './NovaFakturaForma.module.css'

interface Props {
    stavka: StavkaFakture,
    valutaPlacanja: Valuta,
    onUkloniStavku: (sifra: string) => void,
    onIzmeniStavku: (sifra: string) => void
    omoguciIzmenu: boolean
}

const DodataStavkaItem = (props: Props) => {

    const { sifra, naziv, tip, osnovnaCena, pdv } = props.stavka.proizvod;
    const { kolicina } = props.stavka

    const ukloniStavkuHandler = () => {
        props.onUkloniStavku(sifra);
    }

    const izmeniStavkuHandler = () => {
        props.onIzmeniStavku(sifra)
    }

    return (
        <tr>
            <td className={styles.td}>{sifra}</td>
            <td className={styles.td}>{naziv}</td>
            <td className={styles.td}>{kapitalizujPrvoSlovo(tip)}</td>
            <td className={styles.td}>{kolicina}</td>
            <td className={styles.td}>{formatirajCenu(osnovnaCena, props.valutaPlacanja)}</td>
            <td className={styles.td}>{pdv}</td>
            <td className={styles.td}>{osnovnaCena * pdv / 100}</td>
            <td className={styles.td}>{formatirajCenu(izracunajUkupnuVrednostStavke(props.stavka), props.valutaPlacanja)}</td>
            {props.omoguciIzmenu &&
                <>
                    <td className={styles.td}>
                        <button className={styles['btn-izmeni']} type='button' onClick={izmeniStavkuHandler}>Izmeni</button>
                    </td>
                    <td className={styles.td}>
                        <button className={styles['btn-ukloni']} type='button' onClick={ukloniStavkuHandler}>Ukloni</button>
                    </td>
                </>
            }
        </tr>
    )
}

export default DodataStavkaItem
