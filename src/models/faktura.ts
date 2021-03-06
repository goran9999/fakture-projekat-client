import Adresa from "./adresa";
import Izdavac from "./izdavac";
import Kupac from "./kupac";

import StavkaFakture from './stavkaFakture'
import Valuta from "./valuta";

export default interface Faktura {
    broj: string
    izdavac: Izdavac
    kupac: Kupac
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

