import React, { useState } from 'react'
import AdresaModel, { defaultAdresa } from '../../models/adresa'

import styles from './NovaFakturaForma.module.css'


interface Props {
    onChange: (izmenjenaAdresa: AdresaModel) => void,
    obaveznaPolja: boolean
}

const Adresa = ({ onChange, obaveznaPolja }: Props) => {

    const [adresa, setAdresa] = useState(defaultAdresa)

    const promeniAdresuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nazivPolja = e.target.name;
        const izmenjenaAdresa: AdresaModel = {
            ...adresa,
            [nazivPolja]: nazivPolja === 'postBroj' ? +e.target.value : e.target.value
        }
        setAdresa(izmenjenaAdresa)
        onChange(izmenjenaAdresa)
    }

    return (
        <>
            <div className={styles['form-element']}>
                <label htmlFor='postBroj'>Postanski broj *</label>
                <input value={adresa.postBroj} onChange={promeniAdresuHandler} id='postBroj' name='postBroj' />
            </div>

            <div className={styles['form-element']}>
                <label htmlFor='grad'>Grad *</label>
                <input value={adresa.grad} onChange={promeniAdresuHandler} id='grad' name='grad' />
            </div>

            <div className={styles['form-element']}>
                <label htmlFor='ulica'>Ulica {obaveznaPolja ? '*' : ''}</label>
                <input value={adresa.ulica} onChange={promeniAdresuHandler} id='ulica' name='ulica' />
            </div>

            <div className={styles['form-element']}>
                <label htmlFor='brUlice'>Broj ulice {obaveznaPolja ? '*' : ''}</label>
                <input value={adresa.brUlice} onChange={promeniAdresuHandler} id='brUlice' name='brUlice' />
            </div>
        </>
    )
}

export default Adresa
