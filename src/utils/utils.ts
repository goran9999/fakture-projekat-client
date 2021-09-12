import { StatusFakture } from "../models/faktura";

export function formatirajDatum(datum: Date): string {
    return `${datum.getDate()}.${datum.getMonth()}.${datum.getFullYear()}`
}

export function vratiCssKlasuStatusaFakture(status: StatusFakture): string {
    switch (status) {
        case StatusFakture.PLACENA: return 'status-placena';
        case StatusFakture.POSLATA: return 'status-poslata';
        case StatusFakture.KASNI: return 'status-kasni';
        case StatusFakture.STORNIRANA: return 'status-stornirana';
        default: throw Error('Prosledjen je los status')
    }
}