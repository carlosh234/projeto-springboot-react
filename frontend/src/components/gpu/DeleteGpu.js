import { Button, Alert, Spinner } from "reactstrap";
import { baseURL } from "../../utils/api";
import axios from "axios";
import { useState } from "react";

export const DeleteGpu = ({
  gpuId,
  gpuName,
  gpus,
  setGpus,
  setDeleteWarning,
}) => {
  const [deleteError, setDeleteError] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [message, setMessage] = useState("");

  const timeToCloseMsg = 2000;

  const handleDelete = () => {
    axios
      .delete(`${baseURL}/gpus/${gpuId}`)
      .then(() => {
        setSuccessDelete(true);
        setDeleteError(false);
        setMessage("GPU excluída com sucesso.");
        setTimeout(() => {
          setGpus(gpus.filter((g) => g.id !== gpuId));
          setSuccessDelete(false);
          setDeleteWarning(false);
        }, timeToCloseMsg);
      })
      .catch((e) => {
        console.log(e);
        setSuccessDelete(false);
        setDeleteError(true);
        if (e.response.data.error === "Database exception") {
          setMessage(
            `${e.response.data.message} : Só poderá excluir está GPU se não houver placas de vídeo associadas.`
          );
        }
        setTimeout(() => {
          setDeleteError(false);
          setDeleteWarning(false);
        }, timeToCloseMsg);
      });
  };
  return (
    <>
      <Alert color="danger w-25 my-3">
        <b>Tem certeza que deseja excluir a GPU: {gpuName} ? </b>
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
          <b>GPU excluída com sucesso. </b>
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
