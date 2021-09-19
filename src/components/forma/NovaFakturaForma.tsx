import React, { useContext, useRef, useState } from "react"
import { useHistory } from "react-router"
import AdresaModel, { defaultAdresa } from "../../models/adresa"
import Faktura, { StatusFakture } from "../../models/faktura"
import StavkaFakture, { defaultStavkaFakture } from "../../models/stavkaFakture"
import Valuta from "../../models/valuta"
import Adresa from "./Adresa"
import DodataStavkaItem from "./DodataStavkaItem"
import DodavanjeStavke from "./DodavanjeStavke"
import Komitent, { defaultKomitent } from "../../models/komitent"
import useValidation from '../hooks/use-validation'
import styles from './NovaFakturaForma.module.css'
import Modal from "../../UI/Modal"
import IzmenaDodateStavke from "./IzmenaDodateStavke"
import { vratiSkraceniNazivValute } from "../../utils/utils"
import { FakturaContext } from "../../store/faktura-context"


const NovaFakturaForma = () => {

    const history = useHistory()
    const fakturaContext = useContext(FakturaContext);

    const brojFakture = useState('')[0];

    const [izdavac, setIzdavac] = useState(defaultKomitent)

    const [pravnoLice, setPravnoLice] = useState(true);
    const [kupac, setKupac] = useState(defaultKomitent)

    const [valutaPlacanja, setValutaPlacanja] = useState(Valuta.DINAR)
    const [mestoIzdavanja, setMestoIzdavanja] = useState(defaultAdresa)

    const [stavkeFakture, setStavkeFakture] = useState<StavkaFakture[]>([])
    const [prikaziModalZaUnosStavke, setPrikaziModalZaUnosStavke] = useState(false)
    const [prikaziModalZaIzmenuStavke, setPrikaziModalZaIzmenuStavke] = useState(false)
    const [prikaziModalZaSlanjeMaila, setPrikaziModalZaSlanjeMaila] = useState(false)

    let formaValidna = false;

    //Validacija izdavaca

    const { upisanaVrednost: pib, imaGreske: pibPogresan, vrednostValidna: pibValidan,
        vrednostPromenjena: promeniPib, fokusUklonjen: onBlurPib } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: maticniBroj, imaGreske: maticniBrojPogresan, vrednostValidna: maticniBrojValidan,
        vrednostPromenjena: promeniMaticniBroj, fokusUklonjen: onBlurMaticniBroj } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: naziv, imaGreske: nazivPogresan, vrednostValidna: nazivValidan,
        vrednostPromenjena: promeniNaziv, fokusUklonjen: onBlurNaziv } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: email, imaGreske: emailPogresan, vrednostValidna: emailValidan,
        vrednostPromenjena: promeniEmail, fokusUklonjen: onBlurEmail } =
        useValidation(value => value.trim().length !== 0 && value.includes('@') && value.endsWith('.com'));

    const { upisanaVrednost: telefon, imaGreske: telefonPogresan, vrednostValidna: telefonValidan,
        vrednostPromenjena: promeniTelefon, fokusUklonjen: onBlurTelefon } =
        useValidation(value => value.trim().length !== 0 && value.startsWith('+'));

    //Validacija kupca

    const { upisanaVrednost: pibKupca, imaGreske: pibKupcaPogresan, vrednostValidna: pibKupcaValidan,
        vrednostPromenjena: promeniPibKupca, fokusUklonjen: onBlurPibKupca } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: maticniBrojKupca, imaGreske: maticniBrojKupcaKupcaPogresan, vrednostValidna: maticniBrojKupcaValidan,
        vrednostPromenjena: promeniMaticniBrojKupca, fokusUklonjen: onBlurMaticniBrojKupca } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: nazivKupca, imaGreske: nazivKupcaPogresan, vrednostValidna: nazivKupcaValidan,
        vrednostPromenjena: promeniNazivKupca, fokusUklonjen: onBlurNazivKupca } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: emailKupca, imaGreske: emailKupcaPogresan, vrednostValidna: emailKupcaValidan,
        vrednostPromenjena: promeniEmailKupca, fokusUklonjen: onBlurEmailKupca } =
        useValidation(value => value.trim().length !== 0 && value.includes('@') && value.endsWith('.com'));

    const { upisanaVrednost: telefonKupca, imaGreske: telefonKupcaPogresan, vrednostValidna: telefonKupcaValidan,
        vrednostPromenjena: promeniTelefonKupca, fokusUklonjen: onBlurTelefonKupca } =
        useValidation(value => value.trim().length !== 0 && value.startsWith('+'));




    // po defaultu je stavkaZaIzmenu prva stavka u nizu da se kompajler ne bi bunio, 
    // ali klikom na izmenu neke stavke ce se promeniti ovo stanje
    const [stavkaZaIzmenu, setStavkaZaIzmenu] = useState(defaultStavkaFakture);

    //stateovi za validaciju
    const [datumIzdavanjaUpisan, setDatumIzdavanjaUpisan] = useState(false);

    // refs
    const datumIzdavanjaRef = useRef<HTMLInputElement>(null);




    //Validacija opstih informacija

    const { upisanaVrednost: broj, imaGreske: brojPogresan, vrednostValidna: brojValidan,
        vrednostPromenjena: promeniBroj, fokusUklonjen: onBlurBroj } =
        useValidation(value => value.trim().length !== 0);

    const { upisanaVrednost: rok, imaGreske: rokPogresan, vrednostValidna: rokValidan,
        vrednostPromenjena: promeniRokPlacanja, fokusUklonjen: onBlurRokPlacanja } =
        useValidation(value => new Date() <= new Date(value) && new Date(value) >= new Date(datumIzdavanjaRef.current!.value));



    const sacuvajFakturuHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {

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
            rokPlacanja: new Date(rok),
            status: e.currentTarget.id === 'posalji' ? StatusFakture.POSLATA : StatusFakture.PRIPREMA,
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

            fakturaContext.dodajFakturu(faktura)
            history.replace('/')
        } catch (e) {
            console.log(e)
        }
    }

    const promeniIzdavacaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imePolja = e.target.name;
        if (imePolja === 'maticniBroj') {
            promeniMaticniBroj(e.target.value);
        }
        if (imePolja === 'pib') {
            promeniPib(e.target.value);
        }
        if (imePolja === 'naziv') {
            promeniNaziv(e.target.value);
        }
        if (imePolja === 'email') {
            promeniEmail(e.target.value);
        }
        if (imePolja === 'telefon') {
            promeniTelefon(e.target.value)
        }
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
        if (imePolja === 'maticniBroj') {
            promeniMaticniBrojKupca(e.target.value);
        }
        if (imePolja === 'pib') {
            promeniPibKupca(e.target.value);
        }
        if (imePolja === 'naziv') {
            promeniNazivKupca(e.target.value);
        }
        if (imePolja === 'email') {
            promeniEmailKupca(e.target.value);
        }
        if (imePolja === 'telefon') {
            promeniTelefonKupca(e.target.value);
        }
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
        promeniBroj(e.target.value);
    }

    const promeniMestoIzdavanjaHandler = (mesto: AdresaModel) => {
        setMestoIzdavanja(mesto);
    }

    const promeniValutuPlacanjaHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValutaPlacanja(e.target.value as Valuta)
    }

    const promeniDatumIzdavanjaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        datumIzdavanjaRef.current!.value = e.target.value
        setDatumIzdavanjaUpisan(true);
    }

    const promeniRokPlacanjaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        //rokPlacanjaRef.current!.value = e.target.value
        promeniRokPlacanja(e.target.value);
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



    if (nazivValidan && nazivKupcaValidan && maticniBrojValidan && maticniBrojKupcaValidan && emailValidan && emailKupcaValidan
        && pibValidan && pibKupcaValidan && telefonValidan && telefonKupcaValidan && rokValidan && brojValidan) {
        formaValidna = true;
    }


    return (
        <form className={styles.forma}>

            <h2>Izdavac</h2>
            <div className={styles['izdavac-wrapper']}>

                <div className={styles['form-element']}>
                    <label htmlFor='maticniBrojIzdavaca'>Maticni broj *</label>
                    <input onBlur={onBlurMaticniBroj} value={maticniBroj} onChange={promeniIzdavacaHandler} id='maticniBrojIzdavaca' name='maticniBroj' />
                    {maticniBrojPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Maticni broj ne moze biti prazan!</p>}
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='pibIzdavaca'>PIB *</label>
                    <input value={pib} onBlur={onBlurPib} onChange={promeniIzdavacaHandler} id='pibIzdavaca' name='pib' />
                    {pibPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Pib ne moze biti prazan!</p>}
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='nazivIzdavaca'>Naziv *</label>
                    <input onBlur={onBlurNaziv} value={naziv} onChange={promeniIzdavacaHandler} id='nazivIzdavaca' name='naziv' />
                    {nazivPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Naziv ne moze biti prazan!</p>}
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='emailIzdavaca'>E-mail *</label>
                    <input onBlur={onBlurEmail} value={email} onChange={promeniIzdavacaHandler} id='emailIzdavaca' name='email' />
                    {emailPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Email nije validan!</p>}
                </div>
                <div className={styles['form-element']}>
                    <label htmlFor='telefonIzdavaca'>Telefon *</label>
                    <input onBlur={onBlurTelefon} value={telefon} onChange={promeniIzdavacaHandler} id='telefonIzdavaca' name='telefon' />
                    {telefonPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Broj telefona nije validan!</p>}
                </div>

                <Adresa onChange={promeniAdresuIzdavacaHandler} obaveznaPolja={true} />

            </div>


            <h2>Opste informacije</h2>
            <div className={styles['info-wrapper']}>
                <div className={styles['form-element']}>
                    <label htmlFor={brojFakture}>Broj fakture *</label>
                    <input id='brojFakture' onBlur={onBlurBroj} value={broj} onChange={promeniBrojFaktureHandler} />
                    {brojPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Broj fakture nije validan!</p>}
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
                    <input type='date' disabled={!datumIzdavanjaUpisan} onBlur={onBlurRokPlacanja} value={rok} onChange={promeniRokPlacanjaHandler} />
                    {rokPogresan && <p style={{ color: 'red' }}>Rok nije validan!</p>}
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
                    <input onBlur={onBlurMaticniBrojKupca} value={maticniBrojKupca} onChange={promeniKupcaHandler} id='maticniBrojKupca' name='maticniBroj' />
                    {maticniBrojKupcaKupcaPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Maticni broj je obavezan!</p>}
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='pibKupca' style={{ color: !pravnoLice ? '#DEDEDE' : '' }}>PIB *</label>
                    <input onBlur={onBlurPibKupca} disabled={!pravnoLice} value={pibKupca} onChange={promeniKupcaHandler} id='pibKupca' name='pib' />
                    {pravnoLice && pibKupcaPogresan && <p style={{ color: 'red', marginTop: '10px' }}>PIB je obavezan!</p>}
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='nazivKupca'>{pravnoLice ? 'Naziv' : 'Ime i prezime'} *</label>
                    <input onBlur={onBlurNazivKupca} value={nazivKupca} onChange={promeniKupcaHandler} id='nazivKupca' name='naziv' />
                    {nazivKupcaPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Naziv je obavezan!</p>}
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='emailKupca'>E-mail *</label>
                    <input onBlur={onBlurEmailKupca} value={emailKupca} onChange={promeniKupcaHandler} id='emailKupca' name='email' />
                    {emailKupcaPogresan && <p style={{ color: 'red', marginTop: '10px' }}>E-mail je obavezan!</p>}
                </div>

                <div className={styles['form-element']}>
                    <label htmlFor='telefonKupca'>Telefon *</label>
                    <input onBlur={onBlurTelefonKupca} value={telefonKupca} onChange={promeniKupcaHandler} id='telefonKupca' name='telefon' />
                    {telefonKupcaPogresan && <p style={{ color: 'red', marginTop: '10px' }}>Broj telefona je obavezan!</p>}
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

            {prikaziModalZaSlanjeMaila &&
                <Modal onZatvori={() => setPrikaziModalZaSlanjeMaila(false)}>
                    <div style={{ textAlign: 'center', margin: '1rem' }}>
                        <p style={{ width: '60%', margin: '1rem auto' }}>Da li zelite ujedno da posaljete fakturu na mail <strong>{kupac.email}</strong>?</p>
                        <button className={styles['btn-sacuvaj-stavku']} id='posalji' onClick={sacuvajFakturuHandler}>Posalji</button>
                        <button className={styles['btn-sacuvaj-stavku']} id='priprema' onClick={sacuvajFakturuHandler}>Nemoj</button>
                    </div>

                </Modal>
            }

            <div className={styles['potvrdi-formu-wrapper']}>
                <button disabled={!formaValidna} onClick={() => { setPrikaziModalZaSlanjeMaila(true) }} type='button'>Sacuvaj fakturu</button>
            </div>

        </form>
    )
}

export default NovaFakturaForma
