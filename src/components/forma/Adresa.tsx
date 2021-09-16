import React, { useState } from 'react'
import AdresaModel, { defaultAdresa } from '../../models/adresa'
import useValidation from '../hooks/use-validation'
import useValidationNumber from '../hooks/use-validation-number'
import styles from './NovaFakturaForma.module.css'


interface Props {
    onChange: (izmenjenaAdresa: AdresaModel) => void,
    obaveznaPolja: boolean
}


const Adresa = (props: Props) => {
    
    const [adresa, setAdresa] = useState(defaultAdresa)

    //Validacija adrese

    const {upisanaVrednost:grad,imaGreske:gradPogresan,
        vrednostPromenjena:promeniGrad,fokusUklonjen:onBlurGrad} = 
         useValidation(value=>value.trim().length!==0);
         
    const {upisanaVrednost:posBr,imaGreske:posBrPogresan,vrednostPromenjena:promeniPosBr,
          fokusUklonjen:posBrFokusUklonjen}
          = useValidationNumber(value=>{
         return  value>=0 && value.toString().trim().length!==0 && value>=0 && !isNaN(value)},0);

    const {upisanaVrednost:brUlice,imaGreske:brUlicePogresan,vrednostPromenjena:promeniBrUlice,
        fokusUklonjen:brUliceFokusUklonjen}
        = useValidation(value=>value.trim().length!==0);
    
    const {upisanaVrednost:ulica,imaGreske:ulicaPogresna,vrednostPromenjena:promeniUlicu,
        fokusUklonjen:ulicaFokusUklonjen}
        = useValidation(value=>value.trim().length!==0);



    

    const promeniAdresuHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nazivPolja = e.target.name;
        if(nazivPolja==='grad'){
            promeniGrad(e.target.value);
        }

        if(nazivPolja==='postBroj'){
            const broj = +e.target.value.charAt(e.target.value.length-1);
            if(!isNaN(broj)){
            promeniPosBr(+e.target.value);
            }
        }

        if(nazivPolja==='brUlice'){
            promeniBrUlice(e.target.value);
        }

        if(nazivPolja==='ulica'){
            promeniUlicu(e.target.value);
        }


        const izmenjenaAdresa: AdresaModel = {
            ...adresa,
            [nazivPolja]: nazivPolja === 'postBroj' ? +e.target.value : e.target.value
        }
        setAdresa(izmenjenaAdresa)
        props.onChange(izmenjenaAdresa)
    }

    return (
        <>
            <div className={styles['form-element']}>
                <label htmlFor='postBroj'>Postanski broj *</label>
                <input onBlur={posBrFokusUklonjen} value={posBr} onChange={promeniAdresuHandler} id='postBroj' name='postBroj' />
                {posBrPogresan && <p style={{marginTop:'10px',color:'red'}}>Postanski broj ne moze biti prazan!</p>}
                
            </div>

            <div className={styles['form-element']}>
                <label htmlFor='grad'>Grad *</label>
                <input onBlur={onBlurGrad} value={grad} onChange={promeniAdresuHandler} id='grad' name='grad' />
                {gradPogresan && <p style={{marginTop:'10px',color:'red'}}>Grad ne moze biti prazan!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor='ulica'>Ulica {props.obaveznaPolja ? '*' : ''}</label>
                <input value={props.obaveznaPolja?ulica:adresa.ulica} onBlur={ulicaFokusUklonjen}  onChange={promeniAdresuHandler} id='ulica' name='ulica' />
                {ulicaPogresna && props.obaveznaPolja && <p style={{marginTop:'10px',color:'red'}}>Ulica  je obavezna!</p>}
            </div>

            <div className={styles['form-element']}>
                <label htmlFor='brUlice'>Broj ulice {props.obaveznaPolja ? '*' : ''}</label>
                <input onBlur={brUliceFokusUklonjen} value={props.obaveznaPolja?brUlice:adresa.brUlice} onChange={promeniAdresuHandler} id='brUlice' name='brUlice' />
                {brUlicePogresan && props.obaveznaPolja && <p style={{marginTop:'10px',color:'red'}}>Broj ulice  je obavezan!</p>}
            </div>
        </>
    )
}

export default Adresa
