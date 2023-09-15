import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineShopping,
} from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { TYPES } from "../reducers/controlReducer";
import { useAppContext } from "../context/AppProvider";

const hoy = new Date().toISOString();
//console.log(hoy);

const initailForm = {
  //_id: null,
  //date: new Date(),
  date: hoy.substr(0, 10),
  account: "",
  total: "",
  category: "",
  comment: "",
  type: "Expense" || "Income",
  //status: "",
};

const expensesCategory = [
  "Alimentos y bebidas", // compras en el supermercado
  "Automovil", // gasolina, reparaciones, labado, otros
  "Bebe", // compras para bebe.
  "Belleza e higiene", // gym, spa, peluqueria, accesorios, productos de limpieza otros
  "Casa o vivienda", // muebles, alquiler, reparaciones.
  "Cine", // cine, transporte y comida,
  "Equipos electronicos", //artefactos, pc,
  "Estudios formacion", // libros, cursos, etc
  "Facturas y pagos", //luz, gas, agua, celu, tv, inter, otros
  "Mascota", // veterinaria, comida, otros
  "Regalos", // cumpleanos, obsequios, otros
  "Restaurante", // comida fuera de casa
  "Ropa y calzado", //ropa, calzado, accesorios
  "Salud", // dentista, medicos, farmacia, otros.
  "Transporte", // pasajes, taxi, carne de pasaje, otros
  "Vacaciones", // paseos, playas, viajes.
  "Otros gastos",
];

const incomeCategory = [
  "Alquiler", //
  "Cliente", //
  "Negocios", //
  "Regalo", //
  "Salario",
  "Servicios",
  "Otros ingresos",
];

const accounts = [
  "Efectivo",
  "Cuenta Bancaria",
  "Tarjeta de credito",
  "Caja fuerte",
  "Otros",
];

const Formulario = () => {
  const [form, setForm] = useState(initailForm);
  const { dispatch, transactionCreate } = useAppContext();

  const refTotal = useRef();
  const refComment = useRef();
  const refNewFecha = useRef();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
    transactionCreate(form);

    refComment.current.value = "";
    refTotal.current.value = "";
    refNewFecha.current.value = hoy.substr(0, 10);

    //let dh = hoy.substr(0, 10);
    //refTotal.current.className = "bg-red-500";

    //console.log(refDate.current);
    setForm(initailForm);

    //window.location = "/transactions";
    navigate("/transactions");
    //alert("Datos enviados: " + JSON.stringify(form));
    alert("DATA SEND: " + JSON.stringify(form.category));
  };

  return (
    <div className="w-full md:max-w-[600px] mt-32 mx-4 min-hX-[calc(100vh-250px)] bg-white/95 rounded-2xl rounded-tl-[80px] rounded-br-[40px]">
      <div className="bg-transparent text-gray-500 p-4 md:p-8 mx-4 mb-4 mt-12">
        <form onSubmit={handleSubmit}>
          <div className="bg-gradient-to-l from-cyan-400 via-cyan-500 to-cyan-600 text-white p-4 md:p-8 rounded-xl rounded-tl-[50px] -mt-8 animate__animated animate__jello animate__delay-1s animate__fastT animate__repeat-1">
            <h1 className="text-center text-xl mb-3">Nuevo registro</h1>
            <p className="pl-2 text-gray-200 text-sm mb-1">
              Seleciona el tipo de transaccion
            </p>
            {/** TYPE */}
            <div className="w-full flex justify-between">
              <div className="w-full pb-1 shadow shadow-gray-200 rounded-l-md bg-gradient-to-br from-pink-600 to-orange-400 hover:font-bold hover:text-white -mr-0.5">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  onChange={handleChange}
                  onClick={() => (form.category = "")}
                  value="Expense"
                  name="type"
                  className="hidden"
                />
                <label
                  htmlFor="bordered-radio-1"
                  className={`w-full flex justify-center rounded-tl-md p-4 text-sm ${
                    form.type === "Income"
                      ? "text-gray-400 bg-gray-200"
                      : "text-white bg-gray-50/10 font-semibold animate__animated animate__headShake animate__slower animate__repeat-1 animate__delay-1sX"
                  }`}
                >
                  Gasto
                </label>
              </div>

              <div className="w-full pb-1 shadow shadow-gray-200 rounded-r-md bg-gradient-to-br from-purple-500 to-blue-400 hover:font-bold hover:text-white ">
                <input
                  checked={form.type === "Income" ? true : false}
                  onChange={handleChange}
                  onClick={() => (form.category = "")}
                  id="bordered-radio-2"
                  type="radio"
                  value="Income"
                  name="type"
                  className="hidden"
                />
                <label
                  htmlFor="bordered-radio-2"
                  className={`w-full flex justify-center rounded-tr-md p-4 text-sm ${
                    form.type === "Income"
                      ? "text-white bg-gray-50/10 font-semibold animate__animated animate__headShake animate__slower animate__repeat-1"
                      : "text-gray-400 bg-gray-200"
                  }`}
                >
                  Ingreso
                </label>
              </div>
            </div>

            <span className="hidden relative inline-flexX items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                Pink to orange
              </span>
            </span>
          </div>
          <div className="pt-4 md:p-12">
            {/** TOTAL PAY  */}
            <div className="w-full px-3 mb-3 flex flex-row border-b border-gray-200">
              <div className="flex flex-row">
                <label className="form-label pl-2 pr-4 pt-1 text-lg text-gray-400">
                  $
                </label>
                <input
                  name="total"
                  ref={refTotal}
                  defaultValue={form.total}
                  onChange={handleChange}
                  className="font-numero font-extralight appearance-none text-3xl bg-transparent w-full p-1 focus:outline-none"
                  type="number"
                  placeholder=".0"
                />
              </div>
            </div>

            {/** ACCOUNT */}
            <div className="w-full px-3 mb-3 flex flex-row border-b border-gray-200">
              <label className="pt-2 pr-3 text-xl text-gray-400">
                <IoWalletOutline />
              </label>
              <div className="w-full relative">
                <select
                  name="account"
                  onChange={handleChange}
                  className="form-select appearance-none bg-transparent border-0 p-2 w-full focus:outline-none"
                  value={form.account}
                >
                  <option></option>
                  {accounts.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}

                  {/*expensesTypes.forEach((ele) => {
                    <option value={ele}>{ele}</option>;
                  })*/}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/** CATEGORY */}
            <div className="w-full px-3 mb-3 flex flex-row border-b border-gray-200">
              <label className="pt-2 pr-3 text-xl text-gray-400">
                <AiOutlineShopping />
              </label>
              <div className="relative w-full">
                {form.type === "Expense" ? (
                  <select
                    name="category"
                    onChange={handleChange}
                    className="form-select appearance-none bg-transparent border-0 p-2 w-full focus:outline-none"
                    value={form.category}
                  >
                    <option></option>
                    {expensesCategory.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}

                    {/*expensesTypes.forEach((ele) => {
                    <option value={ele}>{ele}</option>;
                  })*/}
                  </select>
                ) : (
                  <select
                    name="category"
                    onChange={handleChange}
                    className="form-select appearance-none bg-transparent border-0 p-2 w-full focus:outline-none"
                    value={form.category}
                  >
                    <option></option>
                    {incomeCategory.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}

                    {/*expensesTypes.forEach((ele) => {
                    <option value={ele}>{ele}</option>;
                  })*/}
                  </select>
                )}

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/** DATE */}
            <div className="w-full px-3 mb-3 flex flex-row border-b border-gray-200">
              <label className="pt-3 pr-3 text-xl text-gray-400">
                <AiOutlineCalendar />
              </label>
              <div className="relative w-full">
                <input
                  name="date"
                  ref={refNewFecha}
                  defaultValue={form.date}
                  onChange={handleChange}
                  className="font-numero font-normal appearance-none bg-transparent border-0 p-2 w-full focus:outline-none"
                  type="date"
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            {/** COMMENT */}
            <div className="w-full px-3 mb-6 flex flex-row border-0 border-gray-200">
              <label className="pt-2 pr-3 text-xl text-gray-400">
                <AiOutlineEdit />
              </label>
              <textarea
                name="comment"
                ref={refComment}
                rows="2"
                defaultValue={form.comment}
                onChange={handleChange}
                className="form-input appearance-none bg-transparent border-0 p-2 w-full
                focus:outline-none"
                placeholder={"Escribe un comentario"}
              />
            </div>
            {/** BUTTON SAVE */}
            <div className="w-full text-center">
              <button
                type="submit"
                className="w-4/5 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center"
              >
                Send {form.type}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
