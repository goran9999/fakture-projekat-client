import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DetaljnaFaktura from '../components/faktura/DetaljnaFaktura';
import Faktura from '../models/faktura';
import { FakturaContext } from '../store/faktura-context';

const FakturaDetaljiPage = () => {

    const [faktura, setFaktura] = useState<Faktura>()

    const fakturaContext = useContext(FakturaContext);
    const { brojFakture } = useParams<{ brojFakture: string }>();

    useEffect(() => {
        const faktura = fakturaContext.fakture.find(f => {
            console.log(`Broj fakture param = ${brojFakture}, broj fakture iteracija = ${f.broj}`)
            console.log(brojFakture === f.broj)
            return f.broj === brojFakture
        })!

        if (!faktura) {
            fetch(`http://localhost:5000/api/fakture/${brojFakture}`)
                .then(res => res.json())
                .then(data => {
                    setFaktura(data as Faktura);
                })
        } else {
            setFaktura(faktura);
        }

    }, [fakturaContext.fakture, brojFakture]);


    return (
        <div>
            {faktura && <DetaljnaFaktura faktura={faktura} />}
        </div>
    )
}

export default FakturaDetaljiPage
