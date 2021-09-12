import React from 'react';
import StavkaFakture from '../../models/stavkaFakture';

interface Props {
    stavka: StavkaFakture
    onUkloniStavku: (sifraProizvoda: string) => void,
    onIzmeniStavku: (sifraProizvoda: string) => void
}

const DodataStavkaItem = (props: Props) => {

    const { sifra: sifraProizvoda, naziv: nazivProizvoda, tip: tipProizvoda, osnovnaCena: osnovnaCenaProizvoda, pdv: pdvProizvoda } = props.stavka.proizvod;
    const { kolicina } = props.stavka

    const ukloniStavkuHandler = () => {
        props.onUkloniStavku(sifraProizvoda);
    }

    const izmeniStavkuHandler = () => {
        props.onIzmeniStavku(sifraProizvoda)
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
