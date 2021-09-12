import React, { useContext, useEffect, useState } from 'react'
import ListaFaktura from '../components/faktura/ListaFaktura'
import Faktura from '../models/faktura'
import { FakturaContext } from '../store/faktura-context'

import styles from './HomePage.module.css'

const HomePage = () => {

    const [fakture, setFakture] = useState<Faktura[]>([])
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

    return (
        <main className={styles.main}>
            <ListaFaktura fakture={fakture} />
        </main>
    )
}

export default HomePage
