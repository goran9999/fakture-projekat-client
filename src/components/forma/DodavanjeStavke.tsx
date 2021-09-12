import React, { useEffect, useState } from 'react'
import StavkaFakture from '../../models/stavkaFakture'
import { TipProizvoda } from '../../models/proizvod'
import Modal from '../../UI/Modal'
import styles from './DodavanjeStavke.module.css'
interface Props {
    onSacuvajStavku: (stavka: StavkaFakture) => void
    onOdustaniOdUnosa: () => void
    stavka: StavkaFakture,
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
        <Modal onZatvori={props.onOdustaniOdUnosa}>
             <tr className={styles.zaglavlje}>
                <th>Sifra</th>  
                <th>Naziv</th>
                <th style={{paddingLeft:'50px'}}>Tip</th>
                <th>Kolicina</th>
                <th>Osnovna cena</th>
                <th>PDV</th>
                    </tr>
            <div className={styles['stavka-forma']}>
            <input style={{marginLeft:'5px'}} size={8} value={stavka.proizvod.sifra} onChange={promeniSifruProizvodaHandler} />
            <input size={12} value={stavka.proizvod.naziv} onChange={promeniNazivProizvodaHandler} />
            <select value={stavka.proizvod.tip} onChange={promeniTipProizvodaHandler}>
                <option value={TipProizvoda.PROIZVOD}>Proizvod</option>
                <option value={TipProizvoda.USLUGA}>Usluga</option>
            </select>
            <input size={5} value={stavka.kolicina} onChange={promeniKolicinuHandler} />
            <input size={8} className={styles['osnovna-cena']} value={stavka.proizvod.osnovnaCena} onChange={promeniOsnovnuCenuProizvodaHandler} />
            <input className={styles.pdv} size={2} value={stavka.proizvod.pdv} onChange={promeniPdvProizvodaHandler} />
            </div>
            <div className={styles.dugmad}>
            <button onClick={sacuvajStavkuHandler}>Sacuvaj stavku</button>
            <button onClick={odustaniOdUnosaHandler}>Odustani</button>
            </div>
        </Modal>
    )
}

export default DodavanjeStavke

