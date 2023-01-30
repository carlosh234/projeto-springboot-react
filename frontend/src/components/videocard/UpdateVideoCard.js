import { React, useState, useEffect } from "react";
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

export const UpdateVideoCard = ({
  setShowUpdateForm,
  videoCards,
  setVideoCards,
  currentVideoCard,
  setCurrentVideoCard,
}) => {
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [updateErrorList, setUpdateErrorList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const timeToCloseMsg = 2000;

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

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .put(`${baseURL}/videocards/${currentVideoCard.id}`, currentVideoCard)
      .then((res) => {
        setCurrentVideoCard({
          model: res.data.model,
          specs: res.data.specs,
          price: res.data.price,
          gpu: { id: res.data.gpu.id },
          brand: { id: res.data.brand.id },
        });
        setUpdateError(false);
        setSuccessUpdate(true);
        setTimeout(() => {
          setSuccessUpdate(false);
          setVideoCards(
            videoCards.map((videoCard) =>
              videoCard.id === currentVideoCard.id ? res.data : videoCard
            )
          );
          setShowUpdateForm(false);
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
              Alterar dados da Placa:{" "}
              <b className="text-primary">{currentVideoCard.name}</b>
            </h3>

            <Row>
              <Col className="mx-auto">
                <Label className="">GPU</Label>
                <Input
                  type="select"
                  onChange={(e) =>
                    setCurrentVideoCard({
                      ...currentVideoCard,
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
                    setCurrentVideoCard({
                      ...currentVideoCard,
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
                  value={currentVideoCard.price}
                  onChange={(e) =>
                    setCurrentVideoCard({
                      ...currentVideoCard,
                      price: e.target.value,
                    })
                  }
                  className="form-control w-75"
                />
              </Col>
              <Col className="mx-auto">
                <Label className="">Modelo</Label>
                <Input
                  value={currentVideoCard.model}
                  type="text"
                  onChange={(e) =>
                    setCurrentVideoCard({
                      ...currentVideoCard,
                      model: e.target.value,
                    })
                  }
                  className="form-control w-75"
                />
              </Col>
              <Col className="mx-auto">
                <Label className="">Especificações</Label>
                <Input
                  value={currentVideoCard.specs}
                  type="textarea"
                  onChange={(e) =>
                    setCurrentVideoCard({
                      ...currentVideoCard,
                      specs: e.target.value,
                    })
                  }
                  className="form-control w-75"
                />
              </Col>
            </Row>
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
              <b>Placa alterada com sucesso. </b>
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
