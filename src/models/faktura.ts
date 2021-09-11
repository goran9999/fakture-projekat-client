import Adresa from "./adresa";
import Entitet from "./entitet";
import StavkaFakture from "./stavkaFakture";
import Valuta from './valuta'

interface Faktura {
    broj: string;
    kupac: Entitet;
    stavke: StavkaFakture[];
    izdavac: Entitet;
    datumIzdavanja: Date;
    rokPlacanja: Date,
    valutaPlacanja: Valuta
    mestoIzdavanja: Adresa;
    status: StatusFakture;
}

export enum StatusFakture {
    POSLATA = "poslata",
    PLACENA = "placena",
    STORNIRANA = "stornirana",
    KASNI = "kasni",
    PRIPREMA = "priprema"
}

export default Faktura;