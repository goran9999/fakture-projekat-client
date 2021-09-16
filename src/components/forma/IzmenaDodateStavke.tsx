import React, { useState, useEffect } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import { TipProizvoda } from '../../models/proizvod'
import useValidation from '../hooks/use-validation'
import useValidationNumber from '../hooks/use-validation-number'

import styles from './NovaFakturaForma.module.css'

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


    let formaValidna = false;

    const {imaGreske:sifraPogresna,vrednostValidna:sifraValidna,vrednostPromenjena:promeniSifru,
        fokusUklonjen:sifrafokusUklonjen}
        = useValidation(value=>{
            return  value.trim().length!==0},true);
    
    const {imaGreske:nazivPogresan,vrednostValidna:nazivValidan,vrednostPromenjena:promeniNaziv,
        fokusUklonjen:nazivFokusUklonjen}
     = useValidation(value=>{
         return  value.trim().length!==0},true);
    
    const {imaGreske:cenaPogresna,vrednostValidna:cenaValidna,vrednostPromenjena:promeniCenu,
        fokusUklonjen:cenaFokusUklonjen}
     = useValidationNumber(value=>{
         return  value>=0 && value.toString().trim().length!==0},osnovnaCena);

    const {imaGreske:kolicinaPogresna,vrednostValidna:kolicinaValidna,vrednostPromenjena:promeniKolicinu,
        fokusUklonjen:kolicinaFokusUklonjen}
     = useValidationNumber(value=>{
          return  value>=1 && value.toString().trim().length!==0},kolicina);

    const {imaGreske:pdvPogresan,vrednostValidna:pdvValidan,vrednostPromenjena:promeniPdv,
        fokusUklonjen:pdvFokusUklonjen}
     = useValidationNumber(value=>{
          return  value>=0 && value<=100 && value.toString().trim().length!==0},pdv);

    if(sifraValidna && nazivValidan && cenaValidna && kolicinaValidna && pdvValidan){
        formaValidna=true;
    }


  
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
        promeniSifru(e.target.value);
    }

    const promeniNazivHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNaziv(e.target.value)
        promeniNaziv(e.target.value);
    }

    const promeniOsnovnuCenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const broj = +e.target.value.charAt(e.target.value.length-1);
        if(!isNaN(broj)){
        setOsnovnaCena(+e.target.value)
        promeniCenu(+e.target.value);
        }
    }

    const promeniPdvHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const broj = +e.target.value.charAt(e.target.value.length-1);
        if(!isNaN(broj)){
        setPdv(+e.target.value)
        promeniPdv(+e.target.value)
        }
    }

    const promeniTipHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTip(e.target.value as TipProizvoda)
    }

    const promeniKolicinuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const broj = +e.target.value.charAt(e.target.value.length-1);
        if(!isNaN(broj)){
        setKolicina(+e.target.value)
        promeniKolicinu(+e.target.value);
        }
    }

    const odustaniOdIzmeneHandler = () => {
        props.onOdustaniOdIzmene();
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className={styles['form-element']}>
                <label htmlFor="">Sifra *</label>
                <input onBlur={sifrafokusUklonjen} value={sifra} onChange={promeniSifruHandler} />
                {sifraPogresna && <p style={{color:'red',marginTop:'10px'}}>Sifra nije validna!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">Naziv *</label>
                <input onBlur={nazivFokusUklonjen} value={naziv} onChange={promeniNazivHandler} />
                {nazivPogresan && <p style={{color:'red',marginTop:'10px'}}>Naziv nije validan!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">Tip *</label>
                <select value={tip} onChange={promeniTipHandler}>
                    <option value={TipProizvoda.PROIZVOD}>Proizvod</option>
                    <option value={TipProizvoda.USLUGA}>Usluga</option>
                </select>
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">Kolicina *</label>
                <input onBlur={kolicinaFokusUklonjen} value={kolicina} onChange={promeniKolicinuHandler} />
                {kolicinaPogresna && <p style={{color:'red',marginTop:'10px'}}>Kolicina nije validna!</p>}
            </div>


            <div className={styles['form-element']}>
                <label htmlFor="">Osnovna cena *</label>
                <input onBlur={cenaFokusUklonjen} value={osnovnaCena} onChange={promeniOsnovnuCenuHandler} />
                {cenaPogresna && <p style={{color:'red',marginTop:'10px'}}>Cena nije validna!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">PDV *</label>
                <input value={pdv} onBlur={pdvFokusUklonjen} onChange={promeniPdvHandler} />
                {pdvPogresan && <p style={{color:'red',marginTop:'10px'}}>PDV nije validan!</p>}
            </div>


            <div>
                <button disabled={!formaValidna}  className={styles['btn-sacuvaj-stavku']} onClick={sacuvajIzmeneHandler}>Sacuvaj izmene</button>
                <button className={styles['btn-odbaci-stavku']} onClick={odustaniOdIzmeneHandler}>Odustani</button>
            </div>

        </div>
    )
}

export default IzmenaDodateStavke
