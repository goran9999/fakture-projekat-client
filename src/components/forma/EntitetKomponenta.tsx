import React, { useState } from "react";
import Adresa from "./Adresa";
import AdresaModel from "../../models/adresa";
import { FizickoLice, PravnoLice } from "../../models/entitet";

const initialAdresa: AdresaModel = {
    grad: '',
    ulica: '',
    postBroj: 0,
    brUlice: ''
}

interface Props {
    sacuvajKupca: (kupac: FizickoLice | PravnoLice) => void
}

const EntitetKomponenta = (props: Props) => {

    const [id, setId] = useState('');
    const [naziv, setNaziv] = useState('');
    const [adresa, setAdresa] = useState(initialAdresa);
    const [brojTelefona, setBrojTelefona] = useState('');

    const promeniNazivHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNaziv(event.target.value);
    }

    const promeniBrojTelefonaHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrojTelefona(event.target.value)
    }

    const promeniIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    }

    const sacuvajAdresuHandler = (adresa: AdresaModel) => {
        setAdresa(adresa);
    }


    if (id && naziv && brojTelefona) {

        const kupac: FizickoLice | PravnoLice = {
            naziv: naziv,
            adresa: adresa,
            telefon: brojTelefona,
            jmbg: id,
            pib: id
        }

        props.sacuvajKupca(kupac);
    }


    return (
        <div>
            <label htmlFor='nazivPrimaoca' >Ime | Preduzece</label>
            <input value={naziv} onChange={promeniNazivHandler} id='nazivPrimaoca' />
            <span>
                <label htmlFor='id'>PIB | JMBG</label>
                <input value={id} onChange={promeniIdHandler} id='id' />
                <Adresa sacuvajAdresu={sacuvajAdresuHandler} />
                <label htmlFor='brojPrimaoca'>Broj Telefona</label>
                <input value={brojTelefona} onChange={promeniBrojTelefonaHandler} id='brojPrimaoca' />
            </span>
        </div>
    )
}
export default EntitetKomponenta;