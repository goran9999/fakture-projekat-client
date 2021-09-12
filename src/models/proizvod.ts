export default interface Proizvod {
    sifra: string
    naziv: string
    osnovnaCena: number
    pdv: number
    tip: TipProizvoda
}

export enum TipProizvoda {
    PROIZVOD = "proizvod",
    USLUGA = "usluga"
}

export const defaultProizvod: Proizvod = {
    sifra: '',
    naziv: '',
    osnovnaCena: 0,
    pdv: 0,
    tip: TipProizvoda.PROIZVOD
}