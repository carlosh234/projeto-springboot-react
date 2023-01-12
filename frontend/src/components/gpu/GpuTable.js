import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";

import { Link } from "react-router-dom";

import { Table, Button } from "reactstrap";
import { UpdateGpu } from "./UpdateGpu";
import { DeleteGpu } from "./DeleteGpu";
import { AddGpu } from "./AddGpu";

export const GpuTable = () => {
  const [gpus, setGpus] = useState([]);

  const [deleteWarning, setDeleteWarning] = useState(false);
  const [gpuName, setGpuName] = useState("");
  const [gpuId, setGpuId] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseURL}/gpus`)
      .then((res) => res.data)
      .then((data) => setGpus(data.content));
  }, []);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentGpu, setCurrentGpu] = useState(null);

  const createAction = () => {
    setShowCreateForm(true);
    setDeleteWarning(false);
    setShowUpdateForm(false);
  };

  const updateAction = (gpu, gpuId) => {
    setShowUpdateForm(true);
    setCurrentGpu(gpu);
    setGpuId(gpuId);
    setDeleteWarning(false);
    setShowCreateForm(false);
  };

  const deleteAction = (gpuName, gpuId) => {
    setGpuName(gpuName);
    setDeleteWarning(true);
    setGpuId(gpuId);
    setShowUpdateForm(false);
    setShowCreateForm(false);
  };

  // CHANGE MANUFACTURER
  const setManufacturerColor = (name) => {
    switch (name) {
      case "NVIDIA":
        return "text-success";
      case "AMD":
        return "text-danger";
      case "INTEL":
        return "text-primary";
      default:
        return "";
    }
  };

  return (
    <div>
      {/*SHOW CREATE FORM ON BUTTON CLICK */}
      <Button onClick={() => createAction()}>Inserir nova GPU</Button>
      {showCreateForm && (
        <AddGpu
          setShowCreateForm={setShowCreateForm}
          gpus={gpus}
          setGpus={setGpus}
        />
      )}

      {/*SHOW UPDATE FORM ON BUTTON CLICK */}
      {showUpdateForm && (
        <UpdateGpu
          setShowUpdateForm={setShowUpdateForm}
          gpus={gpus}
          setGpus={setGpus}
          currentGpu={currentGpu}
          setCurrentGpu={setCurrentGpu}
        />
      )}
      {/*SHOW DELETE  WARNING ON BUTTON CLICK */}
      {deleteWarning && (
        <DeleteGpu
          setDeleteWarning={setDeleteWarning}
          gpuName={gpuName}
          gpuId={gpuId}
          gpus={gpus}
          setGpus={setGpus}
        />
      )}

      {/*TABLE WITH ALL GPUS E ACTION BUTTONS*/}
      <Table size="sm" className="table-light mt-2">
        <thead>
          <tr>
            <th>GPU</th>
            <th>Qtd de Memória</th>
            <th>Tipo da Memória</th>
            <th>Fabricante</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gpus.map((g) => (
            <tr className="" key={g.id}>
              <td>{g.name}</td>
              <td>{g.memorySizeGb} GB</td>
              <td>{g.memoryType}</td>
              <td>
                <b className={setManufacturerColor(g.manufacturer)}>
                  {g.manufacturer}
                </b>
              </td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="mx-2"
                  onClick={() => updateAction(g, g.id)}
                >
                  Alterar
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  onClick={() => deleteAction(g.name, g.id)}
                >
                  Excluir
                </Button>
                <Link to={`gpus/${g.id}/videocards`}>
                  <Button color="primary" size="sm" className="mx-2">
                    Placas {g.name}
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
