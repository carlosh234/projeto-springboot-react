import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";

import { Link } from "react-router-dom";

import { Table, Button, Alert } from "reactstrap";

export const BrandTable = () => {
  const [brands, setBrands] = useState([]);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const timeToCloseMsg = 3000;

  useEffect(() => {
    axios
      .get(`${baseURL}/brands`)
      .then((res) => res.data)
      .then((data) => setBrands(data.content));
  }, []);

  const onDelete = (brandName, brandId) => {
    setBrandName(brandName);
    setDeleteWarning(true);
    setBrandId(brandId);
  };

  const handleDelete = () => {
    axios
      .delete(`${baseURL}/brands/${brandId}`)
      .then(() => {
        setBrands(brands.filter((g) => g.id !== brandId));
        setErrorMsg(false);
        setSuccessMsg(`A Marca foi excluida com sucesso.`);

        setTimeout(() => {
          setSuccessMsg(null);
        }, timeToCloseMsg);
      })
      .catch((e) => {
        setSuccessMsg(false);
        setErrorMsg(e.response.data.message);
        setTimeout(() => {
          setErrorMsg(null);
        }, timeToCloseMsg);
      });
    setDeleteWarning(false);
  };

  return (
    <div>
      {deleteWarning && (
        <Alert color="danger w-25 my-3">
          <b>Tem certeza que deseja excluir a Marca: {brandName} ? </b>
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
      )}
      {successMsg && (
        <Alert color="success w-25 my-3">
          <b>{successMsg}</b>
        </Alert>
      )}
      {errorMsg && (
        <Alert color="danger w-25 my-3">
          <b>
            {errorMsg} : Só poderá excluir esta Marca se não houve Placas de
            Vídeo associadas.
          </b>
        </Alert>
      )}
      <Table size="sm" className="table-light mt-2">
        <thead>
          <tr>
            <th>Marca</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((b) => (
            <tr className="" key={b.id}>
              <td>{b.name}</td>
              <td>
                <Link to={`brands/update/${b.id}`}>
                  <Button color="warning" size="sm" className="mx-2">
                    Alterar
                  </Button>
                </Link>

                <Button
                  color="danger"
                  size="sm"
                  onClick={() => onDelete(b.name, b.id)}
                >
                  Excluir
                </Button>
                <Link to={`brands/${b.id}/videocards`}>
                  <Button color="primary" size="sm" className="mx-2">
                    Placas da Marca {b.name}
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
