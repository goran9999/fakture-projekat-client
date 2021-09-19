import Komitent from "./komitent";
import Kupac from "./kupac";

export default interface Izdavac extends Komitent {
    sifra: string
    kupci: Kupac[]
}