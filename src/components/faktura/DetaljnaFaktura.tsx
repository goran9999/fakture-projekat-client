import Faktura from "../../models/faktura";
import StavkaFakture from "../../models/stavkaFakture";
import { formatirajCenu, formatirajDatum } from "../../utils/utils";
import DodataStavkaItem from "../forma/DodataStavkaItem";
import styles from './DetaljnaFaktura.module.css'

interface Props {
    faktura: Faktura
}

const DetaljnaFaktura = (props: Props) => {

    const izmeniStavku = () => { }

    const ukloniStavku = () => { }

    const izracunajUkupanIznos = (stavkeFakture: StavkaFakture[]) => {
        let zbir = 0;
        stavkeFakture.forEach(stavka => zbir += stavka.proizvod.osnovnaCena + (stavka.proizvod.osnovnaCena * stavka.proizvod.pdv));

        return zbir;

    }

    return (
        <div className={styles.faktura}>
            <div className={styles.komitenti}>
                <div className={styles['izdavac']}>
                    <h3>Broj fakture {props.faktura.broj}</h3>
                    <h1>{props.faktura.izdavac.naziv}</h1>
                    <p>{props.faktura.izdavac.adresa.ulica}</p>
                    <p>{props.faktura.izdavac.adresa.grad}</p>
                    <p>{props.faktura.izdavac.adresa.postBroj}</p>
                    <p>{props.faktura.izdavac.telefon}</p>

                </div>
                <div className={styles.detalji}>
                    <h2>Detalji</h2>
                    <h4>Mesto izdavanja</h4>
                    <p>{props.faktura.mestoIzdavanja.grad}</p>
                    <h4>Datum izdavanja</h4>
                    <p>{formatirajDatum(new Date(props.faktura.datumIzdavanja.toString()))}</p>
                    <h4>Rok placanja</h4>
                    <p>{formatirajDatum(new Date(props.faktura.rokPlacanja.toString()))}</p>
                </div>
            </div>
            <div className={styles.kupac}>
                <h2>Kupac</h2>
                <h3>{props.faktura.kupac.naziv}</h3>
                <p>{props.faktura.kupac.adresa.ulica}</p>
                <p>{props.faktura.kupac.adresa.grad}</p>
                <p>{props.faktura.kupac.adresa.postBroj}</p>
                <p>{props.faktura.kupac.telefon}</p>
            </div>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Sifra</th>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th>Kolicina</th>
                        <th>Osnovna cena</th>
                        <th>PDV %</th>
                        <th>Iznos PDV</th>
                        <th>Ukupna vrednost</th>
                    </tr>
                </thead>

                <tbody className={styles.stavke}>
                    {props.faktura.stavke.map((s) =>
                        <DodataStavkaItem
                            key={s.proizvod.sifra}
                            stavka={s}
                            valutaPlacanja={props.faktura.valutaPlacanja}
                            omoguciIzmenu={false}
                            onIzmeniStavku={izmeniStavku}
                            onUkloniStavku={ukloniStavku}
                        />
                    )}
                </tbody>

            </table>

            <h2 className={styles.ukupno}>Ukupno: {formatirajCenu(izracunajUkupanIznos(props.faktura.stavke), props.faktura.valutaPlacanja)}</h2>
        </div>
    )
}
export default DetaljnaFaktura;