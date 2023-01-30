import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";

import { Link } from "react-router-dom";

import { Table, Button } from "reactstrap";
import { UpdateBrand } from "./UpdateBrand";
import { DeleteBrand } from "./DeleteBrand";
import { AddBrand } from "./AddBrand";

export const BrandTable = () => {
  const [brands, setBrands] = useState([]);

  const [deleteWarning, setDeleteWarning] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandId, setBrandId] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseURL}/brands`)
      .then((res) => res.data)
      .then((data) => setBrands(data.content));
  }, []);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentBrand, setCurrentBrand] = useState({});

  const createAction = () => {
    setShowCreateForm(true);
    setDeleteWarning(false);
    setShowUpdateForm(false);
  };

  const updateAction = (brand, brandId) => {
    setShowUpdateForm(true);
    setCurrentBrand(brand);
    setBrandId(brandId);
    setDeleteWarning(false);
    setShowCreateForm(false);
  };

  const deleteAction = (brandName, brandId) => {
    setBrandName(brandName);
    setDeleteWarning(true);
    setBrandId(brandId);
    setShowUpdateForm(false);
    setShowCreateForm(false);
  };

  return (
    <div>
      {/*SHOW CREATE FORM ON BUTTON CLICK */}
      <Button onClick={() => createAction()}>Inserir nova Marca</Button>
      {showCreateForm && (
        <AddBrand
          setShowCreateForm={setShowCreateForm}
          brands={brands}
          setBrands={setBrands}
        />
      )}

      {/*SHOW UPDATE FORM ON BUTTON CLICK */}
      {showUpdateForm && (
        <UpdateBrand
          setShowUpdateForm={setShowUpdateForm}
          brands={brands}
          setBrands={setBrands}
          currentBrand={currentBrand}
          setCurrentBrand={setCurrentBrand}
        />
      )}
      {/*SHOW DELETE  WARNING ON BUTTON CLICK */}
      {deleteWarning && (
        <DeleteBrand
          setDeleteWarning={setDeleteWarning}
          brandName={brandName}
          brandId={brandId}
          brands={brands}
          setBrands={setBrands}
        />
      )}

      {/*TABLE WITH ALL BRANDS E ACTION BUTTONS*/}
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
                <Button
                  color="warning"
                  size="sm"
                  className="mx-2"
                  onClick={() => updateAction(b, b.id)}
                >
                  Alterar
                </Button>

                <Button
                  color="danger"
                  size="sm"
                  onClick={() => deleteAction(b.name, b.id)}
                >
                  Excluir
                </Button>
                <Link to={`brands/${b.id}/videocards`}>
                  <Button color="primary" size="sm" className="mx-2">
                    Placas {b.name}
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
