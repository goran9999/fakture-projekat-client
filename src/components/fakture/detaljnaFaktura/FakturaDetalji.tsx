import Faktura from '../../../models/faktura'
import { formatirajCenu, formatirajDatum, izracunajUkupnuVrednostFakture, izracunajUkupnuVrednostStavke, kapitalizujPrvoSlovo } from '../../../utils/utils'

import styles from './FakturaDetalji.module.css'

interface Props {
    faktura: Faktura
}

const FakturaDetalji = ({ faktura }: Props) => {
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Faktura</h1>
            <div className={styles.zaglavlje}>
                <div>
                    <h2>Izdavac: {faktura.izdavac.naziv}</h2>
                    <p>Maticni broj: {faktura.izdavac.maticniBroj}</p>
                    <p>PIB: {faktura.izdavac.pib}</p>
                    <p>{faktura.izdavac.adresa.postBroj} {faktura.izdavac.adresa.grad}</p>
                    <p>{faktura.izdavac.adresa.ulica} {faktura.izdavac.adresa.brUlice}</p>
                    <p>Telefon: {faktura.izdavac.telefon}</p>
                    <p>Email: {faktura.izdavac.email}</p>
                </div>

                <div>
                    <p style={{ fontWeight: 'bold' }}>Broj fakture: {faktura.broj}</p>
                    <p>Datum izdavanja: {formatirajDatum(new Date(faktura.datumIzdavanja.toString()))}</p>
                    <p>Rok placanja: {formatirajDatum(new Date(faktura.rokPlacanja.toString()))}</p>
                    <p>Mesto izdavanja: {faktura.mestoIzdavanja.postBroj} {faktura.mestoIzdavanja.grad}</p>
                </div>
            </div>

            <div className={styles['kupac-wrapper']}>
                <h3>Naplati od:</h3>
                <p>Naziv: {faktura.kupac.naziv}</p>
                <p>Maticni broj: {faktura.kupac.maticniBroj}</p>
                {faktura.kupac.pib && <p>PIB: {faktura.kupac.pib}</p>}
                <p>{faktura.kupac.adresa.postBroj} {faktura.kupac.adresa.grad}</p>
                <p>{faktura.kupac.adresa.ulica} {faktura.kupac.adresa.brUlice}</p>
                <p>Telefon: {faktura.kupac.telefon}</p>
                <p>Email: {faktura.kupac.email}</p>
            </div>

            <div className={styles['stavke-wrapper']}>
                <table>
                    <thead>
                        <tr>
                            <th>Sifra</th>
                            <th>Naziv</th>
                            <th>Tip</th>
                            <th>Kolicina</th>
                            <th>Jed. cena</th>
                            <th>PDV %</th>
                            <th>Iznos PDV</th>
                            <th>Ukupna vrednost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faktura.stavke.map(s =>
                            <tr key={s.proizvod.sifra}>
                                <td>{s.proizvod.sifra}</td>
                                <td>{s.proizvod.naziv}</td>
                                <td>{kapitalizujPrvoSlovo(s.proizvod.tip)}</td>
                                <td>{s.kolicina}</td>
                                <td>{formatirajCenu(s.proizvod.osnovnaCena, faktura.valutaPlacanja)}</td>
                                <td>{s.proizvod.pdv}</td>
                                <td>{formatirajCenu(s.proizvod.pdv * s.proizvod.osnovnaCena / 100, faktura.valutaPlacanja)}</td>
                                <td>{izracunajUkupnuVrednostStavke(s)}</td>
                            </tr>
                        )}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><h4>Ukupan iznos:</h4></td>
                            <td><h4>{formatirajCenu(izracunajUkupnuVrednostFakture(faktura.stavke), faktura.valutaPlacanja)}</h4></td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </>
    )
}

export default FakturaDetalji
