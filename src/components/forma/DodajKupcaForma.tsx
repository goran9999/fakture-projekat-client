import React, { useState } from "react"
import { useHistory } from "react-router";
import { defaultAdresa } from "../../models/adresa";
import Komitent, { TipKomitenta } from "../../models/komitent";
import Adresa from "./Adresa";

const DodajKupcaForma = () => {

    const history = useHistory()

    const [matBroj, setMatBroj] = useState('');
    const [pib, setPib] = useState('');
    const [naziv, setNaziv] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [adresa, setAdresa] = useState(defaultAdresa);
    const [tipKupca, setTipKupca] = useState(TipKomitenta.PRAVNO_LICE)


    const dodajKupcaHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const kupac: Komitent = {
            maticniBroj: matBroj,
            naziv: naziv,
            email: email,
            telefon: telefon,
            adresa: adresa
        }

        if (tipKupca === TipKomitenta.PRAVNO_LICE) {
            kupac.pib = pib;
        }

        try {
            const response = await fetch('http://localhost:5000/api/komitenti/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(kupac)
            })

            if (response.status !== 201) {
                throw new Error('Greska prilikom dodavanja kupca u bazu')
            } else {
                console.log('Kupac uspesno sacuvan')
                history.replace('/sifarnik')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={dodajKupcaHandler}>

            <label htmlFor="">Pravno lice</label>
            <input
                type='radio'
                value={TipKomitenta.PRAVNO_LICE}
                checked={tipKupca === TipKomitenta.PRAVNO_LICE}
                onChange={() => setTipKupca(TipKomitenta.PRAVNO_LICE)} />

            <label htmlFor="">Fizicko lice</label>
            <input
                type='radio'
                value={TipKomitenta.FIZICKO_LICE}
                checked={tipKupca === TipKomitenta.FIZICKO_LICE}
                onChange={() => setTipKupca(TipKomitenta.FIZICKO_LICE)} />


            <label htmlFor='matBroj'>Maticni broj *</label>
            <input value={matBroj} onChange={(e) => setMatBroj(e.target.value)} id='matBroj' />

            <label htmlFor='pib'>PIB *</label>
            <input disabled={tipKupca === TipKomitenta.FIZICKO_LICE} value={pib} onChange={(e) => setPib(e.target.value)} id='pib' />

            <label htmlFor='naziv'>{tipKupca === TipKomitenta.PRAVNO_LICE ? 'Naziv' : 'Ime i prezime'} *</label>
            <input value={naziv} onChange={(e) => setNaziv(e.target.value)} id='naziv' />

            <label htmlFor='email'>E-mail *</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' />

            <label htmlFor='telefon'>Telefon *</label>
            <input value={telefon} onChange={(e) => setTelefon(e.target.value)} id='telefon' />

            <Adresa obaveznaPolja onChange={(adresa) => setAdresa(adresa)} />

            <button type='submit'>Dodaj</button>
        </form>
    )
}

export default DodajKupcaForma
