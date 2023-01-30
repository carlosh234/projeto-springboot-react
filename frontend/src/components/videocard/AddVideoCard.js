import { React, useEffect, useState } from "react";
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

export const AddVideoCard = ({
  videoCards,
  setVideoCards,
  setShowCreateForm,
}) => {
  const [successCreate, setSuccessCreate] = useState(false);
  const [errorCreate, setErrorCreate] = useState(false);
  const [createErrorList, setCreateErrorList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const [newVideoCard, setNewVideoCard] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/gpus`)
      .then((res) => res.data)
      .then((data) => {
        setGpuList(data.content);
        console.log(gpuList);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/brands`)
      .then((res) => res.data)
      .then((data) => {
        setBrandList(data.content);
        console.log(brandList);
      });
  }, []);

  const handleCreate = (event) => {
    event.preventDefault();
    axios
      .post(`${baseURL}/videocards`, newVideoCard)
      .then((res) => {
        setNewVideoCard({
          model: res.data.model,
          specs: res.data.specs,
          price: res.data.price,
          gpu: { id: res.data.gpu.id },
          brand: { id: res.data.brand.id },
        });

        setSuccessCreate(true);
        setErrorCreate(false);
        setTimeout(() => {
          setSuccessCreate(false);
          setVideoCards(
            videoCards.concat({ ...newVideoCard, id: res.data.id })
          );
        }, 1500);
        console.log(newVideoCard);
      })
      .catch((e) => {
        console.log(newVideoCard);
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
              Adicionar dados da Placa de Vídeo<b className="text-primary"></b>
            </h3>
            <Row>
              <Col className="mx-auto">
                <Label className="">GPU</Label>
                <Input
                  type="select"
                  onChange={(e) =>
                    setNewVideoCard({
                      ...newVideoCard,
                      gpu: { id: e.target.value },
                    })
                  }
                  className="form-control w-75"
                >
                  <option>GPU</option>
                  {gpuList.map((g) => (
                    <option value={g.id}>{g.name}</option>
                  ))}
                </Input>
              </Col>
              <Col className="mx-auto">
                <Label className="">Marca</Label>
                <Input
                  type="select"
                  onChange={(e) =>
                    setNewVideoCard({
                      ...newVideoCard,
                      brand: { id: e.target.value },
                    })
                  }
                  className="form-control w-75"
                >
                  <option>Marca</option>
                  {brandList.map((b) => (
                    <option value={b.id}>{b.name}</option>
                  ))}
                </Input>
              </Col>
            </Row>
            <Row>
              <Col className="mx-auto">
                <Label className="">Preço</Label>
                <Input
                  type="number"
                  onChange={(e) =>
                    setNewVideoCard({
                      ...newVideoCard,
                      price: e.target.value,
                    })
                  }
                  className="form-control w-75"
                />
              </Col>
              <Col className="mx-auto">
                <Label className="">Modelo</Label>
                <Input
                  type="text"
                  onChange={(e) =>
                    setNewVideoCard({
                      ...newVideoCard,
                      model: e.target.value,
                    })
                  }
                  className="form-control w-75 "
                />
              </Col>
              <Col className="mx-auto">
                <Label className="">Especificações</Label>
                <Input
                  type="textarea"
                  onChange={(e) =>
                    setNewVideoCard({
                      ...newVideoCard,
                      specs: e.target.value,
                    })
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
              <b>Placa adicionada com sucesso.</b>
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
