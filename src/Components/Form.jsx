import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { farms, labs } from "../Data";

export default function Form() {
  const [indexProd, setIndexProd] = useState("");
  const [indexLab, setIndexLab] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          const {
            nome,
            dataInicial,
            dataFinal,
            indexPropriedade,
            indexlaboratorio,
            observacoes,
          } = data;

          const form = {
            nome,
            dataInicial,
            dataFinal,
            infosPropriedade: {
              id: indexPropriedade,
              ...farms[indexPropriedade],
            },
            laboratorio: {
              id: indexlaboratorio,
              nome: labs[indexlaboratorio],
            },
            observacoes,
          };
          console.log(form);
        })}
      >
        <div>
          <div>Teste front-end</div>
          <button type="submit">Salvar</button>
        </div>
        <div>
          <label htmlFor="nome">
            <div>
              Nome *:
              <input
                id="nome"
                {...register("nome", {
                  required: "Preencha os campos obrigatórios",
                  maxLength: 40,
                })}
              />
              <p>
                {errors.nome?.message ||
                  errors.dataInicial?.message ||
                  errors.dataFinal?.message ||
                  errors.infosPropriedade?.message ||
                  errors.laboratorio?.message ||
                  errors.observacoes?.message}
              </p>
            </div>
          </label>

          <label htmlFor="datainicial">
            <div>
              Data Inicial *:
              <input
                id="datainicial"
                type="date"
                {...register("dataInicial", {
                  required: "Preencha os campos obrigatórios",
                })}
              />
            </div>
          </label>
          <label htmlFor="datafinal">
            <div>
              Data Final *:
              <input
                id="datafinal"
                type="date"
                {...register("dataFinal", {
                  required: "Preencha os campos obrigatórios",
                })}
              />
            </div>
          </label>
          <label htmlFor="select1">
            {indexProd !== "" && <div>Propriedades *</div>}
            <select
              name="select1"
              defaultValue={"DEFAULT"}
              {...register("indexPropriedade", {
                required: "Preencha os campos obrigatórios",
              })}
              value={indexProd}
              onChange={({ target }) => setIndexProd(target.value)}
            >
              <option value="DEFAULT">Propriedades</option>
              {farms.map(({ nome, cnpj }, id) => {
                return (
                  <option key={id} value={id}>
                    <>{nome}</>
                    <>{cnpj}</>
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="select2">
            {indexLab !== "" && <div>Laboratório *</div>}
            <select
              name="select2"
              defaultValue={"DEFAULT"}
              {...register("indexlaboratorio", {
                required: "Preencha os campos obrigatórios",
              })}
              value={indexLab}
              onChange={({ target }) => setIndexLab(target.value)}
            >
              <option value="DEFAULT">Laboratório</option>
              {labs.map((lab, id) => {
                return (
                  <option key={id} value={id}>
                    {lab}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="observacoes">
            <div>
              Observações:
              <input
                id="observacoes"
                type="text-area"
                {...register("observacoes", {
                  required: "Preencha os campos obrigatórios",
                  maxLength: 1000,
                })}
              />
            </div>
          </label>
        </div>
      </form>
    </div>
  );
}
