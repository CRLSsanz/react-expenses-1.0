import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useAppContext } from "../context/AppProvider";
const cargarImagen = require.context("../images", true);

const cmeses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const TransactionRow = ({ item, dataGroup }) => {
  const [isOpen, setIsOpen] = useState();

  const { datos, filterStateMovim, filterDispatchMovim, transactionDelete } =
    useAppContext();
  const { byAge, byMonth } = filterStateMovim;

  const nombreDelDiaSegunFecha = (fecha) =>
    ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"][
      new Date(fecha).getDay()
    ];

  const handleDelete = (id) => {
    //alert("eliminar doc con el id: " + id);
    transactionDelete(id);
  };

  return (
    <div
      className={`bg-gray-50 border-r-2   ${
        item.type === "Income"
          ? " hover:bg-cyan-50 border-cyan-400 "
          : " hover:bg-red-50 border-red-400 "
      } `}
    >
      <div
        className="relative w-full flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="absolute top-2 left-2 shadow bg-gray-100 rounded-full p-1">
          <img
            src={cargarImagen(`./${item.category}.png`)}
            style={{ width: "23px" }}
            alt={item.category}
          />
        </div>

        <div className="pl-12 p-3 text-gray-800 tracking-wide hover:font-medium">
          <h1> {item.category}</h1>
        </div>

        <div
          className={`text-gray-600X text-base whitespace-nowrap font-numero pr-2 ${
            item.type === "Income" ? " text-blue-500X " : "text-red-500X"
          } `}
        >
          {item.type === "Income" ? (
            <span className="hidden font-bold text-blue-500">{" +"}</span>
          ) : (
            <span className="hidden font-semibold text-red-500">{" - "}</span>
          )}
          {item.total}
          <span className="text-sm">{" $"}</span>
        </div>
      </div>
      {isOpen && (
        <div className="relative border-b border-gray-100 -mt-2 pb-4 px-12">
          <p className="text-gray-400 text-sm">{item.comment}</p>
          <div className="absolute bottom-3.5 right-3 shadowX bg-whiteX rounded-full p-2X ">
            <MdDeleteOutline
              className="text-lg text-gray-300"
              onClick={() => handleDelete(item._id)}
            />
          </div>
        </div>
      )}

      {/**
  <div
    key={index}
    className={`relative bg-white shadow border-r-2 rounded-tl-3xl rounded-bl-lg p-3 mb-2
    flex flex-col items-start ${
      item.type === "Income" ? " border-cyan-500  " : " border-red-400 "
    } `}
  >
    <div className="absolute top-3 left-3 shadow bg-gray-100 rounded-full p-2">
      <img
        src={cargarImagen(`./${item.category}.png`)}
        style={{ width: "25px" }}
        alt={item.category}
      />
    </div>

    <div className="pl-12 border-b border-gray-100 w-full flex flex-row justify-between items-center mb-1">
      <div className="whitespace-nowrap text-sm text-end font-numero ">
        {item.date.substr(5, 5) === monthDay ? (
          <h1>Hoy {nombreDelDiaSegunFecha(item.date)}</h1>
        ) : (
          <p>
            {item.date.substr(8, 2) +
              " " +
              cmeses[Number(byMonth - 1)] +
              ". (" +
              nombreDelDiaSegunFecha(item.date) +
              ")"}
          </p>
        )}
        {item.date.substr(5, 5) === dataGroup ? (
          <p>no ver</p>
        ) : (
          <p>mostrar</p>
        )}
        <p className="hidden">{(dataGroup = item.date.substr(5, 5))}</p>
      </div>
      <div
        className={`text-gray-600X text-base whitespace-nowrap font-numero font-normal ${
          item.type === "Income" ? " text-blue-500 " : "text-red-500"
        } `}
      >
        {item.type === "Income" ? (
          <span className="hidden font-bold text-blue-500">{" +"}</span>
        ) : (
          <span className="hidden font-semibold text-red-500">
            {" - "}
          </span>
        )}
        <span className="text-sm">{"$"}</span>
        {item.total}
      </div>
    </div>

    <p className="w-full pl-12 pr-10 pt-0.5 text-justify text-xs tracking-wide leading-tight text-gray-400 flex items-center">
      {item.comment}
    </p>

    <div className="absolute bottom-2.5 right-3 shadowX bg-whiteX rounded-full p-2X ">
      <MdDeleteOutline
        className="text-lg text-gray-300"
        onClick={() => handleDelete(item._id)}
      />
    </div>
  </div>
   */}
    </div>
  );
};

export default TransactionRow;
