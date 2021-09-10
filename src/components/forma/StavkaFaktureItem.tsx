import React,{useEffect, useState} from 'react'
import StavkaFakture from '../../models/stavkaFakture';
import { TipProizvoda } from '../../models/proizvod';
import Proizvod from '../../models/proizvod';

interface Props {
    sacuvajStavku: (stavka: StavkaFakture) => void
}

const StavkaFaktureItem = (props: Props) =>{

    const [sifra,setSifra] = useState('');
    const [naziv,setNaziv] = useState('');
    const [osnovnaCena,setOsnovnaCena] = useState<number>();
    const [pdv,setPdv] = useState<number>();
    const [tip,setTip] = useState(TipProizvoda.PROIZVOD);
    const [kolicina,setKolicina] = useState(1);

    const dodajNaziv = (event:React.ChangeEvent<HTMLInputElement>) =>{
       setNaziv(event.target.value);
    }

    const dodajOsnovnuCenu = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setOsnovnaCena(+event.target.value);
    }

    const dodajKolicinu = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setKolicina(+event.target.value);
    }

    const dodajSifru = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setSifra(event.target.value);
    }
    
    const dodajPdv = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setPdv(+event.target.value);
    }

    const dodajTip = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        const tip = event.target.value as TipProizvoda;
        setTip(tip);
    }



    useEffect(()=>{

        if(naziv && sifra && osnovnaCena && pdv &&tip && kolicina){
    
        const proizvod:Proizvod = {
            sifra,
            naziv,
            osnovnaCena,
            tip,
            pdv
        }
        const stavka:StavkaFakture = {
            proizvod,
            kolicina
        }
        props.sacuvajStavku(stavka);
        }
    },[naziv,sifra,osnovnaCena,pdv,tip,kolicina])
   


    return <div>
        <span>
            <input value={sifra} onChange={dodajSifru} type='text' id='opis' />
            <input value={naziv} onChange={dodajNaziv} type='text' id='opis' />
            <input value={osnovnaCena} onChange={dodajOsnovnuCenu} type='text' id='jedCena' />
            <input value={pdv} onChange={dodajPdv} type='text' id='opis' />
            <select value={tip} onChange={dodajTip} name="Tip Proizvoda">
                <option value="proizvod">Proizvod</option>
                <option value="usluga">Usluga</option>
            </select>    
            <input value={kolicina} onChange={dodajKolicinu} type='text' id='kolicina' />
            
        </span>
    </div>

}
export default StavkaFaktureItem;