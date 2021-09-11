import React from "react";
import Faktura from "../../models/faktura";
import FakturaItem from "./FakturaItem";
import StavkaFakture from "../../models/stavkaFakture";

interface Props {
    fakture: Faktura[]
}

const ListaFaktura = (props: Props) => {

    function izracunajUkupanIznos(stavke: StavkaFakture[]): number {
        let ukupanIznos = 0;

        stavke.forEach(stavka => {
            let ukupnaVrednostStavke = stavka.proizvod.osnovnaCena * stavka.kolicina;
            ukupanIznos += ukupnaVrednostStavke + (ukupnaVrednostStavke * stavka.proizvod.pdv / 100);
        })

        return ukupanIznos;
        // return stavke.reduce((total, stavka) => stavka.proizvod.osnovnaCena + ((stavka.proizvod.osnovnaCena * stavka.proizvod.pdv) / 100) * stavka.kolicina, 0)
    }

    return (
        <ul>
            {props.fakture.map(f =>
                <FakturaItem
                    key={f.broj}
                    broj={f.broj}
                    imeIzdavaca={f.izdavac.naziv}
                    ukupanIznos={izracunajUkupanIznos(f.stavke)}
                    imeKupca={f.kupac.naziv}
                />
            )}
        </ul>
    )

}
export default ListaFaktura;