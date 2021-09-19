import Faktura, { StatusFakture } from "../../../models/faktura";
import { formatirajCenu, formatirajDatum, izracunajUkupnuVrednostFakture, kapitalizujPrvoSlovo } from "../../../utils/utils";
import DodataStavkaItem from "../../forme/novaFaktura/DodataStavkaItem";
import styles from './DetaljnaFaktura.module.css'

interface Props {
    faktura: Faktura
}

const DetaljnaFaktura = ({ faktura }: Props) => {

    const izmeniStavku = () => { }
    const ukloniStavku = () => { }

    return (
        <div className={styles.faktura}>
            <div className={styles.komitenti}>
                <div className={styles['izdavac']}>
                    <div className={styles.zaglavlje}>
                        <h3>Broj fakture {faktura.broj}</h3>
                    </div>
                    <h2>{faktura.izdavac.naziv}</h2>
                    <p><b>Maticni broj: </b>{faktura.izdavac.maticniBroj}</p>
                    <p><b>PIB: </b>{faktura.izdavac.pib}</p>
                    <p><b>Grad: </b>{faktura.izdavac.adresa.postBroj} {faktura.izdavac.adresa.grad}</p>
                    <p><b>Ulica: </b>{faktura.izdavac.adresa.ulica} {faktura.izdavac.adresa.brUlice}</p>
                    <p><b>Broj telefona: </b>{faktura.izdavac.telefon}</p>

                </div>
                <div className={styles.detalji}>
                    <h2>Detalji</h2>
                    <p><b>Mesto izdavanja:</b> {faktura.mestoIzdavanja.grad}</p>
                    <p><b>Datum izdavanja:</b> {formatirajDatum(new Date(faktura.datumIzdavanja.toString()))} </p>
                    <p><b>Rok placanja:</b> {formatirajDatum(new Date(faktura.rokPlacanja.toString()))}</p>
                    <p><b>Valuta placanja:</b> {kapitalizujPrvoSlovo(faktura.valutaPlacanja)}</p>
                </div>
            </div>
            <div className={styles.kupac}>
                <h2>Kupac</h2>
                <h3>{faktura.kupac.naziv}</h3>
                <p><b>Maticni broj: </b> {faktura.kupac.maticniBroj}</p>
                {faktura.kupac.pib && <p><b>PIB: </b>{faktura.kupac.pib}</p>}
                <p><b>Grad: </b>{faktura.kupac.adresa.postBroj} {faktura.kupac.adresa.grad}</p>
                <p><b>Ulica: </b> {faktura.kupac.adresa.ulica} {faktura.kupac.adresa.brUlice}</p>
                <p><b>Broj telefona: </b> {faktura.kupac.telefon}</p>
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
                    {faktura.stavke.map((s) =>
                        <DodataStavkaItem
                            key={s.proizvod.sifra}
                            stavka={s}
                            omoguciIzmenu={false}
                            onIzmeniStavku={izmeniStavku}
                            onUkloniStavku={ukloniStavku}
                            valutaPlacanja={faktura.valutaPlacanja}
                        />
                    )}

                </tbody>

            </table>

            <footer className={styles.footer}>
                <button className={`${styles['btn-posalji']} ${faktura.status === StatusFakture.POSLATA ? styles.hidden : ''}`}>Posalji</button>
                <div className={styles.ukupno}>
                    <h4>Ukupno: {formatirajCenu(izracunajUkupnuVrednostFakture(faktura.stavke), faktura.valutaPlacanja)}</h4>
                </div>
            </footer>
        </div>
    )
}
export default DetaljnaFaktura;