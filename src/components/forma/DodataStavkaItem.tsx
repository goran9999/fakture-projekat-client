import React from 'react';
import StavkaFakture from '../../models/stavkaFakture';
import Valuta from '../../models/valuta';
import { formatirajCenu, kapitalizujPrvoSlovo } from '../../utils/utils';

import styles from './NovaFakturaForma.module.css'

interface Props {
    stavka: StavkaFakture,
    valutaPlacanja: Valuta,
    onUkloniStavku: (sifraProizvoda: string) => void,
    onIzmeniStavku: (sifraProizvoda: string) => void
    omoguciIzmenu: boolean
}

const DodataStavkaItem = (props: Props) => {

    const { sifra: sifraProizvoda, naziv: nazivProizvoda, tip: tipProizvoda, osnovnaCena: osnovnaCenaProizvoda, pdv: pdvProizvoda } = props.stavka.proizvod;
    const { kolicina } = props.stavka

    const ukloniStavkuHandler = () => {
        props.onUkloniStavku(sifraProizvoda);
    }

    const izmeniStavkuHandler = () => {
        props.onIzmeniStavku(sifraProizvoda)
    }

    return (
        <tr>
            <td className={styles.td}>{sifraProizvoda}</td>
            <td className={styles.td}>{nazivProizvoda}</td>
            <td className={styles.td}>{kapitalizujPrvoSlovo(tipProizvoda)}</td>
            <td className={styles.td}>{kolicina}</td>
            <td className={styles.td}>{formatirajCenu(osnovnaCenaProizvoda, props.valutaPlacanja)}</td>
            <td className={styles.td}>{pdvProizvoda}</td>
            <td className={styles.td}>{osnovnaCenaProizvoda * pdvProizvoda / 100}</td>
            <td className={styles.td}>{formatirajCenu((osnovnaCenaProizvoda + (osnovnaCenaProizvoda * pdvProizvoda) / 100) * kolicina, props.valutaPlacanja)}</td>
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
