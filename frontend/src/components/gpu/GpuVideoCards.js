import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";
import { useParams } from "react-router-dom";

export const GpuVideoCards = () => {
  const [videoCards, setVideoCards] = useState([]);
  const [gpuName, setGpuName] = useState("");
  const { id } = useParams();
  useEffect(() => {
    axios.get(`${baseURL}/gpus/${id}`).then((res) => {
      setVideoCards(res.data.videoCards);
      setGpuName(res.data.name);
      console.log(res);
    });
  }, []);

  return (
    <div>
      {" "}
      <h2>Todas as Placas de vídeo {gpuName} </h2> {JSON.stringify(videoCards)}
    </div>
  );
};
