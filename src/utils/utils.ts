import { StatusFakture } from "../models/faktura";
import StavkaFakture from "../models/stavkaFakture";
import Valuta from "../models/valuta";

export function izracunajUkupnuVrednostFakture(stavke: StavkaFakture[]): number {
    return stavke.reduce((total, s) => total + izracunajUkupnuVrednostStavke(s), 0)
}

export function izracunajUkupnuVrednostStavke(stavka: StavkaFakture): number {
    return (stavka.proizvod.osnovnaCena + ((stavka.proizvod.osnovnaCena * stavka.proizvod.pdv) / 100)) * stavka.kolicina;
}

export function formatirajDatum(datum: Date): string {
    return `${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}`
}

export function formatirajCenu(cena: number, valuta: Valuta): string {
    switch (valuta) {
        case Valuta.DINAR: return `${cena} RSD`;
        case Valuta.EVRO: return `€${cena}`;
        case Valuta.DOLAR: return `$${cena}`;
        default: throw Error('Prosledjena je losa valuta kao argument')
    }
}

export function vratiSkraceniNazivValute(valuta: Valuta): string {
    switch (valuta) {
        case Valuta.DINAR: return 'RSD';
        case Valuta.EVRO: return 'EUR';
        case Valuta.DOLAR: return 'USD';
        default: throw Error('Prosledjena je losa valuta kao argument')
    }
}

export function kapitalizujPrvoSlovo(s: string): string {
    return s.charAt(0).toUpperCase() + s.substr(1);
}

export function vratiCssKlasuStatusaFakture(status: StatusFakture): string {
    switch (status) {
        case StatusFakture.PLACENA: return 'status-placena';
        case StatusFakture.POSLATA: return 'status-poslata';
        case StatusFakture.KASNI: return 'status-kasni';
        case StatusFakture.STORNIRANA: return 'status-stornirana';
        case StatusFakture.PRIPREMA: return 'status-priprema'
        default: throw Error('Prosledjen je los status kao argument')
    }
}