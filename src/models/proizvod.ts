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