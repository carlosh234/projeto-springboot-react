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

export const AddBrand = ({ brands, setBrands, setShowCreateForm }) => {
  const [newBrand, setNewBrand] = useState({});
  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [createErrorList, setCreateErrorList] = useState([]);

  const handleCreate = (event) => {
    event.preventDefault();
    axios
      .post(`${baseURL}/brands`, newBrand)
      .then((res) => {
        setNewBrand(res.data);
        console.log(newBrand);
        setSuccessCreate(true);
        setErrorCreate(false);
        setTimeout(() => {
          setSuccessCreate(false);
          setBrands(brands.concat({ ...newBrand, id: res.data.id }));
        }, 1500);
        console.log(res);
      })
      .catch((e) => {
        console.log(e.response.data);
        setCreateErrorList(e.response.data.errors);
        setSuccessCreate(false);
        setErrorCreate(true);
      });
  };

  return (
    <Container className="container-xl bg-light my-5 w-75">
      <Row>
        <Col>
          <Form onSubmit={handleCreate} className="form-inline">
            <h3 className="text-center">
              Adicionar dados da BRAND <b className="text-primary"></b>
            </h3>
            <Row>
              <Col className="mx-auto">
                <Label className="">Nome da Marca</Label>
                <Input
                  type="text"
                  onChange={(e) =>
                    setNewBrand({ ...newBrand, name: e.target.value })
                  }
                  className="form-control w-75 "
                />
              </Col>
            </Row>

            <Col className="my-2">
              <Button>Adicionar</Button>
            </Col>
          </Form>
          <Button
            color="danger"
            onClick={() => {
              setShowCreateForm(false);
            }}
          >
            Cancelar
          </Button>
        </Col>
        <Row>
          {successCreate && (
            <Alert>
              <b>Marca adicionada com sucesso.</b>
              <Spinner color="success">Loading...</Spinner>
            </Alert>
          )}
          {errorCreate && (
            <Alert color="danger">
              <h4>
                <b>Erro no preenchimento dos dados.</b>
              </h4>
              {createErrorList.map((e) => (
                <p key={e.field}>{e.message}</p>
              ))}
            </Alert>
          )}
        </Row>
      </Row>
    </Container>
  );
};
