import { useHistory } from "react-router";
import { useContext, useState } from "react";
import useValidation from "../../../hooks/use-validation";
import {IzdavacContext} from '../../../store/izdavac-context'

interface Props {
    onUspesnaPrijava: () => void
}

const PrijavaForma = ({ onUspesnaPrijava }: Props) => {

    const history = useHistory()
    const izdavacContext = useContext(IzdavacContext);
    let formaValidna = false;

    const [pogresanUnosEmail, setPogresanUnosEmail] = useState<string>();
    const [pogresanUnosPassword, setPogresanUnosPassword] = useState<string>();

    // const [matBroj, setMatBroj] = useState('');

    const { upisanaVrednost: sifra, imaGreske: sifraPogresna, vrednostValidna: sifraValidna, vrednostPromenjena: promeniSifru,
        fokusUklonjen: sifrafokusUklonjen }
        = useValidation(value => {
            return value.trim().length !== 0
        });

    const { upisanaVrednost: email, imaGreske: emailPogresan, vrednostValidna: emailValidan, vrednostPromenjena: promeniEmail,
        fokusUklonjen: emailFokusUklonjen }
        = useValidation(value => {
            return value.trim().length !== 0 && value.includes('@') && value.endsWith('.com')
        });

    if (sifraValidna && emailValidan) {
        formaValidna = true;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: sifra })
            })
            const resJson = await response.json();
            if (!response.ok) {
                console.log(resJson.message);
                if(resJson.message.toString().includes('Password')){
                    setPogresanUnosPassword(resJson.message);
                }else{
                    setPogresanUnosEmail(resJson.message);
                }
               
            } else {
                localStorage.setItem('token',resJson.token);
                izdavacContext.dodajIzdavaca(resJson.izdavac);
                onUspesnaPrijava()
            }
        } catch (e) {
            console.log(e)
        }

    }

    

    return (
        <form onSubmit={handleSubmit}>

            {/* <div className='form-element'>
                <label htmlFor="matBroj">Maticni broj *</label>
                <input id='matBroj' value={matBroj} onChange={(e) => setMatBroj(e.target.value)} />
            </div> */}
            <div className='form-element'>
                <label htmlFor="email">E-mail *</label>
                <input id='email' value={email} onBlur={emailFokusUklonjen} 
                onChange={(e) =>{setPogresanUnosEmail(undefined); promeniEmail(e.target.value)}}/>
            {(emailPogresan) && <img src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png" style={{height:'16px',marginLeft:'-25px'}}/>}
                 {/* {(emailPogresan) && <p style={{ color: 'red', marginTop: '10px' }}>Email je obavezan</p>} */}
                {(pogresanUnosEmail) && <p style={{ color: 'red', marginTop: '10px' }}>{pogresanUnosEmail}</p>}
            </div>

            <div className='form-element'>
                <label htmlFor="sifra">Sifra *</label>
                <input id='sifra' type='password' onBlur={sifrafokusUklonjen} value={sifra} onChange={(e) =>{setPogresanUnosPassword(undefined); promeniSifru(e.target.value)}} />
                {(sifraPogresna) && <p style={{ color: 'red', marginTop: '10px' }}>Sifra je obavezna</p>}
                {(pogresanUnosPassword) && <p style={{ color: 'red', marginTop: '10px' }}>{pogresanUnosPassword}</p>}

            </div>

            <button type='submit' disabled={!formaValidna}>Prijavi se</button>
            <p>Nemate nalog? <span style={{ cursor: 'pointer' }} onClick={() => history.replace('/registracija')}>Napravite novi</span></p>
        </form>
    )
}

export default PrijavaForma
