import React, { useRef, useState } from "react"
import AdresaModel from "../../models/adresa"
import { PravnoLice } from '../../models/entitet'
import Faktura, { StatusFakture } from "../../models/faktura"
import StavkaFakture from "../../models/stavkaFakture"
import Valuta from "../../models/valuta"
import Adresa from "./Adresa"
import DodataStavkaItem from "./DodataStavkaItem"
import { TipProizvoda } from "../../models/proizvod"
import DodavanjeStavke from "./DodavanjeStavke"


const NovaFakturaForma = () => {

    const [brojFakture, setBrojFakture] = useState('');
    const [stavka, setStavka] = useState({
        proizvod: {
            sifra: '',
            naziv: '',
            osnovnaCena: 0,
            pdv: 0,
            tip: TipProizvoda.PROIZVOD
        },
        kolicina: 0
    })
    const [izdavac, setIzdavac] = useState<PravnoLice>({
        pib: '',
        naziv: '',
        adresa: {
            postBroj: 0,
            grad: '',
            ulica: '',
            brUlice: ''
        },
        telefon: ''
    })

    const [kupac, setKupac] = useState<PravnoLice>({
        pib: '',
        naziv: '',
        adresa: {
            postBroj: 0,
            grad: '',
            ulica: '',
            brUlice: ''
        },
        telefon: ''
    })

    const [valutaPlacanja, setValutaPlacanja] = useState(Valuta.DINAR)
    const [statusFakture, setStatusFakture] = useState(StatusFakture.POSLATA)
    const [mestoIzdavanja, setMestoIzdavanja] = useState<AdresaModel>({
        postBroj: 0,
        grad: '',
        ulica: '',
        brUlice: ''
    })

    const [stavkeFakture, setStavkeFakture] = useState<StavkaFakture[]>([])

    const [prikaziUnosNoveStavke, setPrikaziUnosNoveStavke] = useState(false);

    // refs
    const datumIzdavanjaRef = useRef<HTMLInputElement>(null);
    const rokPlacanjaRef = useRef<HTMLInputElement>(null);

    const sacuvajFakturuHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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

            console.log('Faktura uspesno sacuvana')
            resetujFormu();
        } catch (e) {
            console.log(e)
        }
    }

    const resetujFormu = () => {
        setBrojFakture('');

        setIzdavac({
            pib: '',
            naziv: '',
            adresa: {
                postBroj: 0,
                grad: '',
                ulica: '',
                brUlice: ''
            },
            telefon: ''
        })

        setKupac({
            pib: '',
            naziv: '',
            adresa: {
                postBroj: 0,
                grad: '',
                ulica: '',
                brUlice: ''
            },
            telefon: ''
        })

        setValutaPlacanja(Valuta.DINAR)
        setStatusFakture(StatusFakture.POSLATA)

        setMestoIzdavanja({
            postBroj: 0,
            grad: '',
            ulica: '',
            brUlice: ''
        })

        setStavkeFakture([])
    }

    const promeniIzdavacaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imePolja = e.target.name
        const izmenjenIzdavac: PravnoLice = {
            ...izdavac,
            [imePolja]: e.target.value
        }
        setIzdavac(izmenjenIzdavac)
    }

    const promeniAdresuIzdavacaHandler = (adresa: AdresaModel) => {
        const izmenjenIzdavac: PravnoLice = {
            ...izdavac,
            adresa: adresa
        }
        setIzdavac(izmenjenIzdavac)
    }

    const promeniKupcaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imePolja = e.target.name
        const izmenjenKupac: PravnoLice = {
            ...kupac,
            [imePolja]: e.target.value
        }
        setKupac(izmenjenKupac)
    }

    const promeniAdresuKupcaHandler = (adresa: AdresaModel) => {
        const izmenjenKupac: PravnoLice = {
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
        setPrikaziUnosNoveStavke(false)
    }

    const ukloniStavku = (sifraProizvoda: string) => {
        setStavkeFakture(prevStavke => {
            return prevStavke.filter(s => s.proizvod.sifra !== sifraProizvoda)
        })
    }

    const izmeniStavku = (stavka: StavkaFakture) => {
        setStavka(stavka);
        setStavkeFakture(prevStavke => {
            return prevStavke.filter(s => s.proizvod.sifra !== stavka.proizvod.sifra);
        })
        setPrikaziUnosNoveStavke(true);
    }

    const dodajStavkuHandler = () => {
        setStavka({
            proizvod: {
                sifra: '',
                naziv: '',
                osnovnaCena: 0,
                pdv: 0,
                tip: TipProizvoda.PROIZVOD
            },
            kolicina: 0
        })
        setPrikaziUnosNoveStavke(true);
    }

    return (
        <form onSubmit={sacuvajFakturuHandler}>
            <h1>Izdavac</h1>
            <label htmlFor='pibIzdavaca'>PIB</label>
            <input value={izdavac.pib} onChange={promeniIzdavacaHandler} id='pibIzdavaca' name='pib' />
            <label htmlFor='nazivIzdavaca'>Naziv</label>
            <input value={izdavac.naziv} onChange={promeniIzdavacaHandler} id='nazivIzdavaca' name='naziv' />
            <Adresa onChange={promeniAdresuIzdavacaHandler} />
            <label htmlFor='telefonIzdavaca'>Telefon</label>
            <input value={izdavac.telefon} onChange={promeniIzdavacaHandler} id='telefonIzdavaca' name='telefon' />

            <h1>Kupac</h1>
            <label htmlFor='pibKupca'>PIB</label>
            <input value={kupac.pib} onChange={promeniKupcaHandler} id='pibKupca' name='pib' />
            <label htmlFor='nazivKupca'>Naziv</label>
            <input value={kupac.naziv} onChange={promeniKupcaHandler} id='nazivKupca' name='naziv' />
            <Adresa onChange={promeniAdresuKupcaHandler} />
            <label htmlFor='telefonKupca'>Telefon</label>
            <input value={kupac.telefon} onChange={promeniKupcaHandler} id='telefonKupca' name='telefon' />

            <h1>Unos stavki</h1>
            <table>
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
                            sifraProizvoda={s.proizvod.sifra}
                            nazivProizvoda={s.proizvod.naziv}
                            tipProizvoda={s.proizvod.tip}
                            osnovnaCenaProizvoda={s.proizvod.osnovnaCena}
                            pdvProizvoda={s.proizvod.pdv}
                            kolicina={s.kolicina}
                            onUkloniStavku={ukloniStavku}
                            onIzmeniStavku={izmeniStavku}
                        />
                    )}
                </tbody>
            </table>

            {prikaziUnosNoveStavke && <DodavanjeStavke stavka={stavka} onSacuvajStavku={dodajStavku} onOdustaniOdUnosa={() => setPrikaziUnosNoveStavke(false)} />}
            {!prikaziUnosNoveStavke && <button onClick={dodajStavkuHandler}>Dodaj novu stavku</button>}


            <h1>Dodatne informacije</h1>

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

            <button>Sacuvaj fakturu</button>
        </form>
    )
}

export default NovaFakturaForma
