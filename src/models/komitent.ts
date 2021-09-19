import Adresa from './adresa'

export default interface Komitent {
    naziv: string
    adresa: Adresa
    telefon: string,
    maticniBroj: string,
    email: string,
    pib?: string
}