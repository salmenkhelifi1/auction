"use client";
import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import parse from "html-react-parser";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const ItemDescription = ({ items }) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <Accordion
            open={open === item.id}
            icon={<Icon id={item.id} open={open} />}
            placeholder="Accordion Placeholder"
          >
            <AccordionHeader
              onClick={() => handleOpen(item.id)}
              placeholder="Accordion Placeholder"
            >
              Description
            </AccordionHeader>
            <AccordionBody className="list-disc">
              {parse(item.description)}
            </AccordionBody>
          </Accordion>
        </div>
      ))}
    </>
  );
};

export default ItemDescription;
