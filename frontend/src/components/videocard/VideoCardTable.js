import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";

import { Table, Button } from "reactstrap";
import { UpdateVideoCard } from "./UpdateVideoCard";
import { DeleteVideoCard } from "./DeleteVideoCard";
import { AddVideoCard } from "./AddVideoCard";

export const VideoCardTable = () => {
  const [videoCards, setVideoCards] = useState([]);

  const [deleteWarning, setDeleteWarning] = useState(false);
  const [videoCardName, setVideoCardName] = useState("");
  const [videoCardId, setVideoCardId] = useState(0);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentVideoCard, setCurrentVideoCard] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/videocards`)
      .then((res) => res.data)
      .then((data) => setVideoCards(data.content));
  }, []);

  const createAction = () => {
    setShowCreateForm(true);
    setDeleteWarning(false);
    setShowUpdateForm(false);
  };

  const updateAction = (videoCard, videoCardId) => {
    setShowUpdateForm(true);
    setCurrentVideoCard(videoCard);
    setVideoCardId(videoCardId);
    setDeleteWarning(false);
    setShowCreateForm(false);
  };

  const deleteAction = (videoCardName, videoCardId) => {
    setVideoCardName(videoCardName);
    setDeleteWarning(true);
    setVideoCardId(videoCardId);
    setShowUpdateForm(false);
    setShowCreateForm(false);
  };

  return (
    <div>
      {/*SHOW CREATE FORM ON BUTTON CLICK */}
      <Button onClick={() => createAction()}>
        Inserir nova Placa de Vídeo
      </Button>
      {showCreateForm && (
        <AddVideoCard
          setShowCreateForm={setShowCreateForm}
          videoCards={videoCards}
          setVideoCards={setVideoCards}
        />
      )}

      {/*SHOW UPDATE FORM ON BUTTON CLICK */}
      {showUpdateForm && (
        <UpdateVideoCard
          setShowUpdateForm={setShowUpdateForm}
          videoCards={videoCards}
          setVideoCards={setVideoCards}
          currentVideoCard={currentVideoCard}
          setCurrentVideoCard={setCurrentVideoCard}
        />
      )}
      {/*SHOW DELETE  WARNING ON BUTTON CLICK */}
      {deleteWarning && (
        <DeleteVideoCard
          setDeleteWarning={setDeleteWarning}
          videoCardName={videoCardName}
          videoCardId={videoCardId}
          videoCards={videoCards}
          setVideoCards={setVideoCards}
        />
      )}

      {/*TABLE WITH ALL VIDEOCARDS E ACTION BUTTONS*/}
      <Table size="sm" className="table-light mt-2">
        <thead>
          <tr>
            <th>Marca</th>
            <th>GPU</th>
            <th>Modelo</th>
            <th>Especificações</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {videoCards.map((v) => (
            <tr key={v.id}>
              <td>{v.brand.name}</td>
              <td>{v.gpu.name}</td>
              <td>{v.model}</td>
              <td>{v.specs}</td>
              <td>{v.price}</td>

              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="mx-2"
                  onClick={() => updateAction(v, v.id)}
                >
                  Alterar
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  onClick={() =>
                    deleteAction(
                      `${v.brand.name} ${v.gpu.name} ${v.model} `,
                      v.id
                    )
                  }
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
