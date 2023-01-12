import { React, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/api";
import { useParams, useNavigate, Link } from "react-router-dom";
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

export const AddBrand = () => {
  const [brand, setBrand] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [errorList, setErrorList] = useState([]);

  const navigate = useNavigate();

  function handleCreate(event) {
    event.preventDefault();
    axios
      .post(`${baseURL}/brands`, brand)
      .then((res) => {
        setBrand(res.data);
        setSuccessMsg(true);
        setErrorMsg(false);
        setTimeout(() => {
          setSuccessMsg(null);
          navigate("/");
        }, 1500);
        console.log(res);
      })
      .catch((e) => {
        console.log(e.response);
        setSuccessMsg(false);
        setErrorMsg(true);
        setErrorList(e.response.data.errors);
      });
  }

  return (
    <Container className="container bg-light my-5 w-75">
      <Row>
        <Col>
          <Form onSubmit={handleCreate} className="form-inline">
            <h3>Adicionar Marca:</h3>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col className="">
                <Label className="">Nome</Label>
                <Input
                  type="text"
                  onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                  className="form-control w-75 "
                />
              </Col>
            </Row>
            <Col className="my-2">
              <Button>Adicionar</Button>
            </Col>
          </Form>
        </Col>
        <>
          {successMsg && (
            <Alert>
              <b>Marca adicionada com sucesso.</b>
              <br />
              <b>
                Voltando para a página principal{" "}
                <Spinner color="success">Loading...</Spinner>
              </b>
              <br />
              <Link to="/">
                <Button className="my-3">Voltar</Button>
              </Link>
            </Alert>
          )}
          {errorMsg && (
            <Alert color="danger">
              <b>Erro no preenchimento dos dados.</b>
              <br />
              <b>{errorList.map((e) => e.message)}</b>
            </Alert>
          )}
        </>
      </Row>
    </Container>
  );
};
