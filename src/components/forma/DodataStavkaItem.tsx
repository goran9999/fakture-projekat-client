import React from 'react';
import StavkaFakture from '../../models/stavkaFakture';

import styles from './NovaFakturaForma.module.css'

interface Props {
    stavka: StavkaFakture
    onUkloniStavku: (sifraProizvoda: string) => void,
    onIzmeniStavku: (sifraProizvoda: string) => void
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
            <td className={styles.td}>{tipProizvoda}</td>
            <td className={styles.td}>{kolicina}</td>
            <td className={styles.td}>{osnovnaCenaProizvoda}</td>
            <td className={styles.td}>{pdvProizvoda}</td>
            <td className={styles.td}>{osnovnaCenaProizvoda * pdvProizvoda / 100}</td>
            <td className={styles.td}>{(osnovnaCenaProizvoda + (osnovnaCenaProizvoda * pdvProizvoda) / 100) * kolicina}</td>
            <td className={styles.td}>
                <button className={styles['btn-izmeni']} type='button' onClick={izmeniStavkuHandler}>Izmeni</button>
            </td>
            <td className={styles.td}>
                <button className={styles['btn-ukloni']} type='button' onClick={ukloniStavkuHandler}>Ukloni</button>
            </td>
        </tr>
    )
}

export default DodataStavkaItem
