import React, { useContext, useEffect, useState } from 'react'
import ListaFaktura from '../components/faktura/ListaFaktura'
import Faktura, { StatusFakture } from '../models/faktura'
import { FakturaContext } from '../store/faktura-context'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'
import Sidebar from '../UI/Sidebar'
import Modal from '../UI/Modal'

enum FilterStanje {
    SVE = 'sve',
    PRIPREMA = 'priprema',
    POSLATA = 'poslata',
    PLACENA = 'placena',
    KASNI = 'kasni',
    STORNIRANA = 'stornirana'
}

const HomePage = () => {

    const [fakture, setFakture] = useState<Faktura[]>([])
    const fakturaContext = useContext(FakturaContext);
    const [prikaziModalZaFiltriranje, setPrikaziModalZaFiltriranje] = useState(false);
    const [primenjenFilter, setPrimenjenFilter] = useState(FilterStanje.SVE);

    useEffect(() => {

        // ako u conteksu ima faktura -> nema potrebe da se pravi novi zahtev za podacima
        if (fakturaContext.fakture.length === 0) {
            fetch('http://localhost:5000/api/fakture')
                .then(res => res.json())
                .then(data => {
                    const fakture = data as Faktura[]
                    fakturaContext.postaviFakture(fakture);
                    setFakture(fakture)
                    console.log('Podaci pokupljeni iz baze')
                });
        } else {
            setFakture(fakturaContext.fakture)
        }

    },[fakturaContext])

    const filtrirajFakture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === FilterStanje.SVE) {
            setFakture(fakturaContext.fakture);
            setPrimenjenFilter(FilterStanje.SVE)
        } else {
            const status = event.target.value as StatusFakture;
            setFakture(fakturaContext.fakture.filter(f => f.status === status));
            setPrimenjenFilter(event.currentTarget.value as FilterStanje)
        }
        setPrikaziModalZaFiltriranje(false);
    }

    const omoguciFiltriranje = () => {
        setPrikaziModalZaFiltriranje(true);
    }

    return (
        <>

            {prikaziModalZaFiltriranje &&
                <Modal onZatvori={() => setPrikaziModalZaFiltriranje(false)}>
                    <div>
                        <div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Prema statusu</h3>
                            <label>Sve</label>
                            <input onChange={filtrirajFakture} type='radio' name='status' value={FilterStanje.SVE} checked={primenjenFilter === FilterStanje.SVE} />
                            <label>Priprema</label>
                            <input onChange={filtrirajFakture} type='radio' name='status' value={FilterStanje.PRIPREMA} checked={primenjenFilter === FilterStanje.PRIPREMA} />
                            <label>Poslata</label>
                            <input onChange={filtrirajFakture} type='radio' name='status' value={FilterStanje.POSLATA} checked={primenjenFilter === FilterStanje.POSLATA} />
                            <label>Placena</label>
                            <input onChange={filtrirajFakture} type='radio' name='status' value={FilterStanje.PLACENA} checked={primenjenFilter === FilterStanje.PLACENA} />
                            <label>Kasni</label>
                            <input onChange={filtrirajFakture} type='radio' name='status' value={FilterStanje.KASNI} checked={primenjenFilter === FilterStanje.KASNI} />
                            <label>Stornirana</label>
                            <input onChange={filtrirajFakture} type='radio' name='status' value={FilterStanje.STORNIRANA} checked={primenjenFilter === FilterStanje.STORNIRANA} />
                        </div>
                    </div>
                </Modal>
            }

            <main className={styles.main}>
                <Sidebar>
                    <ul>
                        <li><Link to='/'>Pregled</Link></li>
                        <li><Link to='/dodaj-fakturu'>Dodaj novu fakturu</Link></li>
                        <li>Statistika</li>
                        <li>Podesavanja</li>
                        <li>Odjava</li>
                    </ul>
                </Sidebar>
                <ListaFaktura onOmoguciFiltriranje={omoguciFiltriranje} fakture={fakture} />
            </main>

        </>
    )
}

export default HomePage
