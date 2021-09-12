import React, { useState, useEffect } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import { TipProizvoda } from '../../models/proizvod'

interface Props {
    stavka: StavkaFakture
    onSacuvajIzmene: (izmenjenaStavka: StavkaFakture) => void,
    onOdustaniOdIzmene: () => void
}

const IzmenaDodateStavke = (props: Props) => {

    const [sifra, setSifra] = useState('');
    const [naziv, setNaziv] = useState('');
    const [tip, setTip] = useState(TipProizvoda.PROIZVOD)
    const [osnovnaCena, setOsnovnaCena] = useState(0);
    const [pdv, setPdv] = useState(0);
    const [kolicina, setKolicina] = useState(1);

    useEffect(() => {
        setSifra(props.stavka.proizvod.sifra)
        setNaziv(props.stavka.proizvod.naziv)
        setTip(props.stavka.proizvod.tip)
        setOsnovnaCena(props.stavka.proizvod.osnovnaCena)
        setPdv(props.stavka.proizvod.pdv)
        setKolicina(props.stavka.kolicina)
    }, [props])

    const sacuvajIzmeneHandler = () => {

        const izmenjenaStavka: StavkaFakture = {
            proizvod: {
                sifra: sifra,
                naziv: naziv,
                tip: tip,
                osnovnaCena: osnovnaCena,
                pdv: pdv,
            },
            kolicina: kolicina
        }
        props.onSacuvajIzmene(izmenjenaStavka);
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

    const odustaniOdIzmeneHandler = () => {
        props.onOdustaniOdIzmene();
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
            <button onClick={sacuvajIzmeneHandler}>Sacuvaj izmene</button>
            <button onClick={odustaniOdIzmeneHandler}>Odustani</button>
        </>
    )
}

export default IzmenaDodateStavke
