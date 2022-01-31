import { useFetch } from "../hooks/useFetch";


export const getData = (url)=>{

    const {data , loading} = useFetch(url);

    return {data , loading};

}