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

export const UpdateBrand = () => {
  const [brand, setBrand] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/brands/${id}`).then((res) => {
      setBrand(res.data);
      console.log(res.data);
    });
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    axios
      .put(`${baseURL}/brands/${id}`, brand)
      .then((res) => {
        setBrand(res.data);
        setErrorMsg(false);
        setSuccessMsg(true);

        setTimeout(() => {
          setSuccessMsg(false);
          navigate("/");
        }, 1500);

        console.log(res);
      })
      .catch((e) => {
        console.log(e.response);

        setSuccessMsg(false);
        setErrorMsg(true);
      });
  }

  return (
    <Container className="container bg-light my-5 w-75">
      <Row>
        <Col>
          <Form onSubmit={handleUpdate} className="form-inline">
            <h3>
              Alterar nome da Marca:
              <b className="text-primary"> {brand.name}</b>
            </h3>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col className="">
                <Label className="">Nome</Label>
                <Input
                  defaultValue={brand.name}
                  type="text"
                  onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                  className="form-control w-75 "
                />
              </Col>
            </Row>
            <Col className="my-2">
              <Button>Alterar</Button>
            </Col>
          </Form>
        </Col>
        <>
          {successMsg && (
            <Alert>
              <b>Marca alterada com sucesso.</b>
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
            </Alert>
          )}
        </>
      </Row>
    </Container>
  );
};
