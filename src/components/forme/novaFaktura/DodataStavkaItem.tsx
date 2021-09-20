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
            <td>{sifra}</td>
            <td>{naziv}</td>
            <td>{kapitalizujPrvoSlovo(tip)}</td>
            <td>{kolicina}</td>
            <td>{formatirajCenu(osnovnaCena, props.valutaPlacanja)}</td>
            <td>{pdv}</td>
            <td>{osnovnaCena * pdv / 100}</td>
            <td>{formatirajCenu(izracunajUkupnuVrednostStavke(props.stavka), props.valutaPlacanja)}</td>
            {props.omoguciIzmenu &&
                <>
                    <td>
                        <button className={styles['btn-izmeni']} type='button' onClick={izmeniStavkuHandler}>Izmeni</button>
                    </td>
                    <td>
                        <button className={styles['btn-ukloni']} type='button' onClick={ukloniStavkuHandler}>Ukloni</button>
                    </td>
                </>
            }
        </tr>
    )
}

export default DodataStavkaItem
