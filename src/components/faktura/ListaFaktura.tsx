import React from "react";
import Faktura from "../../models/faktura";
import FakturaItem from "./FakturaItem";
import StavkaFakture from "../../models/stavkaFakture";

import styles from './ListaFaktura.module.css'

interface Props {
    fakture: Faktura[]
}

const ListaFaktura = (props: Props) => {

    function izracunajUkupanIznos(stavke: StavkaFakture[]): number {
        let ukupanIznos = 0;

        stavke.forEach(stavka => {
            let ukupnaVrednostStavke = stavka.proizvod.osnovnaCena * stavka.kolicina;
            ukupanIznos += ukupnaVrednostStavke + (ukupnaVrednostStavke * stavka.proizvod.pdv / 100);
        })

        return ukupanIznos;
        // return stavke.reduce((total, stavka) => stavka.proizvod.osnovnaCena + ((stavka.proizvod.osnovnaCena * stavka.proizvod.pdv) / 100) * stavka.kolicina, 0)
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.th}>Broj</th>
                    <th className={styles.th}>Izdavac</th>
                    <th className={styles.th}>Kupac</th>
                    <th className={styles.th}>Datum izdavanja</th>
                    <th className={styles.th}>Iznos</th>
                    <th className={styles.th}>Status</th>
                    <th className={styles.th}></th>
                    <th className={styles.th}></th>
                </tr>
            </thead>
            <tbody>
                {props.fakture.map(f =>
                    <FakturaItem
                        key={f.broj}
                        broj={f.broj}
                        imeIzdavaca={f.izdavac.naziv}
                        imeKupca={f.kupac.naziv}
                        datumIzdavanja={f.datumIzdavanja}
                        ukupanIznos={izracunajUkupanIznos(f.stavke)}
                        status={f.status}
                    />
                )}
            </tbody>

        </table>
    )

}
export default ListaFaktura;