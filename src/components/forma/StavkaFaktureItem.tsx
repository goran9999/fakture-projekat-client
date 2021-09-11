import React, { useState } from 'react'
import StavkaFakture from '../../models/stavkaFakture';
import { TipProizvoda } from '../../models/proizvod';
import Proizvod from '../../models/proizvod';

interface Props {
    sacuvajStavku: (stavka: StavkaFakture) => void
}

const StavkaFaktureItem = (props: Props) => {

    const [sifra, setSifra] = useState('');
    const [naziv, setNaziv] = useState('');
    const [osnovnaCena, setOsnovnaCena] = useState<number>();
    const [pdv, setPdv] = useState<number>();
    const [tip, setTip] = useState(TipProizvoda.PROIZVOD);
    const [kolicina, setKolicina] = useState(1);

    const promeniNazivHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNaziv(event.target.value);
    }

    const promeniOsnovnuCenuHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOsnovnaCena(+event.target.value);
    }

    const promeniKolicinuHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKolicina(+event.target.value);
    }

    const promeniSifruHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSifra(event.target.value);
    }

    const promeniPdvHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPdv(+event.target.value);
    }

    const promeniTipHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTip(event.target.value as TipProizvoda);
    }


    if (naziv && sifra && osnovnaCena && pdv && tip && kolicina) {

        const proizvod: Proizvod = {
            sifra: sifra,
            naziv: naziv,
            osnovnaCena: osnovnaCena,
            tip: tip,
            pdv: pdv
        }

        const stavka: StavkaFakture = {
            proizvod: proizvod,
            kolicina: kolicina
        }

        props.sacuvajStavku(stavka);
    }

    return (
        <div>
            <span>
                <input value={sifra} onChange={promeniSifruHandler} />
                <input value={naziv} onChange={promeniNazivHandler} />
                <select value={tip} onChange={promeniTipHandler} name="Tip Proizvoda">
                    <option value="proizvod">Proizvod</option>
                    <option value="usluga">Usluga</option>
                </select>
                <input value={kolicina} onChange={promeniKolicinuHandler} />
                <input value={osnovnaCena} onChange={promeniOsnovnuCenuHandler} />
                <input value={pdv} onChange={promeniPdvHandler} />
            </span>
        </div>
    )
}
export default StavkaFaktureItem;