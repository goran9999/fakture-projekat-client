import React, { useState } from 'react'
import AdresaModel from '../../models/adresa'


interface Props {
    onChange: (izmenjenaAdresa: AdresaModel) => void
}

const Adresa = (props: Props) => {

    const [adresa, setAdresa] = useState<AdresaModel>({
        postBroj: 0,
        grad: '',
        ulica: '',
        brUlice: ''
    })

    const promeniAdresuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nazivPolja = e.target.name;
        const izmenjenaAdresa: AdresaModel = {
            ...adresa,
            [nazivPolja]: nazivPolja === 'postBroj' ? +e.target.value : e.target.value
        }
        setAdresa(izmenjenaAdresa)
        props.onChange(izmenjenaAdresa)
    }

    return (
        <>
            <label htmlFor='postBroj'>Postanski broj</label>
            <input value={adresa.postBroj} onChange={promeniAdresuHandler} id='postBroj' name='postBroj' />
            <label htmlFor='grad'>Grad</label>
            <input value={adresa.grad} onChange={promeniAdresuHandler} id='grad' name='grad' />
            <label htmlFor='ulica'>Ulica</label>
            <input value={adresa.ulica} onChange={promeniAdresuHandler} id='ulica' name='ulica' />
            <label htmlFor='brUlice'>Broj ulice</label>
            <input value={adresa.brUlice} onChange={promeniAdresuHandler} id='brUlice' name='brUlice' />
        </>
    )
}

export default Adresa
