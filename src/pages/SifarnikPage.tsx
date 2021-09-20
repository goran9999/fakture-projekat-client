import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Sifarnik from "../components/sifarnik/Sifarnik";
import Kupac from "../models/kupac";
import { SifarnikContext } from "../store/sifarnikContext";

const SifarnikPage = () => {

    const sifarnikContext = useContext(SifarnikContext)

    useEffect(() => {

        if (sifarnikContext.kupci.length === 0) {

            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            fetch('http://localhost:5000/api/sifarnik', { headers: { 'auth-token': token.toString() } })
                .then(res => res.json())
                .then(data => {
                    sifarnikContext.postaviKupce(data as Kupac[])
                })
        }

    }, [sifarnikContext])

    return (
        <div style={{ padding: '3rem 2rem', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Sifarnik kupci={sifarnikContext.kupci} />
            <Link to='/sifarnik/dodaj-kupca'>Dodaj kupca</Link>
        </div>
    )
}

export default SifarnikPage