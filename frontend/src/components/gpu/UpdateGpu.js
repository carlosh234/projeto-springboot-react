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

export const UpdateGpu = ({
  setShowUpdateForm,
  gpus,
  setGpus,
  currentGpu,
  setCurrentGpu,
}) => {
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [updateErrorList, setUpdateErrorList] = useState([]);

  const timeToCloseMsg = 2000;

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .put(`${baseURL}/gpus/${currentGpu.id}`, currentGpu)
      .then((res) => {
        setCurrentGpu(res.data);
        setUpdateError(false);
        setSuccessUpdate(true);
        setTimeout(() => {
          setSuccessUpdate(false);
          setGpus(
            gpus.map((gpu) => (gpu.id === currentGpu.id ? res.data : gpu))
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
              Alterar dados da GPU:{" "}
              <b className="text-primary">{currentGpu.name}</b>
            </h3>

            <Row>
              <Col className="mx-auto">
                <Label className="">Fabricante</Label>
                <Input
                  type="select"
                  onChange={(e) =>
                    setCurrentGpu({
                      ...currentGpu,
                      manufacturer: e.target.value,
                    })
                  }
                  className="form-control w-75"
                >
                  <option>Fabricante</option>
                  <option>NVIDIA</option>
                  <option>AMD</option>
                  <option>INTEL</option>
                </Input>
              </Col>
              <Col className="mx-auto">
                <Label className="">GPU</Label>
                <Input
                  type="text"
                  value={currentGpu.name}
                  onChange={(e) =>
                    setCurrentGpu({ ...currentGpu, name: e.target.value })
                  }
                  className="form-control w-75 "
                />
              </Col>
            </Row>
            <Row>
              <Col className="mx-auto">
                <Label className="">Qtd de Memória</Label>
                <Input
                  type="number"
                  value={currentGpu.memorySizeGb}
                  onChange={(e) =>
                    setCurrentGpu({
                      ...currentGpu,
                      memorySizeGb: e.target.value,
                    })
                  }
                  className="form-control w-75"
                />
              </Col>
              <Col className="mx-auto">
                <Label className="">Tipo de Memória</Label>
                <Input
                  value={currentGpu.memoryType}
                  type="text"
                  onChange={(e) =>
                    setCurrentGpu({
                      ...currentGpu,
                      memoryType: e.target.value,
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
              <b>GPU alterada com sucesso. </b>
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
