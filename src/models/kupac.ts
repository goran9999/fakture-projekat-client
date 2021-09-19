import Komitent from "./komitent";

export default interface Kupac extends Komitent {
    tip: TipKupca
}

export enum TipKupca {
    PRAVNO_LICE = 'pravno lice',
    FIZICKO_LICE = 'fizicko lice'
}