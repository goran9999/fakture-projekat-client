import React, { useState } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import Proizvod, { TipProizvoda } from '../../models/proizvod'

import styles from './NovaFakturaForma.module.css'

interface Props {
    onSacuvajStavku: (stavka: StavkaFakture) => void
    onOdustaniOdUnosa: () => void
}

const DodavanjeStavke = ({ onSacuvajStavku, onOdustaniOdUnosa }: Props) => {

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

        onSacuvajStavku(stavka)
        resetujStavku()
    }

    const odustaniOdUnosaHandler = () => {
        resetujStavku()
        onOdustaniOdUnosa()
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
        const num = +e.target.value
        if (typeof num === 'number' && !isNaN(num)) {
            setOsnovnaCena(num)
        }
    }

    const promeniPdvHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = +e.target.value
        if (typeof num === 'number' && !isNaN(num)) {
            setPdv(num)
        }
    }

    const promeniTipHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTip(e.target.value as TipProizvoda)
    }

    const promeniKolicinuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = +e.target.value
        if (typeof num === 'number' && !isNaN(num)) {
            setKolicina(num)
        }
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className={styles['form-element']}>
                <label>Sifra *</label>
                <input value={sifra} onChange={promeniSifruHandler} />
            </div>

            <div className={styles['form-element']}>
                <label>Naziv *</label>
                <input value={naziv} onChange={promeniNazivHandler} />
            </div>


            <div className={styles['form-element']}>
                <label>Tip *</label>
                <select value={tip} onChange={promeniTipHandler}>
                    <option value={TipProizvoda.PROIZVOD}>Proizvod</option>
                    <option value={TipProizvoda.USLUGA}>Usluga</option>
                </select>
            </div>

            <div className={styles['form-element']}>
                <label>Kolicina *</label>
                <input value={kolicina} onChange={promeniKolicinuHandler} />
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">Osnovna cena *</label>
                <input value={osnovnaCena} onChange={promeniOsnovnuCenuHandler} />
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">PDV % *</label>
                <input value={pdv} onChange={promeniPdvHandler} />
            </div>

            <div>
                <button className={styles['btn-sacuvaj-stavku']} onClick={sacuvajStavkuHandler}>Sacuvaj stavku</button>
                <button className={styles['btn-odbaci-stavku']} onClick={odustaniOdUnosaHandler}>Odustani</button>
            </div>
        </div>
    )
}

export default DodavanjeStavke