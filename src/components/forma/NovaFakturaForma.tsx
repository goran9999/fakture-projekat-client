import React, { useRef, useState } from "react"
import { useHistory } from "react-router"
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
import { vratiSkraceniNazivValute } from "../../utils/utils"


const NovaFakturaForma = () => {

    const history = useHistory()

    const [brojFakture, setBrojFakture] = useState('');

    const [izdavac, setIzdavac] = useState(defaultKomitent)

    const [pravnoLice, setPravnoLice] = useState(true);
    const [kupac, setKupac] = useState(defaultKomitent)

    const [valutaPlacanja, setValutaPlacanja] = useState(Valuta.DINAR)
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
            status: StatusFakture.PRIPREMA,
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

            <h2>Izdavac</h2>
            <div className={styles['izdavac-wrapper']}>

                <div className={styles['form-element']}>
                    <label htmlFor='maticniBrojIzdavaca'>Maticni broj *</label>
                    <input value={izdavac.maticniBroj} onChange={promeniIzdavacaHandler} id='maticniBrojIzdavaca' name='maticniBroj' />
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='pibIzdavaca'>PIB *</label>
                    <input value={izdavac.pib} onChange={promeniIzdavacaHandler} id='pibIzdavaca' name='pib' />
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='nazivIzdavaca'>Naziv *</label>
                    <input value={izdavac.naziv} onChange={promeniIzdavacaHandler} id='nazivIzdavaca' name='naziv' />
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='telefonIzdavaca'>Telefon *</label>
                    <input value={izdavac.telefon} onChange={promeniIzdavacaHandler} id='telefonIzdavaca' name='telefon' />
                </div>

                <Adresa onChange={promeniAdresuIzdavacaHandler} obaveznaPolja={true} />

            </div>


            <h2>Opste informacije</h2>
            <div className={styles['info-wrapper']}>

                <div className={styles['form-element']}>
                    <label htmlFor={brojFakture}>Broj fakture *</label>
                    <input id='brojFakture' value={brojFakture} onChange={promeniBrojFaktureHandler} />
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='valutaPlacanja' style={{ display: 'block' }}>Valuta *</label>
                    <select value={valutaPlacanja} onChange={promeniValutuPlacanjaHandler} id='valutaPlacanja' name='valutaPlacanja'>
                        <option value={Valuta.DINAR}>{vratiSkraceniNazivValute(Valuta.DINAR)}</option>
                        <option value={Valuta.EVRO}>{vratiSkraceniNazivValute(Valuta.EVRO)}</option>
                        <option value={Valuta.DOLAR}>{vratiSkraceniNazivValute(Valuta.DOLAR)}</option>
                    </select>
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='datumIzdavanja'>Datum izdavanja *</label>
                    <input type='date' ref={datumIzdavanjaRef} onChange={promeniDatumIzdavanjaHandler} id='datumIzdavanja' />
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='rokPlacanja'>Rok placanja *</label>
                    <input type='date' ref={rokPlacanjaRef} onChange={promeniRokPlacanjaHandler} />
                </div>

            </div>

            <h2>Mesto izdavanja</h2>
            <div className={styles['mesto-izdavanja-wrapper']}>
                <Adresa onChange={promeniMestoIzdavanjaHandler} obaveznaPolja={false} />
            </div>


            <h1>Kupac</h1>
            <div className={styles['kupac-wrapper']}>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <label htmlFor='pravno' style={{ marginRight: '10px' }}>Pravno lice</label>
                        <input type='radio' id='pravno' checked={pravnoLice} onChange={() => setPravnoLice(true)} />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor='fizicko' style={{ marginRight: '10px' }}>Fizicko lice</label>
                        <input type='radio' id='fizicko' checked={!pravnoLice} onChange={() => setPravnoLice(false)} />
                    </div>

                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='maticniBrojKupca'>Maticni broj *</label>
                    <input value={kupac.maticniBroj} onChange={promeniKupcaHandler} id='maticniBrojKupca' name='maticniBroj' />
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='pibKupca' style={{ color: !pravnoLice ? '#DEDEDE' : '' }}>PIB *</label>
                    <input disabled={!pravnoLice} value={kupac.pib} onChange={promeniKupcaHandler} id='pibKupca' name='pib' />
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='nazivKupca'>{pravnoLice ? 'Naziv' : 'Ime i prezime'} *</label>
                    <input value={kupac.naziv} onChange={promeniKupcaHandler} id='nazivKupca' name='naziv' />
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='telefonKupca'>Telefon *</label>
                    <input value={kupac.telefon} onChange={promeniKupcaHandler} id='telefonKupca' name='telefon' />
                </div>

                <Adresa onChange={promeniAdresuKupcaHandler} obaveznaPolja={true} />
            </div>


            <div>
                <h2>Stavke fakture</h2>
                <table className={styles['table']}>
                    <thead>
                        <tr>
                            <th className={styles.th}>Sifra</th>
                            <th className={styles.th}>Naziv</th>
                            <th className={styles.th}>Tip</th>
                            <th className={styles.th}>Kolicina</th>
                            <th className={styles.th}>Osnovna cena</th>
                            <th className={styles.th}>PDV %</th>
                            <th className={styles.th}>Iznos PDV</th>
                            <th className={styles.th}>Ukupna vrednost</th>
                            <th className={styles.th}></th>
                            <th className={styles.th}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stavkeFakture.map(s =>
                            <DodataStavkaItem
                                key={s.proizvod.sifra}
                                stavka={s}
                                valutaPlacanja={valutaPlacanja}
                                onUkloniStavku={ukloniStavku}
                                onIzmeniStavku={izmeniStavku}
                                omoguciIzmenu={true}
                            />
                        )}
                    </tbody>
                </table>
            </div>


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
                <div>
                    <button type='button' className={styles['btn-dodaj']} onClick={() => setPrikaziModalZaUnosStavke(true)}>Dodaj stavku</button>
                </div>
            }

            <div className={styles['potvrdi-formu-wrapper']}>
                <button>Sacuvaj fakturu</button>
            </div>

        </form>
    )
}

export default NovaFakturaForma
