import React, { useEffect, useState } from 'react'
import ListaFaktura from '../components/faktura/ListaFaktura'
import Faktura from '../models/faktura'

import styles from './HomePage.module.css'

interface Props {

}

const HomePage = (props: Props) => {

    const [fakture, setFakture] = useState<Faktura[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/fakture')
            .then(res => res.json())
            .then(fakture => setFakture(fakture));
    }, [])

    return (
        <main className={styles.main}>
            <ListaFaktura fakture={fakture} />
        </main>
    )
}

export default HomePage
