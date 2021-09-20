import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FakturaDetalji from '../components/fakture/detaljnaFaktura/FakturaDetalji';
import Faktura from '../models/faktura';
import { FakturaContext } from '../store/faktura-context';

const FakturaDetaljiPage = () => {

    const [faktura, setFaktura] = useState<Faktura>()

    const fakturaContext = useContext(FakturaContext);
    const { brojFakture } = useParams<{ brojFakture: string }>();

    useEffect(() => {
        const faktura = fakturaContext.fakture.find(f => f.broj === brojFakture)
        if (!faktura) {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            fetch(`http://localhost:5000/api/fakture/${brojFakture}`, { headers: { 'auth-token': token.toString() } })
                .then(res => res.json())
                .then(data => {
                    setFaktura(data as Faktura);
                })
        } else {
            setFaktura(faktura);
        }

    }, [fakturaContext.fakture, brojFakture]);


    return (
        <div style={{ padding: '3rem 10rem', width: '100%' }}>
            {faktura && <FakturaDetalji faktura={faktura} />}
        </div>
    )
}

export default FakturaDetaljiPage
