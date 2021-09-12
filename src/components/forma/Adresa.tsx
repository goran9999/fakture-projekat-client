import React, { useState } from 'react'
import AdresaModel, { defaultAdresa } from '../../models/adresa'


interface Props {
    onChange: (izmenjenaAdresa: AdresaModel) => void
}

const Adresa = (props: Props) => {

    const [adresa, setAdresa] = useState(defaultAdresa)

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
            <div>
                <label htmlFor='postBroj'>Postanski broj</label>
                <input value={adresa.postBroj} onChange={promeniAdresuHandler} id='postBroj' name='postBroj' />
            </div>

            <div>
                <label htmlFor='grad'>Grad</label>
                <input value={adresa.grad} onChange={promeniAdresuHandler} id='grad' name='grad' />
            </div>

            <div>
                <label htmlFor='ulica'>Ulica</label>
                <input value={adresa.ulica} onChange={promeniAdresuHandler} id='ulica' name='ulica' />
            </div>

            <div>
                <label htmlFor='brUlice'>Broj ulice</label>
                <input value={adresa.brUlice} onChange={promeniAdresuHandler} id='brUlice' name='brUlice' />
            </div>
        </>
    )
}

export default Adresa
