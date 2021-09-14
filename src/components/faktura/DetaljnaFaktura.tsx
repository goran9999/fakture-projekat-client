import Faktura, { StatusFakture } from "../../models/faktura";
import StavkaFakture from "../../models/stavkaFakture";
import { formatirajCenu, formatirajDatum, kapitalizujPrvoSlovo } from "../../utils/utils";
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
        stavkeFakture.forEach(s => (
            zbir += s.kolicina * s.proizvod.osnovnaCena + s.kolicina * s.proizvod.osnovnaCena * s.proizvod.pdv / 100
        ))

        return zbir;

    }

    return (
        <div className={styles.faktura}>
            <div className={styles.komitenti}>
                <div className={styles['izdavac']}>
                    <div className={styles.zaglavlje}>
                        <h3>Broj fakture {props.faktura.broj}</h3>
                    </div>
                    <h2>{props.faktura.izdavac.naziv}</h2>
                    <p><b>Maticni broj: </b>{props.faktura.izdavac.maticniBroj}</p>
                    <p><b>PIB: </b>{props.faktura.izdavac.pib}</p>
                    <p><b>Grad: </b>{props.faktura.izdavac.adresa.postBroj} {props.faktura.izdavac.adresa.grad}</p>
                    <p><b>Ulica: </b>{props.faktura.izdavac.adresa.ulica} {props.faktura.izdavac.adresa.brUlice}</p>
                    <p><b>Broj telefona: </b>{props.faktura.izdavac.telefon}</p>

                </div>
                <div className={styles.detalji}>
                    <h2>Detalji</h2>
                    <p><b>Mesto izdavanja:</b> {props.faktura.mestoIzdavanja.grad}</p>
                    <p><b>Datum izdavanja:</b> {formatirajDatum(new Date(props.faktura.datumIzdavanja.toString()))} </p>
                    <p><b>Rok placanja:</b> {formatirajDatum(new Date(props.faktura.rokPlacanja.toString()))}</p>
                    <p><b>Valuta placanja:</b> {kapitalizujPrvoSlovo(props.faktura.valutaPlacanja)}</p>
                </div>
            </div>
            <div className={styles.kupac}>
                <h2>Kupac</h2>
                <h3>{props.faktura.kupac.naziv}</h3>
                <p><b>Maticni broj: </b> {props.faktura.kupac.maticniBroj}</p>
                {props.faktura.kupac.pib && <p><b>PIB: </b>{props.faktura.kupac.pib}</p>}
                <p><b>Grad: </b>{props.faktura.kupac.adresa.postBroj} {props.faktura.kupac.adresa.grad}</p>
                <p><b>Ulica: </b> {props.faktura.kupac.adresa.ulica} {props.faktura.kupac.adresa.brUlice}</p>
                <p><b>Broj telefona: </b> {props.faktura.kupac.telefon}</p>
            </div>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Sifra</th>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th >Kolicina</th>
                        <th>Osnovna cena</th>
                        <th>PDV</th>
                        <th >Iznos PDV</th>
                        <th>Ukupna vrednost</th>
                    </tr>
                </thead>

                <tbody className={styles.stavke}>
                    {props.faktura.stavke.map((s) =>
                        <DodataStavkaItem
                            key={s.proizvod.sifra}
                            stavka={s}
                            omoguciIzmenu={false}
                            onIzmeniStavku={izmeniStavku}
                            onUkloniStavku={ukloniStavku}
                            valutaPlacanja={props.faktura.valutaPlacanja}
                        />
                    )}

                </tbody>

            </table>

            <footer className={styles.footer}>
                <button className={`${styles['btn-posalji']} ${props.faktura.status === StatusFakture.POSLATA ? styles.hidden : ''}`}>Posalji</button>
                <div className={styles.ukupno}>
                    <h4>Ukupno: {formatirajCenu(izracunajUkupanIznos(props.faktura.stavke), props.faktura.valutaPlacanja)}</h4>
                </div>
            </footer>
        </div>
    )
}
export default DetaljnaFaktura;