import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export interface Content {
  _id: string;
  title: string;
  description: string;
  type: string;
  link?: string;
  imageUrl?: string;
  cloudinaryId?: string;
}

export function useContent() {
  const [contents, setContents] = useState([]);
  const BACKEND_URL: string = import.meta.env.VITE_API_URL;
  const { getToken } = useAuth();
  const refresh = useCallback(async () => {
    await axios
      .get(`${BACKEND_URL}/card/all-cards`, {
        headers: {
          token: await getToken(),
        },
      })
      .then((response) => {
        setContents(response.data.data);
      });
  }, [BACKEND_URL, getToken]);

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  return { contents, refresh };
}