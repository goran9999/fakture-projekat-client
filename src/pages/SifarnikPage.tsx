import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from '../components/fakture/listaFaktura/ListaFaktura.module.css'
import Kupac from "../models/kupac";
import { SifarnikContext } from "../store/sifarnikContext";

const SifarnikPage = () => {

    const sifarnikContext = useContext(SifarnikContext)
    const [kupci, setKupci] = useState<Kupac[]>([]);

    useEffect(() => {
        if (sifarnikContext.kupci.length === 0) {
            fetch('http://localhost:5000/api/sifarnik')
                .then(res => res.json())
                .then(data => {
                    const kupci = data[0].kupci as Kupac[]
                    sifarnikContext.postaviKupce(kupci)
                    setKupci(kupci);
                })
        } else {
            setKupci(sifarnikContext.kupci)
        }

    }, [sifarnikContext])

    return (
        <div style={{ padding: '3rem 2rem' }}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.tr}>
                        <th className={styles.th}>Mat. broj</th>
                        <th className={styles.th}>PIB</th>
                        <th className={styles.th}>Naziv</th>
                        <th className={styles.th}>E-mail</th>
                        <th className={styles.th}>Telefon</th>
                    </tr>
                </thead>
                <tbody>
                    {kupci.map((k) =>
                        <tr key={k.maticniBroj}>
                            <td className={styles.td}>{k.maticniBroj}</td>
                            <td className={styles.td}>{k.pib || '/'}</td>
                            <td className={styles.td}>{k.naziv}</td>
                            <td className={styles.td}>{k.email}</td>
                            <td className={styles.td}>{k.telefon}</td>
                        </tr>
                    )}
                </tbody>

            </table>

            <Link style={{ color: 'black' }} to='/sifarnik/dodaj-kupca'>Dodaj kupca</Link>

        </div>
    )
}

export default SifarnikPage