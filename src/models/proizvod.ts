interface Proizvod{
    sifra:string;
    osnovnaCena:number;
    naziv:string;
    tip:TipProizvoda;
    pdv:number;
}

export enum TipProizvoda{
    PROIZVOD = 'proizvod',
    USLUGA = 'usluga'
}

export default Proizvod;