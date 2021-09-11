import React, { useState } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import Proizvod, { TipProizvoda } from '../../models/proizvod'

interface Props {
    onSacuvajStavku: (stavka: StavkaFakture) => void
    onOdustaniOdUnosa: () => void
}

const DodavanjeStavke = (props: Props) => {

    const [sifra, setSifra] = useState('');
    const [naziv, setNaziv] = useState('');
    const [tip, setTip] = useState(TipProizvoda.PROIZVOD)
    const [osnovnaCena, setOsnovnaCena] = useState(0);
    const [pdv, setPdv] = useState(0);
    const [kolicina, setKolicina] = useState(1);


    const sacuvajStavkuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const proizvod: Proizvod = {
            sifra: sifra,
            naziv: naziv,
            tip: tip,
            osnovnaCena: osnovnaCena,
            pdv: pdv
        };

        const stavka: StavkaFakture = {
            proizvod: proizvod,
            kolicina: kolicina
        }

        props.onSacuvajStavku(stavka)
        resetujStavku()
    }

    const odustaniOdUnosaHandler = () => {
        resetujStavku()
        props.onOdustaniOdUnosa()
    }

    const resetujStavku = () => {
        setSifra('');
        setNaziv('');
        setKolicina(1);
        setTip(TipProizvoda.PROIZVOD)
        setOsnovnaCena(0);
        setPdv(0);
    }

    const promeniSifruHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSifra(e.target.value)
    }

    const promeniNazivHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNaziv(e.target.value)
    }

    const promeniOsnovnuCenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOsnovnaCena(+e.target.value)
    }

    const promeniPdvHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPdv(+e.target.value)
    }

    const promeniTipHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTip(e.target.value as TipProizvoda)
    }

    const promeniKolicinuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKolicina(+e.target.value)
    }

    return (
        <>
            <input value={sifra} onChange={promeniSifruHandler} />
            <input value={naziv} onChange={promeniNazivHandler} />
            <select value={tip} onChange={promeniTipHandler}>
                <option value={TipProizvoda.PROIZVOD}>Proizvod</option>
                <option value={TipProizvoda.USLUGA}>Usluga</option>
            </select>
            <input value={kolicina} onChange={promeniKolicinuHandler} />
            <input value={osnovnaCena} onChange={promeniOsnovnuCenuHandler} />
            <input value={pdv} onChange={promeniPdvHandler} />
            <button onClick={sacuvajStavkuHandler}>Sacuvaj stavku</button>
            <button onClick={odustaniOdUnosaHandler}>Odustani</button>
        </>
    )
}

export default DodavanjeStavke
