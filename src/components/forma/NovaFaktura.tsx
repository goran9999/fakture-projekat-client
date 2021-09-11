import React, { useState, useRef } from "react";
import StavkaFaktureItem from "./StavkaFaktureItem";
import './NovaFaktura.css'
import AdresaModel from "../../models/adresa";
import StavkaFakture from "../../models/stavkaFakture";
import Entitet from "../../models/entitet";
import Faktura from "../../models/faktura";
import { StatusFakture } from "../../models/faktura";
import Valuta from '../../models/valuta'


const NovaFaktura = () => {

    const sacuvajStavkuHandler = (stavka: StavkaFakture) => {
        setPopunjeneStavke(prevStavke => {
            return prevStavke.concat(stavka);
        })
    }

    const [stavke, setStavke] = useState([<StavkaFaktureItem sacuvajStavku={sacuvajStavkuHandler} />]);
    const [popunjeneStavke, setPopunjeneStavke] = useState<StavkaFakture[]>([]);


    const [brojFakture, setBrojFakture] = useState('');

    const [pibIzdavaca, setPibIzdavaca] = useState('');
    const [nazivIzdavaca, setNazivIzdavaca] = useState('');
    const [adresaIzdavaca, setAdresaIzdavaca] = useState<AdresaModel>({
        ulica: '',
        grad: '',
        postBroj: 0,
        brUlice: ''
    })
    const [brTelefonaIzdavaca, setBrTelefonaIzdavaca] = useState('');


    const [mestoIzdavanja, setMestoIzdavanja] = useState<AdresaModel>({
        ulica: '',
        grad: '',
        postBroj: 0,
        brUlice: ''
    });

    const [datumIzdavanja, setDatumIzdavanja] = useState(new Date())

    const [pibKupca, setPibKupca] = useState('');
    const [imeKupca, setImeKupca] = useState('');
    const [adresaKupca, setAdresaKupca] = useState<AdresaModel>({
        ulica: '',
        grad: '',
        postBroj: 0,
        brUlice: ''
    })
    const [brTelefonaKupca, setBrTelefonaKupca] = useState('');

    const [rokPlacanja, setRokPlacanja] = useState(new Date());
    const [valuta, setValuta] = useState(Valuta.DINAR)
    const [status, setStatus] = useState(StatusFakture.PRIPREMA);
    const [ukupanIznos, setUkupanIznos] = useState(0);

    const datumIzdavanjaRef = useRef<HTMLInputElement>(null);
    const rokPlacanjaRef = useRef<HTMLInputElement>(null);


    const sacuvajFakturuHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const kupac: Entitet = {
            naziv: imeKupca,
            adresa: adresaKupca,
            telefon: brTelefonaKupca
        }

        const izdavac: Entitet = {
            naziv: nazivIzdavaca,
            adresa: adresaIzdavaca,
            telefon: brTelefonaIzdavaca
        }

        const faktura: Faktura = {
            broj: brojFakture,
            kupac: kupac,
            stavke: popunjeneStavke,
            izdavac: izdavac,
            datumIzdavanja: datumIzdavanja,
            status: status,
            valutaPlacanja: valuta,
            mestoIzdavanja: mestoIzdavanja,
            rokPlacanja: rokPlacanja
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
        } catch (e) {
            console.log(e)
        }

    }


    const dodajStavku = (event: React.FormEvent) => {
        event.preventDefault();
        const novaStavka = <StavkaFaktureItem sacuvajStavku={sacuvajStavkuHandler} />

        setStavke(prevStavke => {
            return prevStavke.concat(novaStavka)
        })
    }

    const promeniPibIzdavacaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPibIzdavaca(event.target.value)
    }

    const promeniNazivIzdavacaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNazivIzdavaca(event.target.value)
    }

    const promeniAdresuIzdavacaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nazivPolja = event.target.name;
        const promenjenaAdresaIzdavaca: AdresaModel = {
            ...adresaIzdavaca,
            [nazivPolja]: nazivPolja === 'postBroj' ? +event.target.value : event.target.value
        }
        setAdresaIzdavaca(promenjenaAdresaIzdavaca);
    }

    const promeniBrTelefonaIzdavacaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrTelefonaIzdavaca(event.target.value)
    }

    const promeniStatusHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value as StatusFakture);
    }

    const promeniValutuHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValuta(event.target.value as Valuta);
    }

    const promeniMestoIzdavanjaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nazivPolja = event.target.name;
        const promenjenoMestoIzdavanja: AdresaModel = {
            ...mestoIzdavanja,
            [nazivPolja]: nazivPolja === 'postBroj' ? +event.target.value : event.target.value
        }
        setMestoIzdavanja(promenjenoMestoIzdavanja);
    }

    const promeniRokPlacanjaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rokPlacanja = event.target.value;
        rokPlacanjaRef.current!.value = rokPlacanja;
        const rok = new Date(rokPlacanja);
        setRokPlacanja(rok);
    }

    const promeniDatumIzdavanjaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const datumIzdavanja = event.target.value;
        datumIzdavanjaRef.current!.value = datumIzdavanja;
        const datum = new Date(datumIzdavanja);
        setDatumIzdavanja(datum);
    }

    const promeniBrojFaktureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrojFakture(e.target.value)
    }

    const promeniPibKupcaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPibKupca(e.target.value)
    }

    const promeniImeKupcaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImeKupca(e.target.value)
    }

    const promeniAdresuKupcaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nazivPolja = event.target.name;
        const promenjenoMestoKupca: AdresaModel = {
            ...adresaKupca,
            [nazivPolja]: nazivPolja === 'postBroj' ? +event.target.value : event.target.value
        }
        setAdresaKupca(promenjenoMestoKupca);
    }

    const promeniBrTelefonaKupcaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrTelefonaKupca(event.target.value)
    }

    return (
        <form className='form' onSubmit={sacuvajFakturuHandler}>

            <label htmlFor='id'>Broj Fakture</label>
            <input value={brojFakture} onChange={promeniBrojFaktureHandler} id='id' />

            <label htmlFor='pibIzdavaca'>PIB</label>
            <input value={pibIzdavaca} onChange={promeniPibIzdavacaHandler} id='pibIzdavaca' />
            <label htmlFor='nazivIzdavaca' >Naziv izdavaca</label>
            <input value={nazivIzdavaca} onChange={promeniNazivIzdavacaHandler} id='nazivIzdavaca' />

            <label htmlFor='grad'>Grad</label>
            <input value={adresaIzdavaca.grad} onChange={promeniAdresuIzdavacaHandler} id='grad' name='grad' />
            <label htmlFor='postBroj'>Postanski Broj</label>
            <input value={adresaIzdavaca.postBroj} onChange={promeniAdresuIzdavacaHandler} id='Postanski' name='postBroj' />
            <label htmlFor='ulica'>Ulica</label>
            <input value={adresaIzdavaca.ulica} onChange={promeniAdresuIzdavacaHandler} id='ulica' name='ulica' />
            <label htmlFor='brUlice'>Broj Ulice</label>
            <input value={adresaIzdavaca.brUlice} onChange={promeniAdresuIzdavacaHandler} id='brUlice' name='brUlice' />
            <label htmlFor='brojPrimaoca'>Broj Telefona</label>
            <input value={brTelefonaIzdavaca} onChange={promeniBrTelefonaIzdavacaHandler} id='brojPrimaoca' />

            <label htmlFor='datumIzdavanja'>Datum izdavanja</label>
            <input onChange={promeniDatumIzdavanjaHandler} ref={datumIzdavanjaRef} type='date' id='datumIzdavanja' />

            <h1>Mesto izdavanja</h1>
            <label htmlFor='grad'>Grad</label>
            <input value={mestoIzdavanja.grad} onChange={promeniMestoIzdavanjaHandler} id='grad' name='grad' />
            <label htmlFor='postBroj'>Postanski Broj</label>
            <input value={mestoIzdavanja.postBroj} onChange={promeniMestoIzdavanjaHandler} id='Postanski' name='postBroj' />
            <label htmlFor='ulica'>Ulica</label>
            <input value={mestoIzdavanja.ulica} onChange={promeniMestoIzdavanjaHandler} id='ulica' name='ulica' />
            <label htmlFor='brUlice'>Broj Ulice</label>
            <input value={mestoIzdavanja.brUlice} onChange={promeniMestoIzdavanjaHandler} id='brUlice' name='brUlice' />

            <section>
                <h4>Opis</h4>
                <h4>Jedinicna cena</h4>
                <h4>Kolicina</h4>
                <h4>Ukupno</h4>
            </section>
            {stavke}
            <button onClick={dodajStavku}>+</button>

            <select value={valuta} onChange={promeniValutuHandler}>
                <option value='dinar'>RSD</option>
                <option value='evro'>EUR</option>
                <option value='dolar'>USD</option>
            </select>

            <select value={status} onChange={promeniStatusHandler}>
                <option value="priprema">Priprema</option>
                <option value="poslata">Poslata</option>
                <option value="placena">Placena</option>
            </select>

            <label htmlFor='rokPlacanja'>Rok placanja</label>
            <input onChange={promeniRokPlacanjaHandler} ref={rokPlacanjaRef} type='date' id='rokPlacanja' />

            <h3>Naplati od</h3>
            <label htmlFor='pibIzdavaca'>PIB | JMBG</label>
            <input value={pibKupca} onChange={promeniPibKupcaHandler} id='pibIzdavaca' />
            <label htmlFor='nazivIzdavaca' >Naziv preduzeca | Ime Kupca</label>
            <input value={imeKupca} onChange={promeniImeKupcaHandler} id='nazivIzdavaca' />

            <label htmlFor='grad'>Grad</label>
            <input value={adresaKupca.grad} onChange={promeniAdresuKupcaHandler} id='grad' name='grad' />
            <label htmlFor='postBroj'>Postanski Broj</label>
            <input value={adresaKupca.postBroj} onChange={promeniAdresuKupcaHandler} id='Postanski' name='postBroj' />
            <label htmlFor='ulica'>Ulica</label>
            <input value={adresaKupca.ulica} onChange={promeniAdresuKupcaHandler} id='ulica' name='ulica' />
            <label htmlFor='brUlice'>Broj Ulice</label>
            <input value={adresaKupca.brUlice} onChange={promeniAdresuKupcaHandler} id='brUlice' name='brUlice' />
            <label htmlFor='brojPrimaoca'>Broj Telefona</label>
            <input value={brTelefonaKupca} onChange={promeniBrTelefonaKupcaHandler} id='brojPrimaoca' />

            <h5>Ukupan Iznos:{ukupanIznos}</h5>
            <button type='submit'>Sacuvaj Fakturu</button>
            <button type='reset'>Odustani</button>

        </form>
    )
}

export default NovaFaktura;