import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";
import { useParams } from "react-router-dom";

export const BrandVideoCards = () => {
  const [videoCards, setVideoCards] = useState([]);
  const [brandName, setBrandName] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${baseURL}/brands/${id}`).then((res) => {
      setVideoCards(res.data.videoCards);
      setBrandName(res.data.name);
      console.log(res);
    });
  }, []);

  return (
    <div>
      {" "}
      <h2>Todas as Placas de vídeo {brandName} </h2>{" "}
      {JSON.stringify(videoCards)}
    </div>
  );
};
