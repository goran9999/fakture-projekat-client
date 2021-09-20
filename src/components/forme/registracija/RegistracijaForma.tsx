import { useState } from "react"
import { useHistory } from "react-router";
import Izdavac from "../../../models/izdavac";

interface Props {
    onUspesnaRegistracija: (token?:string) => void
}

const RegistracijaForma = ({ onUspesnaRegistracija }: Props) => {

    const history = useHistory()

    const [matBroj, setMatBroj] = useState('');
    const [pib, setPib] = useState('');
    const [naziv, setNaziv] = useState('');
    const [email, setEmail] = useState('');
    const [sifra, setSifra] = useState('');
    const [telefon, setTelefon] = useState('');
    const [postBroj, setPostBroj] = useState(0);
    const [grad, setGrad] = useState('');
    const [ulica, setUlica] = useState('');
    const [brUlice, setBrUlice] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const izdavac: Izdavac = {
            maticniBroj: matBroj,
            pib: pib,
            naziv: naziv,
            email: email,
            sifra: sifra,
            telefon: telefon,
            adresa: {
                postBroj: postBroj,
                grad: grad,
                ulica: ulica,
                brUlice: brUlice
            },
            kupci: []
        }

        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(izdavac)
            })

            const resJson = await response.json();

            if (response.status !== 201) {
                console.log('Greska prilikom registracije izdavaca');
                console.log(resJson.message);
            } else {
                onUspesnaRegistracija()
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex' }}>
                <div className='form-element'>
                    <label htmlFor="matBroj">Maticni broj *</label>
                    <input id='matBroj' value={matBroj} onChange={(e) => setMatBroj(e.target.value)} />
                </div>

                <div className='form-element'>
                    <label htmlFor="pib">PIB *</label>
                    <input id='pib' value={pib} onChange={(e) => setPib(e.target.value)} />
                </div>
            </div>


            <div style={{ display: 'flex' }}>

                <div className='form-element'>

                    <label htmlFor="naziv">Naziv *</label>
                    <input id='naziv' value={naziv} onChange={(e) => setNaziv(e.target.value)} />
                </div>

                <div className='form-element'>
                    <label htmlFor="email">E-mail *</label>
                    <input id='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                </div>
            </div>

            <div style={{ display: 'flex' }}>

                <div className='form-element'>
                    <label htmlFor="sifra">Sifra *</label>
                    <input id='sifra' type='password' value={sifra} onChange={(e) => setSifra(e.target.value)} />
                </div>

                <div className='form-element'>
                    <label htmlFor="telefon">Broj telefona *</label>
                    <input id='telefon' value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                </div>
            </div>


            <div style={{ display: 'flex' }}>

                <div className='form-element'>
                    <label htmlFor="postBroj">Postanski broj *</label>
                    <input id='postBroj' value={postBroj} onChange={(e) => setPostBroj(+e.target.value)} />
                </div>

                <div className='form-element'>
                    <label htmlFor="grad">Grad *</label>
                    <input id='grad' value={grad} onChange={(e) => setGrad(e.target.value)} />
                </div>
            </div>

            <div style={{ display: 'flex' }}>

                <div className='form-element'>
                    <label htmlFor="ulica">Ulica *</label>
                    <input id='ulica' value={ulica} onChange={(e) => setUlica(e.target.value)} />

                </div>

                <div className='form-element'>
                    <label htmlFor="brUlice">Broj ulice *</label>
                    <input id='brUlice' value={brUlice} onChange={(e) => setBrUlice(e.target.value)} />
                </div>
            </div>

            <button type='submit'>Registruj se</button>
            <p>Vec imate nalog? <span style={{ cursor: 'pointer' }} onClick={() => history.replace('/prijava')}>Prijavite se</span></p>
        </form>
    )
}

export default RegistracijaForma
