import { Button, Alert, Spinner } from "reactstrap";
import { baseURL } from "../../utils/api";
import axios from "axios";
import { useState } from "react";

export const DeleteVideoCard = ({
  videoCardId,
  videoCardName,
  videoCards,
  setVideoCards,
  setDeleteWarning,
}) => {
  const [deleteError, setDeleteError] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [message, setMessage] = useState("");

  const timeToCloseMsg = 2000;

  const handleDelete = () => {
    axios
      .delete(`${baseURL}/videocards/${videoCardId}`)
      .then(() => {
        setSuccessDelete(true);
        setDeleteError(false);
        setMessage("Placa excluída com sucesso.");
        setTimeout(() => {
          setVideoCards(videoCards.filter((g) => g.id !== videoCardId));
          setSuccessDelete(false);
          setDeleteWarning(false);
        }, timeToCloseMsg);
      })
      .catch((e) => {
        console.log(e);
        setSuccessDelete(false);
        setDeleteError(true);
        setTimeout(() => {
          setDeleteError(false);
          setDeleteWarning(false);
        }, timeToCloseMsg);
      });
  };
  return (
    <>
      <Alert color="danger w-25 my-3">
        <b>Tem certeza que deseja excluir a Placa : {videoCardName} ? </b>
        <br />
        <Button color="success" onClick={() => handleDelete()}>
          Sim
        </Button>
        <Button
          className="mx-1"
          color="danger"
          onClick={() => setDeleteWarning(false)}
        >
          Não
        </Button>
      </Alert>
      {successDelete && (
        <Alert>
          <b>Marca excluída com sucesso. </b>
          <Spinner color="success">Loading...</Spinner>
        </Alert>
      )}
      {deleteError && (
        <Alert color="danger">
          <b>{message} </b>
          <Spinner color="danger">Loading...</Spinner>
        </Alert>
      )}
    </>
  );
};
