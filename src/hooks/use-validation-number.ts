import { useState } from "react";
const useValidationNumber = (validacionaFunkcija : (vrednost:number) => boolean,pocetniState:number) =>{

    const [upisanaVrednost,setUpisanaVrednost] = useState(pocetniState);
    const [isTouched,setIsTouched] = useState(false);

    const vrednostValidna = validacionaFunkcija(upisanaVrednost);
    const imaGreske = isTouched && !vrednostValidna;

    const vrednostPromenjena = (vrednost:number) => {
        setUpisanaVrednost(vrednost);
    }

    const fokusUklonjen = () =>{
        setIsTouched(true);
        if(upisanaVrednost.toString().trim() === '' || upisanaVrednost<0){
            return;
        }
    }

    const reset = () => {
        setIsTouched(false);
        setUpisanaVrednost(pocetniState);
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
export default useValidationNumber;