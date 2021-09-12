export default interface Adresa {
    postBroj: number
    grad: string
    ulica?: string
    brUlice?: string
}

export const defaultAdresa: Adresa = {
    postBroj: 0,
    grad: '',
}