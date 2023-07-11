import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineShopping,
} from "react-icons/ai";
import { IoWalletOutline } from "react-icons/io5";

const hoy = new Date().toISOString();
//console.log(hoy);

const initailForm = {
  _id: null,
  //date: new Date(),
  date: hoy.substr(0, 10),
  account: "",
  total: "",
  category: "",
  comment: "",
  type: "Expense" || "Income",
  status: "",
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
  const refTotal = useRef();
  const refComment = useRef();
  const refNewFecha = useRef();

  useEffect(() => {}, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    refComment.current.value = "";
    refTotal.current.value = "";
    refNewFecha.current.value = hoy.substr(0, 10);

    //let dh = hoy.substr(0, 10);
    //refTotal.current.className = "bg-red-500";
    console.log(form);
    //console.log(refDate.current);

    setForm(initailForm);
    window.location = "../expenses#section4";
    alert("Datos enviados: " + JSON.stringify(form));
  };

  return (
    <div className="px-2">
      <div className="bg-gray-50 shadow-lg text-gray-700 rounded-lg p-4">
        <h1 className="font-semibold mt-2">Nuevo registro</h1>
        <form className="p-4" onSubmit={handleSubmit}>
          {/** TOTAL PAY */}
          <div className="w-full flex justify-center my-3">
            <div className="w-1/2 flex flex-row">
              <label className="form-label pr-2 pt-1 text-lg">$</label>
              <input
                name="total"
                ref={refTotal}
                defaultValue={form.total}
                onChange={handleChange}
                className="font-numero font-thin appearance-none text-3xl bg-transparent border-b w-full border-gray-100  focus:outline-none"
                type="number"
                placeholder="1.00"
              />
            </div>
          </div>

          {/** TYPE */}
          <div className="w-full p-3 px-4 mb-3 flex justify-between border-0 border-gray-300">
            <div className="flex items-center">
              <input
                id="bordered-radio-1"
                type="radio"
                onChange={handleChange}
                onClick={() => (form.category = "")}
                value="Expense"
                name="type"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="bordered-radio-1"
                className="uppercase w-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Gasto
              </label>
            </div>
            <div className="flex items-center">
              <input
                checked={form.type === "Income" ? true : false}
                onChange={handleChange}
                onClick={() => (form.category = "")}
                id="bordered-radio-2"
                type="radio"
                value="Income"
                name="type"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="bordered-radio-2"
                className="uppercase w-full ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Ingreso
              </label>
            </div>
          </div>
          {/** ACCOUNT */}
          <div className="w-full px-3 mb-1 flex flex-row border-b border-gray-300">
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

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/** CATEGORY */}
          <div className="w-full px-3 mb-1 flex flex-row border-b border-gray-300">
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

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/** DATE */}
          <div className="w-full px-3 mb-1 flex flex-row border-b border-gray-300">
            <label className="pt-3 pr-3 text-xl text-gray-400">
              <AiOutlineCalendar />
            </label>
            <div className="relative w-full">
              <input
                name="date"
                ref={refNewFecha}
                defaultValue={form.date}
                onChange={handleChange}
                className="font-numero appearance-none bg-transparent border-0 p-2 w-full focus:outline-none"
                type="date"
              />

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <svg
                  className="fill-current h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          {/** COMMENT */}
          <div className="w-full px-3 mb-6 flex flex-row border-0 border-gray-300">
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
              placeholder={"Comentario"}
            />
          </div>
          {/** BUTTON SAVE */}
          <div className="w-full text-center">
            <button
              type="submit"
              className="w-4/5 p-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-lg shadow-cyan-500/50  font-medium text-sm text-center rounded-full"
            >
              Send {form.type}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
