import React, { useEffect, useState } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import { TipProizvoda } from '../../models/proizvod'

interface Props {
    onSacuvajStavku: (stavka: StavkaFakture) => void
    onOdustaniOdUnosa: () => void
    stavka: StavkaFakture
}

const DodavanjeStavke = (props: Props) => {

    const [stavka, setStavka] = useState<StavkaFakture>({
        proizvod: {
            sifra: '',
            naziv: '',
            osnovnaCena: 0,
            pdv: 0,
            tip: TipProizvoda.PROIZVOD
        },
        kolicina: 0
    })

    useEffect(() => {
        setStavka(props.stavka);
    }, [props.stavka]);

    const sacuvajStavkuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        props.onSacuvajStavku(stavka)
        resetujStavku();
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
    }

    const odustaniOdUnosaHandler = () => {
        resetujStavku()
        props.onOdustaniOdUnosa()
    }

    const resetujStavku = () => {
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
    }

    const promeniSifruProizvodaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const izmenjenaStavka: StavkaFakture = {
            ...stavka,
            proizvod: {
                ...stavka.proizvod,
                sifra: e.target.value
            }
        }
        setStavka(izmenjenaStavka)
    }

    const promeniNazivProizvodaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const izmenjenaStavka: StavkaFakture = {
            ...stavka,
            proizvod: {
                ...stavka.proizvod,
                naziv: e.target.value
            }
        }
        setStavka(izmenjenaStavka)
    }

    const promeniOsnovnuCenuProizvodaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const izmenjenaStavka: StavkaFakture = {
            ...stavka,
            proizvod: {
                ...stavka.proizvod,
                osnovnaCena: +e.target.value
            }
        }
        setStavka(izmenjenaStavka)
    }

    const promeniPdvProizvodaHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const izmenjenaStavka: StavkaFakture = {
            ...stavka,
            proizvod: {
                ...stavka.proizvod,
                pdv: +e.target.value
            }
        }
        setStavka(izmenjenaStavka)
    }

    const promeniTipProizvodaHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const izmenjenaStavka: StavkaFakture = {
            ...stavka,
            proizvod: {
                ...stavka.proizvod,
                tip: e.target.value as TipProizvoda
            }
        }
        setStavka(izmenjenaStavka)
    }

    const promeniKolicinuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const izmenjenaStavka: StavkaFakture = {
            proizvod: {
                ...stavka.proizvod
            },
            kolicina: +e.target.value
        }
        setStavka(izmenjenaStavka)
    }

    return (
        <>
            <input value={stavka.proizvod.sifra} onChange={promeniSifruProizvodaHandler} />
            <input value={stavka.proizvod.naziv} onChange={promeniNazivProizvodaHandler} />
            <select value={stavka.proizvod.tip} onChange={promeniTipProizvodaHandler}>
                <option value={TipProizvoda.PROIZVOD}>Proizvod</option>
                <option value={TipProizvoda.USLUGA}>Usluga</option>
            </select>
            <input value={stavka.kolicina} onChange={promeniKolicinuHandler} />
            <input value={stavka.proizvod.osnovnaCena} onChange={promeniOsnovnuCenuProizvodaHandler} />
            <input value={stavka.proizvod.pdv} onChange={promeniPdvProizvodaHandler} />
            <button onClick={sacuvajStavkuHandler}>Sacuvaj stavku</button>
            <button onClick={odustaniOdUnosaHandler}>Odustani</button>
        </>
    )
}

export default DodavanjeStavke

