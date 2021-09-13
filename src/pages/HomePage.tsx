import React, { useContext, useEffect, useState } from 'react'
import ListaFaktura from '../components/faktura/ListaFaktura'
import Faktura, { StatusFakture } from '../models/faktura'
import { FakturaContext } from '../store/faktura-context'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

const HomePage = () => {

    const [fakture, setFakture] = useState<Faktura[]>([])
    const [filtriraj,setFiltriraj] = useState(false);
    const fakturaContext = useContext(FakturaContext);

    useEffect(() => {
        fetch('http://localhost:5000/api/fakture')
            .then(res => res.json())
            .then(data => {
                const fakture = data as Faktura[]
                fakturaContext.postaviFakture(fakture);
                setFakture(fakture)
            });
    }, [])

    const filtrirajFakture = (event:React.FormEvent<HTMLInputElement>) => {
        if(event.currentTarget.value === 'sve'){
            setFakture(fakturaContext.fakture);
        }else{
        const status = event.currentTarget.value as StatusFakture;
        setFakture(fakturaContext.fakture.filter(f=>f.status===status));
        }
        console.log(fakture);
    }

    const omoguciFiltriranje = () =>{
        setFiltriraj(prevFiltriraj=>!prevFiltriraj);
    }

    return (
        <>
         
        <button className={styles['btn-filter']} type='button' onClick={omoguciFiltriranje}>Filtriraj 
        <i className="fa fa-filter" style={{fontSize:'14px',color:'white',marginLeft:'5px'}}></i>
        </button> 
        <div className={styles.filter}>
        {filtriraj&&<div className={styles.status}>
            <label>SVE</label>
            <input  onClick={filtrirajFakture} type='radio' name='status' value="sve" defaultChecked/> 
            <label>PRIPREMA</label>
            <input onClick={filtrirajFakture} type='radio' name='status' value="priprema" />
            <label>POSLATA </label>
            <input onClick={filtrirajFakture} type='radio' name='status' value="poslata" />
            <label>PLACENA</label>
            <input onClick={filtrirajFakture} type='radio' name='status' value="placena"/>
            <label>KASNI</label>
            <input onClick={filtrirajFakture} type='radio' name='status' value="kasni"/>
            <label>STORNIRANA</label>
            <input onClick={filtrirajFakture} type='radio' name='status' value="stornirana" />
        </div>}
        
        </div>
        <main className={styles.main}>
            <ListaFaktura onOmoguciFiltriranje={omoguciFiltriranje} fakture={fakture} />
        </main>
        <Link to='/dodaj-fakturu'><button className={styles['btn-dodaj-fakturu']}>Dodaj Fakturu</button></Link>
        
        </>
    )
}

export default HomePage
