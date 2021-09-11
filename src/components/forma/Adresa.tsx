import React, { useState } from "react";
import AdresaModel from "../../models/adresa";

interface Props {
    sacuvajAdresu: (adresa: AdresaModel) => void
}

const Adresa = (props: Props) => {

    const [grad, setGrad] = useState('');
    const [postBroj, setPostBroj] = useState<number>();
    const [ulica, setUlica] = useState('');
    const [brUlice, setBrUlice] = useState('');


    if (grad && postBroj && ulica && brUlice) {
        const adresa: AdresaModel = {
            grad: grad,
            ulica: ulica,
            brUlice: brUlice,
            postBroj: postBroj
        }

        props.sacuvajAdresu(adresa);
    }


    const promeniGradHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGrad(event.target.value);
    }

    const promeniPostBrojHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostBroj(+event.target.value);
    }

    const promeniUlicuHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUlica(event.target.value);
    }

    const promeniBrUliceHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrUlice(event.target.value);
    }

    return (
        <div>
            <label htmlFor='grad'>Grad</label>
            <input value={grad} onChange={promeniGradHandler} id='grad' />
            <label htmlFor='postBroj'>Postanski Broj</label>
            <input value={postBroj} onChange={promeniPostBrojHandler} id='Postanski' />
            <label htmlFor='ulica'>Ulica</label>
            <input value={ulica} onChange={promeniUlicuHandler} id='ulica' />
            <label htmlFor='brUlice'>Broj Ulice</label>
            <input value={brUlice} onChange={promeniBrUliceHandler} id='brUlice' />
        </div>
    )
}
export default Adresa;