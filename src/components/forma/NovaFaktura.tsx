import React,{useState,useRef, useEffect} from "react";
import Card from "../UI/Card";
import StavkaFaktureItem from "./StavkaFaktureItem";
import './NovaFaktura.css'
import Primalac from './Primalac'
import AdresaModel from "../../models/adresa";
import Adresa from "./Adresa";
import StavkaFakture from "../../models/stavkaFakture";
import Entitet from "../../models/entitet";
import Faktura from "../../models/faktura";
import { StatusFakture } from "../../models/faktura";
import Valuta from '../../models/valuta'

const initialEntitet:Entitet ={
    naziv:'',
    adresa:{
        postBroj:0,
        grad:'',
        ulica:'',
        brUlice:''
    },
    telefon:''
}
const initialAdresa:AdresaModel = {
    grad:'',
    ulica:'',
    postBroj:0,
    brUlice:''
}


const NovaFaktura = () => {

    const sacuvajStavkuHandler = (stavka:StavkaFakture) =>{
        setPopunjeneStavke(prevStavke=>{
            return prevStavke.concat(stavka);
        })
    }

    const [stavke,setStavke] = useState([<StavkaFaktureItem sacuvajStavku={sacuvajStavkuHandler}/>]);
    const [popunjeneStavke,setPopunjeneStavke] = useState<StavkaFakture[]>([]);
    const [mestoIzdavanja,setMestoIzdavanja] = useState(initialAdresa);
    const [datumIzdavanja,setDatumIzdavanja] = useState(new Date())
    const [adresa,setAdresa] = useState(initialAdresa);
    const [kupac,setKupac] = useState(initialEntitet);
    const [ukupanIznos,setUkupanIznos] = useState(0);
    const [izdavac,setIzdavac] = useState(initialEntitet);
    const [valuta, setValuta] = useState(Valuta.DINAR)
    const [status,setStatus] = useState(StatusFakture.PRIPREMA);
    const [rokPlacanja, setRokPlacanja] = useState(new Date());

    const idFaktureRef = useRef<HTMLInputElement>(null);
    const imePreduzecaRef = useRef<HTMLInputElement>(null);
    const brojTelefonaRef = useRef<HTMLInputElement>(null);
    const datumIzdavanjaRef = useRef<HTMLInputElement>(null);
    const rokPlacanjaRef =  useRef<HTMLInputElement>(null);

    useEffect(()=>{
        const naziv=imePreduzecaRef.current!.value;
        const brTelefona = brojTelefonaRef.current!.value;
        if(naziv && brTelefona){
        const izdavac:Entitet={
            naziv:naziv,
            telefon:brTelefona,
            adresa:adresa
        }
        setIzdavac(izdavac);
    }
    },[imePreduzecaRef.current?.value,brojTelefonaRef.current?.value])
    
    

    const dodajStavku = (event:React.FormEvent) =>{
        event.preventDefault();
        const novaStavka = <StavkaFaktureItem sacuvajStavku={sacuvajStavkuHandler} />
        
        setStavke(prevStavke=>{
           return prevStavke.concat(novaStavka)
        })
    }

   
   
    const sacuvajKupcaHandler = (kupac:Entitet) =>{
        setKupac(kupac);
    }
  
    const sacuvajAdresuHandler = (adresa:AdresaModel) =>{
        setAdresa(adresa);
    }

    const postaviStatusHandler = (event:React.FormEvent<HTMLSelectElement>) =>{
        
        const status = event.currentTarget.value as StatusFakture;
        setStatus(status);
        
    }

    const promeniValutuHandler = (event:React.FormEvent<HTMLSelectElement>) => {
        const valuta = event.currentTarget.value as Valuta;
        setValuta(valuta);
    }

    const sacuvajMestoIzdavanjaHandler = (mestoIzdavanja:AdresaModel) =>{
        setMestoIzdavanja(mestoIzdavanja);
    } 

    const promeniRokPlacanjaHandler = (event:React.FormEvent<HTMLInputElement>) => {
        const rokPlacanja = event.currentTarget.value;
        rokPlacanjaRef.current!.value = rokPlacanja;
        const rok = new Date(rokPlacanja);
        setRokPlacanja(rok);
    }

    const sacuvajDatumIzdavanjaHandler = (event:React.FormEvent<HTMLInputElement>) =>{
        const datumIzdavanja = event.currentTarget.value;
        datumIzdavanjaRef.current!.value=datumIzdavanja;
        const datum = new Date(datumIzdavanja);
        setDatumIzdavanja(datum);
    }

    const sacuvajFakturuHandler = async (event:React.FormEvent) =>{

        event.preventDefault();
        const faktura:Faktura={
            broj:idFaktureRef.current!.value,
            kupac:kupac,
            stavke:popunjeneStavke,
            izdavac:izdavac,
            datumIzdavanja: datumIzdavanja,
            status:status,
            valuta: valuta,
            mestoIzdavanja:mestoIzdavanja,
            rokPlacanja:rokPlacanja
        }
 
       try {
           const response = await fetch('http://localhost:5000/api/faktura',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(faktura)
        })
        if(!response.ok){
            throw new Error('Problem u cuvanju fakture.')
        }
        console.log('Faktura uspesno sacuvana')
        console.log(faktura);
       } catch (e) {
           console.log(e)
       }
        
       
        
    }

    return <Card>
        <form className='form' onSubmit={sacuvajFakturuHandler}>

    
        <label htmlFor='id'>Broj Fakture</label>
        <input ref={idFaktureRef} type='number' id='id' />
        <label htmlFor='ime'>Ime Preduzeca</label>
        <input ref={imePreduzecaRef} type='text' id='ime' />
        <label htmlFor='broj'>Broj Telefona</label>
        <input ref={brojTelefonaRef} type='tel' id='broj' />
        <Adresa sacuvajAdresu={sacuvajAdresuHandler} />
        
        <label htmlFor='datumIzdavanja'>Datum izdavanja</label>
        <input onChange={sacuvajDatumIzdavanjaHandler} ref={datumIzdavanjaRef} type='date' id='datumIzdavanja' />
        <label>Mesto izdavanja</label>
        <Adresa sacuvajAdresu={sacuvajMestoIzdavanjaHandler}/>

        <section>
            <h4>Opis</h4>
            <h4>Jedinicna cena</h4>
            <h4>Kolicina</h4>
            <h4>Ukupno</h4>
        </section>
        {stavke}
        <button onClick={dodajStavku}>+</button>
        
        <select value={valuta} onChange={promeniValutuHandler}>
            <option value='dinar'>RSD</option>
            <option value='evro'>EUR</option>
            <option value='dolar'>USD</option>
        </select>
        
        <select value={status} onChange={postaviStatusHandler}>
            <option value="priprema">Priprema</option>
            <option value="poslata">Poslata</option>
            <option value="placena">Placena</option>
        </select>


        <label htmlFor='rokPlacanja'>Rok placanja</label>
        <input onChange={promeniRokPlacanjaHandler} ref={rokPlacanjaRef} type='date' id='rokPlacanja' />

        <h3>Naplati od</h3>
        <Primalac sacuvajKupca={sacuvajKupcaHandler} />

        <h5>Ukupan Iznos:{ukupanIznos}</h5>
        <button type='submit'>Sacuvaj Fakturu</button>
        <button  type='reset'>Odustani</button>

        </form>

    </Card>


}
export default NovaFaktura;