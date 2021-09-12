import React, { useRef, useState } from "react"
import AdresaModel, { defaultAdresa } from "../../models/adresa"
import Faktura, { StatusFakture } from "../../models/faktura"
import StavkaFakture, { defaultStavkaFakture } from "../../models/stavkaFakture"
import Valuta from "../../models/valuta"
import Adresa from "./Adresa"
import DodataStavkaItem from "./DodataStavkaItem"
import DodavanjeStavke from "./DodavanjeStavke"
import Komitent, { defaultKomitent } from "../../models/komitent"

import styles from './NovaFakturaForma.module.css'
import Modal from "../../UI/Modal"
import IzmenaDodateStavke from "./IzmenaDodateStavke"
import { useHistory } from "react-router"

const NovaFakturaForma = () => {

    const history = useHistory()

    const [brojFakture, setBrojFakture] = useState('');

    const [izdavac, setIzdavac] = useState(defaultKomitent)

    const [pravnoLice, setPravnoLice] = useState(true);
    const [kupac, setKupac] = useState(defaultKomitent)

    const [valutaPlacanja, setValutaPlacanja] = useState(Valuta.DINAR)
    const [statusFakture, setStatusFakture] = useState(StatusFakture.POSLATA)
    const [mestoIzdavanja, setMestoIzdavanja] = useState(defaultAdresa)

    const [stavkeFakture, setStavkeFakture] = useState<StavkaFakture[]>([])
    const [prikaziModalZaUnosStavke, setPrikaziModalZaUnosStavke] = useState(false)
    const [prikaziModalZaIzmenuStavke, setPrikaziModalZaIzmenuStavke] = useState(false)


    // po defaultu je stavkaZaIzmenu prva stavka u nizu da se kompajler ne bi bunio, 
    // ali klikom na izmenu neke stavke ce se promeniti ovo stanje
    const [stavkaZaIzmenu, setStavkaZaIzmenu] = useState(defaultStavkaFakture);

    // refs
    const datumIzdavanjaRef = useRef<HTMLInputElement>(null);
    const rokPlacanjaRef = useRef<HTMLInputElement>(null);

    const sacuvajFakturuHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!pravnoLice) {
            kupac.pib = undefined;
        }
        const faktura: Faktura = {
            broj: brojFakture,
            izdavac: izdavac,
            kupac: kupac,
            mestoIzdavanja: mestoIzdavanja,
            valutaPlacanja: valutaPlacanja,
            datumIzdavanja: new Date(datumIzdavanjaRef.current!.value),
            rokPlacanja: new Date(rokPlacanjaRef.current!.value),
            status: statusFakture,
            stavke: stavkeFakture
        }

        console.log(faktura);

        try {
            const response = await fetch('http://localhost:5000/api/fakture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(faktura)
            })

            if (!response.ok) {
                throw new Error('Problem u cuvanju fakture.')
            }

            history.replace('/')
        } catch (e) {
            console.log(e)
        }
    }

    const promeniIzdavacaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imePolja = e.target.name
        const izmenjenIzdavac: Komitent = {
            ...izdavac,
            [imePolja]: e.target.value
        }
        setIzdavac(izmenjenIzdavac)
    }

    const promeniAdresuIzdavacaHandler = (adresa: AdresaModel) => {
        const izmenjenIzdavac: Komitent = {
            ...izdavac,
            adresa: adresa
        }
        setIzdavac(izmenjenIzdavac)
    }

    const promeniKupcaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imePolja = e.target.name
        const izmenjenKupac: Komitent = {
            ...kupac,
            [imePolja]: e.target.value
        }
        setKupac(izmenjenKupac)
    }

    const promeniAdresuKupcaHandler = (adresa: AdresaModel) => {
        const izmenjenKupac: Komitent = {
            ...kupac,
            adresa: adresa
        }
        setKupac(izmenjenKupac)
    }

    const promeniBrojFaktureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrojFakture(e.target.value)
    }

    const promeniMestoIzdavanjaHandler = (mesto: AdresaModel) => {
        setMestoIzdavanja(mesto);
    }

    const promeniValutuPlacanjaHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValutaPlacanja(e.target.value as Valuta)
    }

    const promeniStatusFaktureHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatusFakture(e.target.value as StatusFakture)
    }

    const promeniDatumIzdavanjaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        datumIzdavanjaRef.current!.value = e.target.value
    }

    const promeniRokPlacanjaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        rokPlacanjaRef.current!.value = e.target.value
    }

    const dodajStavku = (stavka: StavkaFakture) => {
        setStavkeFakture(prevStavke => {
            return [...prevStavke, stavka]
        })
        setPrikaziModalZaUnosStavke(false);
    }

    const ukloniStavku = (sifraProizvoda: string) => {
        setStavkeFakture(prevStavke => {
            return prevStavke.filter(s => s.proizvod.sifra !== sifraProizvoda)
        })
    }

    const izmeniStavku = (sifraProizvoda: string) => {
        const stavkaZaIzmenu = stavkeFakture.find(s => s.proizvod.sifra === sifraProizvoda);
        setStavkaZaIzmenu(stavkaZaIzmenu!);
        setPrikaziModalZaIzmenuStavke(true);
    }

    const odustaniOdIzmeneStavkeHandler = () => {
        setPrikaziModalZaIzmenuStavke(false);
        setStavkaZaIzmenu(defaultStavkaFakture)
    }

    const sacuvajIzmeneStavkeHandler = (izmenjenaStavka: StavkaFakture) => {
        // indeks stavke koju treba promeniti
        const indeks = stavkeFakture.findIndex(s => s.proizvod.sifra === stavkaZaIzmenu.proizvod.sifra)

        // kopiraj sve prethodne i samo izmeni stavku na tom indeksu
        const azuriraneStavke = [...stavkeFakture]
        azuriraneStavke[indeks] = izmenjenaStavka

        setStavkeFakture(azuriraneStavke)
        setPrikaziModalZaIzmenuStavke(false);
        setStavkaZaIzmenu(defaultStavkaFakture)
    }

    return (
        <form className={styles.forma} onSubmit={sacuvajFakturuHandler}>

            <div className={styles['komitenti-wrapper']}>
                <div>
                    <h1>Izdavac</h1>
                    <div className={styles['izdavac-wrapper']}>
                        <div>
                            <label htmlFor='pibIzdavaca'>PIB</label>
                            <input value={izdavac.pib} onChange={promeniIzdavacaHandler} id='pibIzdavaca' name='pib' />
                        </div>
                        <div>
                            <label htmlFor='maticniBrojIzdavaca'>Maticni broj</label>
                            <input value={izdavac.maticniBroj} onChange={promeniIzdavacaHandler} id='maticniBrojIzdavaca' name='maticniBroj' />
                        </div>
                        <div>
                            <label htmlFor='nazivIzdavaca'>Naziv</label>
                            <input value={izdavac.naziv} onChange={promeniIzdavacaHandler} id='nazivIzdavaca' name='naziv' />
                        </div>

                        <div>
                            <label htmlFor='telefonIzdavaca'>Telefon</label>
                            <input value={izdavac.telefon} onChange={promeniIzdavacaHandler} id='telefonIzdavaca' name='telefon' />
                        </div>

                        <Adresa onChange={promeniAdresuIzdavacaHandler} />

                    </div>

                </div>

                <div>
                    <h1>Kupac</h1>
                    <div className={styles['kupac-wrapper']}>
                        <div className={styles.radio}>
                            <label htmlFor='pravno'>Pravno lice</label>
                            <input type='radio' id='pravno' checked={pravnoLice} onChange={() => setPravnoLice(true)} />
                            <label htmlFor='fizicko'>Fizicko lice</label>
                            <input type='radio' id='fizicko' checked={!pravnoLice} onChange={() => setPravnoLice(false)} />
                        </div>


                        <div style={{ visibility: pravnoLice ? 'visible' : 'hidden' }}>
                            <label htmlFor='pibKupca'>PIB</label>
                            <input value={kupac.pib} onChange={promeniKupcaHandler} id='pibKupca' name='pib' />
                        </div>

                        <div>
                            <label htmlFor='maticniBrojKupca'>Maticni broj</label>
                            <input value={kupac.maticniBroj} onChange={promeniKupcaHandler} id='maticniBrojKupca' name='maticniBroj' />
                        </div>

                        <div>
                            <label htmlFor='nazivKupca'>Naziv</label>
                            <input value={kupac.naziv} onChange={promeniKupcaHandler} id='nazivKupca' name='naziv' />
                        </div>

                        <div>
                            <label htmlFor='telefonKupca'>Telefon</label>
                            <input value={kupac.telefon} onChange={promeniKupcaHandler} id='telefonKupca' name='telefon' />
                        </div>

                        <Adresa onChange={promeniAdresuKupcaHandler} />
                    </div>
                </div>
            </div>



            <div>

                <h1>Unos stavki</h1>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Sifra</th>
                            <th>Naziv</th>
                            <th>Tip</th>
                            <th>Kolicina</th>
                            <th>Osnovna cena</th>
                            <th>PDV</th>
                            <th>Iznos PDV</th>
                            <th>Ukupna vrednost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stavkeFakture.map(s =>
                            <DodataStavkaItem
                                key={s.proizvod.sifra}
                                stavka={s}
                                onUkloniStavku={ukloniStavku}
                                onIzmeniStavku={izmeniStavku}
                            />
                        )}
                    </tbody>
                </table>

                {prikaziModalZaIzmenuStavke &&
                    <Modal onZatvori={odustaniOdIzmeneStavkeHandler}>
                        <IzmenaDodateStavke
                            stavka={stavkaZaIzmenu}
                            onOdustaniOdIzmene={odustaniOdIzmeneStavkeHandler}
                            onSacuvajIzmene={sacuvajIzmeneStavkeHandler}
                        />
                    </Modal>
                }

                {prikaziModalZaUnosStavke ?
                    <Modal onZatvori={() => setPrikaziModalZaUnosStavke(false)}>
                        <DodavanjeStavke onSacuvajStavku={dodajStavku} onOdustaniOdUnosa={() => setPrikaziModalZaUnosStavke(false)} />
                    </Modal>
                    :
                    <button onClick={() => setPrikaziModalZaUnosStavke(true)}>Dodaj novu stavku</button>
                }

            </div>



            <div>

                <h1>Dodatne informacije</h1>

                <div className={styles['dodatne-info-wrapper']}>
                    <label htmlFor={brojFakture}>Broj fakture</label>
                    <input id='brojFakture' value={brojFakture} onChange={promeniBrojFaktureHandler} />

                    <h3>Mesto izdavanja</h3>
                    <Adresa onChange={promeniMestoIzdavanjaHandler} />

                    <label htmlFor='datumIzdavanja'>Datum izdavanja</label>
                    <input type='date' ref={datumIzdavanjaRef} onChange={promeniDatumIzdavanjaHandler} id='datumIzdavanja' />
                    <label htmlFor='rokPlacanja'>Rok placanja</label>
                    <input type='date' ref={rokPlacanjaRef} onChange={promeniRokPlacanjaHandler} />

                    <label htmlFor='valutaPlacanja'>Valuta placanja</label>
                    <select value={valutaPlacanja} onChange={promeniValutuPlacanjaHandler} id='valutaPlacanja' name='valutaPlacanja'>
                        <option value={Valuta.DINAR}>RSD</option>
                        <option value={Valuta.EVRO}>EUR</option>
                        <option value={Valuta.DOLAR}>USD</option>
                    </select>

                    <label htmlFor='statusFakture'>Status fakture</label>
                    <select value={statusFakture} onChange={promeniStatusFaktureHandler} id='statusFakture' name='statusFakture'>
                        <option value={StatusFakture.PLACENA}>Placena</option>
                        <option value={StatusFakture.POSLATA}>Poslata</option>
                        <option value={StatusFakture.PRIPREMA}>Priprema</option>
                    </select>

                </div>
            </div>



            <button>Sacuvaj fakturu</button>
        </form>
    )
}

export default NovaFakturaForma
