import React, { useState } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import Proizvod, { TipProizvoda } from '../../models/proizvod'
import styles from './NovaFakturaForma.module.css'
import useValidation from '../hooks/use-validation'
import useValidationNumber from '../hooks/use-validation-number'
interface Props {
    onSacuvajStavku: (stavka: StavkaFakture) => void
    onOdustaniOdUnosa: () => void
}

    const DodavanjeStavke = (props: Props) => {

    let formaValidna = false;
    const [tip, setTip] = useState(TipProizvoda.PROIZVOD);
    
    
    const {upisanaVrednost:sifra,imaGreske:sifraPogresna,vrednostValidna:sifraValidna,vrednostPromenjena:promeniSifru,
        fokusUklonjen:sifrafokusUklonjen,reset:resetSifra}
        = useValidation(value=>{
            return  value.trim().length!==0});
    
    const {upisanaVrednost:naziv,imaGreske:nazivPogresan,vrednostValidna:nazivValidan,vrednostPromenjena:promeniNaziv,
        fokusUklonjen:nazivFokusUklonjen,reset:resetNaziv}
     = useValidation(value=>{
         return  value.trim().length!==0});
    
    const {upisanaVrednost:osnovnaCena,imaGreske:cenaPogresna,vrednostValidna:cenaValidna,vrednostPromenjena:promeniCenu,
        fokusUklonjen:cenaFokusUklonjen,reset:resetCenu}
     = useValidationNumber(value=>{
         return  value>=0 && value.toString().trim().length!==0 && !isNaN(value)},0);

    const {upisanaVrednost:kolicina,imaGreske:kolicinaPogresna,vrednostValidna:kolicinaValidna,vrednostPromenjena:promeniKolicinu,
        fokusUklonjen:kolicinaFokusUklonjen,reset:resetKolicinu}
     = useValidationNumber(value=>{
          return  value>=1 && value.toString().trim().length!==0 && !isNaN(value)},1);

    const {upisanaVrednost:pdv,imaGreske:pdvPogresan,vrednostValidna:pdvValidan,vrednostPromenjena:promeniPdv,
        fokusUklonjen:pdvFokusUklonjen,reset:resetPdv}
     = useValidationNumber(value=>{
          return  value>=1 && value<=100 && value.toString().trim().length!==0 && !isNaN(value)},0);

    if(sifraValidna && nazivValidan && cenaValidna && kolicinaValidna && pdvValidan){
        formaValidna=true;
    }
    const sacuvajStavkuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
       
      
        const proizvod: Proizvod = {
            sifra: sifra,
            naziv: naziv,
            tip: tip,
            osnovnaCena: +osnovnaCena,
            pdv: pdv
        };
    

        const stavka: StavkaFakture = {
            proizvod: proizvod,
            kolicina: kolicina
        }

        props.onSacuvajStavku(stavka);
        resetujStavku()
}

    const odustaniOdUnosaHandler = () => {
        resetujStavku()
        props.onOdustaniOdUnosa()
    }

    const resetujStavku = () => {
       
        resetSifra();
        resetNaziv();
        resetKolicinu();
        setTip(TipProizvoda.PROIZVOD)
        resetCenu();
        resetPdv();
    }

    const promeniSifruHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setSifra(e.target.value)
        promeniSifru(e.target.value);

    }

    const promeniNazivHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        promeniNaziv(e.target.value);
    }

    const promeniOsnovnuCenuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const broj = +e.target.value.charAt(e.target.value.length-1);
            if(!isNaN(broj)){
        promeniCenu(+e.target.value);
        }
    }

    const promeniPdvHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const broj = +e.target.value.charAt(e.target.value.length-1);
            if(!isNaN(broj)){
        promeniPdv(+e.target.value);
            }
    }

    const promeniTipHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTip(e.target.value as TipProizvoda)
    }

    const promeniKolicinuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const broj = +e.target.value.charAt(e.target.value.length-1);
            if(!isNaN(broj)){
        promeniKolicinu(+e.target.value)
        }
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className={styles['form-element']}>
                <label>Sifra *</label>
                <input  onBlur={sifrafokusUklonjen} value={sifra} onChange={promeniSifruHandler} />
                {(sifraPogresna)&& <p style={{color:'red',marginTop:'10px'}}>Sifra stavke je obavezna!</p>}
            </div>

            <div className={styles['form-element']}>
                <label>Naziv *</label>
                <input onBlur={nazivFokusUklonjen} value={naziv} onChange={promeniNazivHandler} />
                {(nazivPogresan)&&<p style={{color:'red',marginTop:'10px'}}>Naziv stavke je obavezan!</p>}
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
                <input onBlur={kolicinaFokusUklonjen} value={kolicina} onChange={promeniKolicinuHandler} />
                {(kolicinaPogresna)&& <p style={{color:'red',marginTop:'10px'}}>Kolicina ne moze biti negativna!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">Osnovna cena *</label>
                <input value={osnovnaCena} onBlur={cenaFokusUklonjen} onChange={promeniOsnovnuCenuHandler} />
                {(cenaPogresna)&& <p style={{color:'red',marginTop:'10px'}}>Cena ne moze biti negativna!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor="">PDV *</label>
                <input value={pdv} onBlur={pdvFokusUklonjen} onChange={promeniPdvHandler} />
                {(pdvPogresan)&& <p style={{color:'red',marginTop:'10px'}}>Pdv ne moze biti manji od 0% i veci od 100%!</p>}
            </div>

            <div>
                <button disabled={!formaValidna} className={styles['btn-sacuvaj-stavku']} onClick={sacuvajStavkuHandler}>Sacuvaj stavku</button>
                <button className={styles['btn-odbaci-stavku']} onClick={odustaniOdUnosaHandler}>Odustani</button>
            </div>
        </div>
    )
}

export default DodavanjeStavke