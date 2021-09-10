import React,{useState,useEffect} from "react";
import AdresaModel from "../../models/adresa";

interface Props {
    sacuvajAdresu:(adresa:AdresaModel)=>void
}

const Adresa = (props:Props) =>{

    const [ulicaPrimaoca,setUlicaPrimaoca] = useState<string>();
    const [brojUlicePrimaoca,setBrojUlicePrimaoca] = useState<string>();
    const [gradPrimaoca,setGradPrimaoca] = useState<string>();
    const [postanskiBrojPrimaoca,setPostanskiBroj] = useState<number>();


    useEffect(()=>{
        if(ulicaPrimaoca && brojUlicePrimaoca && gradPrimaoca && postanskiBrojPrimaoca){
             const adresa:AdresaModel={
              grad:gradPrimaoca,
              ulica:ulicaPrimaoca,
              brUlice:brojUlicePrimaoca,
              postBroj:postanskiBrojPrimaoca
             }
             props.sacuvajAdresu(adresa);
        }
     },[ulicaPrimaoca,brojUlicePrimaoca,gradPrimaoca,postanskiBrojPrimaoca])
     

    const postaviUlicu = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setUlicaPrimaoca(event.target.value);
    }
    const postaviBrojUlice = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setBrojUlicePrimaoca(event.target.value);
    }
    const postaviGrad = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setGradPrimaoca(event.target.value);
    }
    const postaviBroj = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPostanskiBroj(+event.target.value);
    }

    return <div>
        <label htmlFor='ulicaPrimaoca'>Ulica</label>
            <input onBlur={postaviUlicu} type='text' id='ulicaPrimaoca' />
            <label htmlFor='brojUlicePrimaoca'>Broj Ulice</label>
            <input onBlur={postaviBrojUlice} type='text' id='brojUlicaPrimaoca' />
            <label htmlFor='Primaoca'>Grad</label>
            <input onBlur={postaviGrad} type='text' id='gradPrimaoca'/>
            <label htmlFor='postanskiBrojPrimaoca'>Postanski Broj</label>
            <input onBlur={postaviBroj} type='number' id='postanskiBrojPrimaoca' />
    </div>

}
export default Adresa;