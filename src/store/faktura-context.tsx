import React, { useState } from "react";
import Faktura from '../models/faktura'

type FakturaTip = {
    fakture: Faktura[],
    dodajFakturu: (faktura: Faktura) => void,
    postaviFakture: (fakture: Faktura[]) => void
}

export const FakturaContext = React.createContext<FakturaTip>({
    fakture: [],
    dodajFakturu: (faktura: Faktura) => { },
    postaviFakture: (fakture: Faktura[]) => { }
})

const FakturaProvider: React.FC = props => {


    const [fakture, setFakture] = useState<Faktura[]>([]);

    const dodajFakturuHandler = (faktura: Faktura) => {
        setFakture(prevFakture => {
            return prevFakture.concat(faktura);
        })
    }

    const postaviFaktureHandler = (fakture: Faktura[]) => {
        setFakture(fakture);
    }

    const fakturaValue = {
        fakture,
        dodajFakturu: dodajFakturuHandler,
        postaviFakture: postaviFaktureHandler
    }

    return (
        <FakturaContext.Provider value={fakturaValue}>
            {props.children}
        </FakturaContext.Provider>
    )
}
export default FakturaProvider;