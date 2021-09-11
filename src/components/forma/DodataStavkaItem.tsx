import React from 'react';
import { TipProizvoda } from '../../models/proizvod'
import StavkaFakture from '../../models/stavkaFakture';

interface Props {
    sifraProizvoda: string
    nazivProizvoda: string
    tipProizvoda: TipProizvoda
    osnovnaCenaProizvoda: number
    pdvProizvoda: number
    kolicina: number
    onUkloniStavku: (sifraProizvoda: string) => void,
    onIzmeniStavku: (stavka: StavkaFakture) => void,
}

const DodataStavkaItem = (props: Props) => {

    const { sifraProizvoda, nazivProizvoda, tipProizvoda, kolicina, osnovnaCenaProizvoda, pdvProizvoda } = props;

    const ukloniStavkuHandler = () => {
        props.onUkloniStavku(sifraProizvoda);
    }

    const izmeniStavkuHandler = () => {

        const stavka: StavkaFakture = {
            proizvod: {
                sifra: sifraProizvoda,
                naziv: nazivProizvoda,
                tip: tipProizvoda,
                osnovnaCena: osnovnaCenaProizvoda,
                pdv: pdvProizvoda
            },
            kolicina: kolicina
        }

        props.onIzmeniStavku(stavka);

    }

    return (
        <tr>
            <td>{sifraProizvoda}</td>
            <td>{nazivProizvoda}</td>
            <td>{tipProizvoda}</td>
            <td>{kolicina}</td>
            <td>{osnovnaCenaProizvoda}</td>
            <td>{pdvProizvoda}</td>
            <td>{osnovnaCenaProizvoda * pdvProizvoda / 100}</td>
            <td>{(osnovnaCenaProizvoda + (osnovnaCenaProizvoda * pdvProizvoda) / 100) * kolicina}</td>
            <td>
                <button type='button' onClick={izmeniStavkuHandler}>Izmeni</button>
            </td>
            <td>
                <button type='button' onClick={ukloniStavkuHandler}>Ukloni</button>
            </td>
        </tr>
    )
}

export default DodataStavkaItem
