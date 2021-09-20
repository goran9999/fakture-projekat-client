import React, { useContext, useEffect, useState } from 'react'
import ListaFaktura from '../components/fakture/listaFaktura/ListaFaktura'
import Faktura, { StatusFakture } from '../models/faktura'
import { FakturaContext } from '../store/faktura-context'
import Modal from '../UI/Modal/Modal'
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

            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            fetch('http://localhost:5000/api/fakture', { headers: { 'auth-token': token.toString() } })
                .then(res => res.json())
                .then(data => {
                    const fakture = data as Faktura[]
                    fakturaContext.postaviFakture(fakture);
                    setFakture(fakture)
                });
        } else {
            setFakture(fakturaContext.fakture)
        }

    }, [fakturaContext])

    const filtrirajFakture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === FilterStanje.SVE) {
            setFakture(fakturaContext.fakture);
            setPrimenjenFilter(FilterStanje.SVE)
        } else {
            const status = event.target.value as StatusFakture;
            setFakture(fakturaContext.fakture.filter(f => f.status === status));
            setPrimenjenFilter(event.target.value as FilterStanje)
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
                            <input
                                type='radio'
                                value={FilterStanje.SVE}
                                onChange={filtrirajFakture}
                                checked={primenjenFilter === FilterStanje.SVE}
                            />
                            <label>Priprema</label>
                            <input
                                type='radio'
                                value={FilterStanje.PRIPREMA}
                                onChange={filtrirajFakture}
                                checked={primenjenFilter === FilterStanje.PRIPREMA}
                            />
                            <label>Poslata</label>
                            <input
                                onChange={filtrirajFakture}
                                type='radio'
                                value={FilterStanje.POSLATA}
                                checked={primenjenFilter === FilterStanje.POSLATA}
                            />
                            <label>Placena</label>
                            <input
                                type='radio'
                                value={FilterStanje.PLACENA}
                                onChange={filtrirajFakture}
                                checked={primenjenFilter === FilterStanje.PLACENA}
                            />
                            <label>Kasni</label>
                            <input
                                type='radio'
                                value={FilterStanje.KASNI}
                                onChange={filtrirajFakture}
                                checked={primenjenFilter === FilterStanje.KASNI}
                            />
                            <label>Stornirana</label>
                            <input
                                type='radio'
                                value={FilterStanje.STORNIRANA}
                                onChange={filtrirajFakture}
                                checked={primenjenFilter === FilterStanje.STORNIRANA}
                            />
                        </div>
                    </div>
                </Modal>
            }

            <ListaFaktura
                onOmoguciFiltriranje={omoguciFiltriranje}
                fakture={fakture}
                primenjenFilter={primenjenFilter}
            />
        </>
    )
}

export default HomePage