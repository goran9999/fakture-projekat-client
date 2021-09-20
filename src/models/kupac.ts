import { defaultAdresa } from "./adresa";
import Komitent from "./komitent";

export default interface Kupac extends Komitent {
    tip: TipKupca
}

export enum TipKupca {
    PRAVNO_LICE = 'pravno lice',
    FIZICKO_LICE = 'fizicko lice'
}

export const defaultKupac: Kupac = {
    naziv: '',
    adresa: defaultAdresa,
    telefon: '',
    maticniBroj: '',
    email: '',
    pib: '',
    tip: TipKupca.PRAVNO_LICE
}