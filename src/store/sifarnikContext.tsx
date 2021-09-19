import React, { useState } from "react";
import Kupac from '../models/kupac'

type SifarnikTip = {
    kupci: Kupac[]
    dodajKupca: (kupac: Kupac) => void,
    postaviKupce: (kupci: Kupac[]) => void
}

export const SifarnikContext = React.createContext<SifarnikTip>({
    kupci: [],
    dodajKupca: (kupac: Kupac) => { },
    postaviKupce: (kupci: Kupac[]) => { }
})

const SifarnikProvider: React.FC = (props) => {

    const [kupci, setKupci] = useState<Kupac[]>([]);

    const dodajKupcaHandler = (kupac: Kupac) => {
        setKupci(prevKupci => {
            return [kupac, ...prevKupci];
        })
    }

    const postaviKupceHandler = (kupci: Kupac[]) => {
        setKupci(kupci);
    }

    const kupacValue = {
        kupci: kupci,
        dodajKupca: dodajKupcaHandler,
        postaviKupce: postaviKupceHandler
    }

    return (
        <SifarnikContext.Provider value={kupacValue}>
            {props.children}
        </SifarnikContext.Provider>
    )
}

export default SifarnikProvider;