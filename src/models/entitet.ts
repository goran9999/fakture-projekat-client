import Adresa from "./adresa";

export default interface Entitet {
    naziv: string;
    adresa: Adresa;
    telefon: string
}

export interface FizickoLice extends Entitet {
    jmbg: string
}

export interface PravnoLice extends Entitet {
    pib: string
}