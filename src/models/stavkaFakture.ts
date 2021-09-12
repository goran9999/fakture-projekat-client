import Proizvod, { defaultProizvod } from './proizvod'

export default interface StavkaFakture {
    proizvod: Proizvod
    kolicina: number
}

export const defaultStavkaFakture: StavkaFakture = {
    proizvod: defaultProizvod,
    kolicina: 1
}
