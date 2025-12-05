import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export function useContent() {
    const [contents, setContents] = useState([]);
    const BACKEND_URL:string = import.meta.env.VITE_API_URL;
    const refresh = useCallback(async ()=>{
        await axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.content)
            })
    }, [BACKEND_URL]);

    useEffect(() => {
        refresh()
        const interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [refresh])

    return {contents, refresh};
}