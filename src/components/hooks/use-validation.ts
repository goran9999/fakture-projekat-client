import  { useState } from "react";
const useValidation = (validacionaFunkcija : (vrednost:string) => boolean,initialState?:boolean) =>{


    const [upisanaVrednost,setUpisanaVrednost] = useState('');
    const [isTouched,setIsTouched] = useState(false);

    const vrednostValidna = initialState? true : validacionaFunkcija(upisanaVrednost);
    const imaGreske = isTouched && !vrednostValidna;

    const vrednostPromenjena = (vrednost:string) => {
        setUpisanaVrednost(vrednost);
    }

    const fokusUklonjen = () =>{
        setIsTouched(true);
        if(upisanaVrednost.trim() === ''){
            return;
        }
    }

    const reset = () => {
        setIsTouched(false);
        setUpisanaVrednost('');
    }

    return {
        upisanaVrednost,
        imaGreske,
        vrednostValidna,
        vrednostPromenjena,
        fokusUklonjen,
        reset
    }


}
export default useValidation;