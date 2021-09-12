import Adresa from './adresa'

// pronaci bolji naziv interfejsa
export default interface Komitent {
    naziv: string
    adresa: Adresa
    telefon: string,
    maticniBroj: string,
    pib?: string
}

export enum TipKomitenta {
    FIZICKO_LICE,
    PRAVNO_LICE
}

export const defaultKomitent: Komitent = {
    pib: '',
    naziv: '',
    maticniBroj: '',
    adresa: {
        postBroj: 0,
        grad: '',
        ulica: '',
        brUlice: ''
    },
    telefon: ''
}