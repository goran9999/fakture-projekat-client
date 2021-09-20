import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import AdresaModel, { defaultAdresa } from '../../../models/adresa';
import Faktura, { StatusFakture } from '../../../models/faktura';
import Kupac from '../../../models/kupac';
import StavkaFakture, { defaultStavkaFakture } from '../../../models/stavkaFakture';
import Valuta from '../../../models/valuta';
import { FakturaContext } from '../../../store/faktura-context';
import { SifarnikContext } from '../../../store/sifarnikContext';
import Modal from '../../../UI/Modal/Modal';
import { vratiSkraceniNazivValute } from '../../../utils/utils';
import Adresa from '../../adresa/Adresa';
import DodataStavkaItem from '../../forme/novaFaktura/DodataStavkaItem';
import DodavanjeStavke from './DodavanjeStavke';
import IzmenaDodateStavke from '../../forme/novaFaktura/IzmenaDodateStavke';
import { IzdavacContext } from '../../../store/izdavac-context';

const NovaFakturaForma = () => {

    const history = useHistory()
    const sifarnikContext = useContext(SifarnikContext);
    const izdavacContext = useContext(IzdavacContext);
    const { dodajFakturu } = useContext(FakturaContext);

    const [broj, setBroj] = useState('');
    const [datumIzdavanja, setDatumIzdavanja] = useState('');
    const [rokPlacanja, setRokPlacanja] = useState('');
    const [valutaPlacanja, setValutaPlacanja] = useState(Valuta.DINAR);
    const [mestoIzdavanja, setMestoIzdavanja] = useState<AdresaModel>(defaultAdresa)
    const [stavkeFakture, setStavkeFakture] = useState<StavkaFakture[]>([]);

    const [kupac, setKupac] = useState<Kupac>();
    const [maticniBrojKupca, setMaticniBrojKupca] = useState('');
    const [prikaziModalZaIzborKupca, setPrikaziModalZaIzborKupca] = useState(false);
    const [prikaziModalZaDodavanjeStavke, setPrikaziModalZaDodavanjeStavke] = useState(false);
    const [prikaziModalZaIzmenuStavke, setPrikaziModalZaIzmenuStavke] = useState(false);
    const [stavkaZaIzmenu, setStavkaZaIzmenu] = useState<StavkaFakture>(defaultStavkaFakture);


    const sacuvajFakturuHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(izdavacContext.izdavac);
        const faktura: Faktura = {
            // izdavac je ovde za sada radi testiranja
            // izdavac: {
            //     maticniBroj: '12345',
            //     pib: '81924712',
            //     naziv: 'Google',
            //     email: 'google@google.com',
            //     sifra: '',
            //     adresa: defaultAdresa,
            //     telefon: '',
            //     kupci: []
            // },
            izdavac:izdavacContext.izdavac,
            broj: broj,
            datumIzdavanja: new Date(datumIzdavanja),
            rokPlacanja: new Date(rokPlacanja),
            valutaPlacanja: valutaPlacanja,
            mestoIzdavanja: mestoIzdavanja,
            stavke: stavkeFakture,
            kupac: kupac!,
            status: StatusFakture.POSLATA
        }

        try {

            const token = localStorage.getItem('token');
            if(!token){
                return;
            }
            const response = await fetch('http://localhost:5000/api/fakture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token' : token.toString()
                },
                body: JSON.stringify(faktura)
            });

            const resJson = await response.json();

            if (response.status !== 201) {
                console.log('Greska prilikom kreiranja fakture');
                console.log(resJson.message);
            } else {
                dodajFakturu(faktura);
                history.replace('/');
            }
        } catch (e) {
            console.log('Greska prilikom kreiranja fakture');
            console.log(e);
        }
    }

    const postaviKupcaHandler = async () => {

        let kupci = sifarnikContext.kupci;
        if (kupci.length === 0) {
            try {
                const response = await fetch('http://localhost:5000/api/sifarnik');
                const resJson = await response.json();
                if (!response.ok) {
                    console.log('Greska prilikom vracanja kupaca');
                    console.log(resJson.message)
                } else {
                    kupci = resJson.kupci as Kupac[];
                    sifarnikContext.postaviKupce(kupci)
                }
            } catch (e) {
                console.log(e);
            }
        }

        const kupac = kupci.find(k => k.maticniBroj === maticniBrojKupca);
        if (!kupac) {
            alert(`Kupac sa maticnim brojem ${maticniBrojKupca} ne postoji u vasem sifarniku`)
        } else {
            setKupac(kupac);
            setPrikaziModalZaIzborKupca(false)
        }
    }

    const promeniMestoIzdavanjaHandler = (mesto: AdresaModel) => {
        setMestoIzdavanja(mesto);
    }

    const ukloniStavkuHandler = (sifraProizvoda: string) => {
        setStavkeFakture(prevStavke => {
            return prevStavke.filter(s => s.proizvod.sifra !== sifraProizvoda)
        })
    }

    const dodajStavkuHandler = (stavka: StavkaFakture) => {
        setStavkeFakture(prevStavke => [...prevStavke, stavka]);
        setPrikaziModalZaDodavanjeStavke(false);
    }

    const izaberiStavkuZaIzmenuHandler = (sifraProizvoda: string) => {
        const stavkaZaIzmenu = stavkeFakture.find(s => s.proizvod.sifra === sifraProizvoda);
        setStavkaZaIzmenu(stavkaZaIzmenu!);
        setPrikaziModalZaIzmenuStavke(true);
    }

    const sacuvajIzmeneStavkeHandler = (izmenjenaStavka: StavkaFakture) => {
        // indeks stavke koju treba promeniti
        const indeks = stavkeFakture.findIndex(s => s.proizvod.sifra === stavkaZaIzmenu.proizvod.sifra)

        // kopiraj sve prethodne i samo izmeni stavku na tom indeksu
        const azuriraneStavke = [...stavkeFakture]
        azuriraneStavke[indeks] = izmenjenaStavka

        setStavkeFakture(azuriraneStavke)
        setPrikaziModalZaIzmenuStavke(false);
    }

    return (
        <form style={{ width: '100%', textAlign: 'center' }} onSubmit={sacuvajFakturuHandler}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className='form-element'>
                    <label htmlFor="broj">Broj fakture *</label>
                    <input id='broj' value={broj} onChange={(e) => setBroj(e.target.value)} />
                </div>
                <select value={valutaPlacanja} onChange={(e) => setValutaPlacanja(e.target.value as Valuta)}>
                    <option value={Valuta.DINAR}>{vratiSkraceniNazivValute(Valuta.DINAR)}</option>
                    <option value={Valuta.EVRO}>{vratiSkraceniNazivValute(Valuta.EVRO)}</option>
                    <option value={Valuta.DOLAR}>{vratiSkraceniNazivValute(Valuta.DOLAR)}</option>
                </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>

                <div className='form-element'>
                    <label htmlFor="datumIzdavanja">Datum izdavanja *</label>
                    <input id='datumIzdavanja' type='date' value={datumIzdavanja} onChange={(e) => setDatumIzdavanja(e.target.value)} />
                </div>

                <div className='form-element'>
                    <label htmlFor="rokPlacanja">Rok placanja *</label>
                    <input id='rokPlacanja' type='date' value={rokPlacanja} onChange={(e) => setRokPlacanja(e.target.value)} />
                </div>

            </div>


            <h2>Mesto izdavanja</h2>
            <div>
                <Adresa onChange={promeniMestoIzdavanjaHandler} obaveznaPolja={false} />
            </div>


            <button type='button' onClick={() => setPrikaziModalZaIzborKupca(true)}>Izaberite kupca</button>

            {prikaziModalZaIzborKupca &&
                <Modal onZatvori={() => setPrikaziModalZaIzborKupca(false)}>
                    <label>Maticni broj kupca</label>
                    <input value={maticniBrojKupca} onChange={(e) => setMaticniBrojKupca(e.target.value)} />
                    <button type='button' onClick={postaviKupcaHandler}>Potvrdi</button>
                </Modal>
            }

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='form-element'>
                    <label>Maticni broj</label>
                    <input value={kupac?.maticniBroj} disabled />
                </div>

                <div className='form-element'>
                    <label>PIB</label>
                    <input value={kupac?.pib} disabled />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='form-element'>
                    <label>Naziv</label>
                    <input value={kupac?.naziv} disabled />
                </div>

                <div className='form-element'>
                    <label>E-mail</label>
                    <input value={kupac?.email} disabled />
                </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='form-element'>
                    <label>Postanski broj</label>
                    <input value={kupac?.adresa.postBroj} disabled />
                </div>

                <div className='form-element'>
                    <label>Grad</label>
                    <input value={kupac?.adresa.grad} disabled />
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='form-element'>
                    <label>Ulica</label>
                    <input value={kupac?.adresa.ulica} disabled />
                </div>
                <div className='form-element'>
                    <label>Broj ulice</label>
                    <input value={kupac?.adresa.brUlice} disabled />
                </div>
            </div>

            <div>
                <h2>Stavke fakture</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Sifra</th>
                            <th>Naziv</th>
                            <th>Tip</th>
                            <th>Kolicina</th>
                            <th>Osnovna cena</th>
                            <th>PDV %</th>
                            <th>Iznos PDV</th>
                            <th>Ukupna vrednost</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stavkeFakture.map(s =>
                            <DodataStavkaItem
                                key={s.proizvod.sifra}
                                stavka={s}
                                valutaPlacanja={valutaPlacanja}
                                onUkloniStavku={ukloniStavkuHandler}
                                onIzmeniStavku={izaberiStavkuZaIzmenuHandler}
                                omoguciIzmenu={true}
                            />
                        )}
                    </tbody>
                </table>

                <button type='button' onClick={() => setPrikaziModalZaDodavanjeStavke(true)}>Dodaj stavku</button>
            </div>

            {prikaziModalZaDodavanjeStavke &&
                <Modal onZatvori={() => setPrikaziModalZaDodavanjeStavke(false)}>
                    <DodavanjeStavke onSacuvajStavku={dodajStavkuHandler} onOdustaniOdUnosa={() => setPrikaziModalZaDodavanjeStavke(false)} />
                </Modal>
            }

            {prikaziModalZaIzmenuStavke &&
                <Modal onZatvori={() => setPrikaziModalZaIzmenuStavke(false)}>
                    <IzmenaDodateStavke
                        stavka={stavkaZaIzmenu}
                        onOdustaniOdIzmene={() => setPrikaziModalZaIzmenuStavke(false)}
                        onSacuvajIzmene={sacuvajIzmeneStavkeHandler}
                    />
                </Modal>
            }

            <button type='submit'>Sacuvaj</button>
        </form>
    )
}

export default NovaFakturaForma
