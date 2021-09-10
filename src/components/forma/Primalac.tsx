import React,{useEffect, useRef, useState} from "react";
import Entitet from "../../models/entitet";
import Adresa from "./Adresa";
import AdresaModel from "../../models/adresa";
import { FizickoLice,PravnoLice } from "../../models/entitet";

const initialAdresa:AdresaModel = {
    grad:'',
    ulica:'',
    postBroj:0,
    brUlice:''
}

interface Props {
    sacuvajKupca:(kupac:FizickoLice | PravnoLice) => void
}

const Primalac = (props:Props) => {

    const [imePrimaoca,setImePrimaoca] = useState<string>();
    const [adresa,setAdresa] = useState(initialAdresa);
    const [brojTelefonaPrimaoca,setBrojTelefona] = useState<string>();
    const [idPrimaoca,setIdPrimaoca] = useState<string>();

    const postaviNaziv = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setImePrimaoca(event.target.value);
    }
   
    const postaviBrojTelefona = (event:React.ChangeEvent<HTMLInputElement>) => {
       setBrojTelefona(event.target.value)
    }

    const postaviId = (event:React.ChangeEvent<HTMLInputElement>) => {
        setIdPrimaoca(event.target.value);
    }

    const sacuvajAdresuHandler = (adresa:AdresaModel) =>{
        setAdresa(adresa);
    }
    
    useEffect(()=>{
        if(imePrimaoca && brojTelefonaPrimaoca && idPrimaoca) {
            
            const kupac:FizickoLice | PravnoLice={
                naziv:imePrimaoca,
                adresa:adresa,
                telefon:brojTelefonaPrimaoca,
                jmbg:idPrimaoca,
                pib:idPrimaoca
            }
            props.sacuvajKupca(kupac);
        }
    },[imePrimaoca,brojTelefonaPrimaoca,idPrimaoca])
   

    return <div>
            <label htmlFor='imePrimaoca' >Ime | Preduzece</label>
            <input value={imePrimaoca} onChange={postaviNaziv} type='text' id='imePrimaoca' />
            <span>
             <label htmlFor='id'>PIB | JMBG</label>
             <input value={idPrimaoca} onChange={postaviId} type='text' id='id' />
             <Adresa sacuvajAdresu={sacuvajAdresuHandler} />
            <label htmlFor='brojPrimaoca'>Broj Telefona</label>
            <input value={brojTelefonaPrimaoca} onChange={postaviBrojTelefona} type='tel' id='brojPrimaoca' />
            </span>
    </div>


}
export default Primalac;