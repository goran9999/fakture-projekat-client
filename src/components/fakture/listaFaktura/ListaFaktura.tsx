import Faktura from "../../../models/faktura";
import FakturaItem from "../fakturaItem/FakturaItem";

import styles from './ListaFaktura.module.css'
import { izracunajUkupnuVrednostFakture } from "../../../utils/utils";
import { Link } from "react-router-dom";

interface Props {
    fakture: Faktura[],
    onOmoguciFiltriranje: () => void,
    primenjenFilter: string
}

const ListaFaktura = ({ fakture, onOmoguciFiltriranje, primenjenFilter }: Props) => {

    return (
        <div style={{ padding: '3rem 2rem', width: '100%' }}>
            <table>
                <thead>
                    <tr>
                        <th>Broj</th>
                        <th>Kupac</th>
                        <th>Datum izdavanja</th>
                        <th>Rok placanja</th>
                        <th>Iznos</th>
                        <th>Status</th>
                        <th>
                            <button
                                className={styles['btn-filter']}
                                onClick={onOmoguciFiltriranje}
                            >Filtriraj
                            </button>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {fakture.map(f =>
                        <FakturaItem
                            key={f.broj}
                            broj={f.broj}
                            imeKupca={f.kupac.naziv}
                            datumIzdavanja={f.datumIzdavanja}
                            rokPlacanja={f.rokPlacanja}
                            valutaPlacanja={f.valutaPlacanja}
                            ukupanIznos={izracunajUkupnuVrednostFakture(f.stavke)}
                            status={f.status}
                        />
                    )}
                </tbody>

            </table>
            {fakture.length === 0 &&
                <p style={{ padding: '2rem 0', textAlign: 'center' }}>
                    {primenjenFilter !== 'sve' ?
                        'Nijedna faktura ne zadovoljava postavljeni uslov' :
                        <>
                            <span>Nemate kreiranih faktura. </span>
                            <Link to='/dodaj-fakturu'>Napravite novu!</Link>
                        </>
                    }
                </p>
            }
        </div>
    )

}
export default ListaFaktura;