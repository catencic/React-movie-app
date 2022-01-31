
import axios from 'axios';
import  { useEffect, useRef, useState } from 'react'

export const useFetch =  (url) => {


    const [state, setstate] = useState({data: null, loading: true,error: null});

    const isMounted = useRef(true);
   
   

    useEffect( async () => {
             
        
            setstate({data: null, loading: true, error: null});

            const { data } = await axios.get(url);

                
                    if(data){
                        setstate({
                            loading: false,
                            error: null, 
                            data
                        });
                    }
                   
               
                
            

        
       

    }, [url])

    return state;
}