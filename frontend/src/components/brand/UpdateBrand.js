import { React, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";

import {
  Form,
  Col,
  Row,
  Label,
  Input,
  Button,
  Container,
  Alert,
  Spinner,
} from "reactstrap";

export const UpdateBrand = ({
  setShowUpdateForm,
  brands,
  setBrands,
  currentBrand,
  setCurrentBrand,
}) => {
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [updateErrorList, setUpdateErrorList] = useState([]);

  const timeToCloseMsg = 2000;

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .put(`${baseURL}/brands/${currentBrand.id}`, { name: currentBrand.name })
      .then((res) => {
        setCurrentBrand(res.data);
        setUpdateError(false);
        setSuccessUpdate(true);
        setTimeout(() => {
          setSuccessUpdate(false);
          setBrands(
            brands.map((brand) =>
              brand.id === currentBrand.id ? res.data : brand
            )
          );
        }, timeToCloseMsg);
        console.log(res);
      })
      .catch((e) => {
        console.log(e.response.data);
        setUpdateErrorList(e.response.data.errors);
        setSuccessUpdate(false);
        setUpdateError(true);
      });
  };
  return (
    <Container className="container bg-light my-5 w-75">
      <Row className="">
        <Col>
          <Form onSubmit={handleUpdate} className="form-inline">
            <h3 className="text-center">
              Alterar dados da Marca:{" "}
              <b className="text-primary">{currentBrand.name}</b>
            </h3>

            <Col className="mx-auto">
              <Label className="">Nome da Marca</Label>
              <Input
                type="text"
                value={currentBrand.name}
                onChange={(e) =>
                  setCurrentBrand({ ...currentBrand, name: e.target.value })
                }
                className="form-control w-75"
              />
            </Col>

            <Col className="my-2">
              <Button>Alterar</Button>
            </Col>
          </Form>
          <Button
            color="danger"
            onClick={() => {
              setShowUpdateForm(false);
            }}
          >
            Cancelar
          </Button>
        </Col>
        <>
          {successUpdate && (
            <Alert>
              <b>Marca alterada com sucesso. </b>
              <Spinner color="success">Loading...</Spinner>
            </Alert>
          )}
          {updateError && (
            <Alert color="danger">
              <b>Erro no preenchimento dos dados.</b>
              <br />

              <b>{updateErrorList.map((e) => e.message)}</b>
            </Alert>
          )}
        </>
      </Row>
    </Container>
  );
};
