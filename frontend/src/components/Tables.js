import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
} from "reactstrap";
import { BrandTable } from "./brand/BrandTable";
import { GpuTable } from "./gpu/GpuTable";
import { VideoCardTable } from "./videocard/VideoCardTable";

export const Tables = () => {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">
            <b>Ver GPUs registradas no sistema</b>
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <GpuTable />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">
            <b>Ver Marcas registras no sistema</b>
          </AccordionHeader>
          <AccordionBody accordionId="2">
            <h1>MARCAS</h1>
            <BrandTable />
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">
            <b>Ver Placas de Vídeo registradas no sistema</b>
          </AccordionHeader>
          <AccordionBody accordionId="3">
            <h1>PLACAS DE VÍDEO</h1>
            <VideoCardTable />
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
