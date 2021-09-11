import Adresa from "./adresa";
import Entitet from './entitet'
import StavkaFakture from './stavkaFakture'
import Valuta from "./valuta";

export default interface Faktura {
    broj: string
    izdavac: Entitet
    kupac: Entitet
    datumIzdavanja: Date
    mestoIzdavanja: Adresa
    rokPlacanja: Date
    stavke: StavkaFakture[]
    valutaPlacanja: Valuta
    status: StatusFakture
}

export enum StatusFakture {
    POSLATA = "poslata",
    PLACENA = "placena",
    STORNIRANA = "stornirana",
    KASNI = "kasni",
    PRIPREMA = "priprema"
}

