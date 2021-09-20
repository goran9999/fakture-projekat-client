import React, { useState } from "react";
import IzdavacModel from '../models/izdavac'
 
type Izdavac ={
    izdavac:IzdavacModel,
    dodajIzdavaca:(izdavac:IzdavacModel) => void
}

const defaultIzdavac:IzdavacModel = {
    sifra:'',
    kupci:[],
    naziv:'',
    adresa:{
        postBroj:0,
        grad:''
    },
    telefon:'',
    maticniBroj:'',
    email:''
}

export const IzdavacContext = React.createContext<Izdavac>({

    izdavac: defaultIzdavac,
    dodajIzdavaca:(izdavac:IzdavacModel) => {}

})



  const IzdavacProvider:React.FC = (props) => {

    const [izdavac,setIzdavac] = useState(defaultIzdavac);


    const dodajIzdavacaHandler = (izdavac:IzdavacModel) => {
        setIzdavac(izdavac);
        
    }
    
    
    const izdavacValue = {
        
        izdavac:izdavac,
        dodajIzdavaca:dodajIzdavacaHandler

    }
    

    return <IzdavacContext.Provider value={izdavacValue}>
        {props.children}
    </IzdavacContext.Provider>

}
export default IzdavacProvider;