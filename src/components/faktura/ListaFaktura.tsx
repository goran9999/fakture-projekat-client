import React from "react";
import Faktura from "../../models/faktura";
import FakturaItem from "./FakturaItem";

import styles from './ListaFaktura.module.css'
import { izracunajUkupnuVrednostFakture } from "../../utils/utils";

interface Props {
    fakture: Faktura[],
    onOmoguciFiltriranje: () => void,
}

const ListaFaktura = ({ fakture, onOmoguciFiltriranje }: Props) => {

    return (
        <div style={{ padding: '3rem 2rem' }}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Broj</th>
                        <th className={styles.th}>Izdavac</th>
                        <th className={styles.th}>Kupac</th>
                        <th className={styles.th}>Datum izdavanja</th>
                        <th className={styles.th}>Iznos</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>
                            <button
                                className={styles['btn-filter']}
                                onClick={onOmoguciFiltriranje}
                            >Filtriraj
                            </button>
                        </th>
                        <th className={styles.th}></th>
                    </tr>
                </thead>
                <tbody>
                    {fakture.map(f =>
                        <FakturaItem
                            key={f.broj}
                            broj={f.broj}
                            imeIzdavaca={f.izdavac.naziv}
                            imeKupca={f.kupac.naziv}
                            datumIzdavanja={f.datumIzdavanja}
                            valutaPlacanja={f.valutaPlacanja}
                            ukupanIznos={izracunajUkupnuVrednostFakture(f.stavke)}
                            status={f.status}
                        />
                    )}
                </tbody>

            </table>
            {fakture.length === 0 &&
                <p style={{ padding: '2rem 0', textAlign: 'center' }}>
                    Nijedna faktura ne zadovoljava postavljeni uslov
                </p>
            }
        </div>
    )

}
export default ListaFaktura;