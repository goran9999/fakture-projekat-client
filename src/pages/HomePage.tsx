import React, { useEffect, useState } from 'react'
import ListaFaktura from '../components/faktura/ListaFaktura'
import Faktura from '../models/faktura'

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
        <div>
            <ListaFaktura fakture={fakture} />
        </div>
    )
}

export default HomePage
