import React, { useContext, useState } from "react"
import { useHistory } from "react-router";
import { defaultAdresa } from "../../../models/adresa";
import Kupac, { TipKupca } from "../../../models/kupac";
import { SifarnikContext } from "../../../store/sifarnikContext";
import Adresa from "../../adresa/Adresa";

const DodajKupcaForma = () => {

    const history = useHistory()
    const { dodajKupca } = useContext(SifarnikContext);

    const [matBroj, setMatBroj] = useState('');
    const [pib, setPib] = useState('');
    const [naziv, setNaziv] = useState('');
    const [email, setEmail] = useState('');
    const [telefon, setTelefon] = useState('');
    const [adresa, setAdresa] = useState(defaultAdresa);
    const [tipKupca, setTipKupca] = useState(TipKupca.PRAVNO_LICE)

    const dodajKupcaHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const kupac: Kupac = {
            maticniBroj: matBroj,
            naziv: naziv,
            email: email,
            telefon: telefon,
            adresa: adresa,
            tip: tipKupca
        }

        if (tipKupca === TipKupca.PRAVNO_LICE) {
            kupac.pib = pib;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        try {

            const response = await fetch('http://localhost:5000/api/sifarnik/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token.toString()
                },
                body: JSON.stringify(kupac)
            })

            if (response.status !== 201) {
                throw new Error('Greska prilikom dodavanja kupca u bazu')
            } else {
                dodajKupca(kupac);
                history.replace('/sifarnik')
            }

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={dodajKupcaHandler}>

            <div className='form-element'>
                <label htmlFor="">Pravno lice</label>
                <input
                    type='radio'
                    value={TipKupca.PRAVNO_LICE}
                    checked={tipKupca === TipKupca.PRAVNO_LICE}
                    onChange={() => setTipKupca(TipKupca.PRAVNO_LICE)} />
            </div>

            <div className='form-element'>
                <label htmlFor="">Fizicko lice</label>
                <input
                    type='radio'
                    value={TipKupca.FIZICKO_LICE}
                    checked={tipKupca === TipKupca.FIZICKO_LICE}
                    onChange={() => setTipKupca(TipKupca.FIZICKO_LICE)} />
            </div>


            <div className='form-element'>
                <label htmlFor='matBroj'>Maticni broj *</label>
                <input value={matBroj} onChange={(e) => setMatBroj(e.target.value)} id='matBroj' />
            </div>

            <div className='form-element'>
                <label htmlFor='pib'>PIB *</label>
                <input disabled={tipKupca === TipKupca.FIZICKO_LICE} value={pib} onChange={(e) => setPib(e.target.value)} id='pib' />
            </div>

            <div className='form-element'>
                <label htmlFor='naziv'>{tipKupca === TipKupca.PRAVNO_LICE ? 'Naziv' : 'Ime i prezime'} *</label>
                <input value={naziv} onChange={(e) => setNaziv(e.target.value)} id='naziv' />
            </div>

            <div className='form-element'>
                <label htmlFor='email'>E-mail *</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' />
            </div>

            <div className='form-element'>
                <label htmlFor='telefon'>Telefon *</label>
                <input value={telefon} onChange={(e) => setTelefon(e.target.value)} id='telefon' />
            </div>

            <Adresa obaveznaPolja onChange={(adresa) => setAdresa(adresa)} />

            <button type='submit'>Dodaj</button>
        </form>
    )
}

export default DodajKupcaForma
