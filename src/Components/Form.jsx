import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Box,
  Grid,
  Paper,
  makeStyles,
  createStyles,
} from "@material-ui/core";

import { farms, labs } from "../Data";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: 32.9,
    },
    header: {
      color: "white",
    },
    menuItem: {
      size: 8,
    },
  })
);

export default function Form() {
  const [selectedInitialDate, setSelectedInitialDate] = useState(new Date());
  const [selectedFinalDate, setSelectedFinalDate] = useState(new Date());
  const styles = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleInitialDateChange = (date) => {
    const fulldate = new Date(date);

    setSelectedInitialDate(fulldate);
  };

  const handleFinalDateChange = (date) => {
    const fulldate = new Date(date);

    setSelectedFinalDate(fulldate);
  };

  return (
    <Paper className={styles.container}>
      <Box
        container
        component="form"
        onSubmit={handleSubmit((data) => {
          const { nome, indexPropriedade, indexlaboratorio, observacoes } =
            data;

          const form = {
            nome,
            dataInicial: selectedInitialDate,
            dataFinal: selectedFinalDate,
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
        <Grid container style={{ boxShadow: "15px" }}>
          <Grid
            container
            direction="row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "darkcyan",
              height: "72px",
              padding: 16,
            }}
          >
            <h3 className={styles.header}>Teste front-end</h3>
            <Button
              style={{ backgroundColor: "transparent", color: "white" }}
              align="center"
              type="submit"
            >
              Salvar
            </Button>
          </Grid>

          <Grid container direction="row" justifyContent="space-between">
            <Grid item spacing="8" style={{ padding: 12 }}>
              <TextField
                name="nome"
                required
                style={{ width: "576px" }}
                id="nome"
                label="Nome:"
                error={!!errors.nome}
                helperText={
                  errors.nome
                    ? errors.nome.message
                    : "Preencha os campos obrigatórios"
                }
                {...register("nome", {
                  required: "Preencha os campos obrigatórios",
                  maxLength: 40,
                })}
              />
            </Grid>
            <Grid item style={{ padding: 16 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data Inicial:"
                  name="dataInicial"
                  inputFormat="MM/dd/yyyy"
                  value={selectedInitialDate}
                  onChange={handleInitialDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item style={{ padding: 16 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Data Final:"
                  name="dataFinal"
                  inputFormat="MM/dd/yyyy"
                  value={selectedFinalDate}
                  onChange={handleFinalDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing="12"
            style={{ padding: 16 }}
          >
            <Grid item spacing="6">
              <FormControl variant="standard" style={{ width: "576px" }}>
                <InputLabel id="propriedades">Propriedades</InputLabel>
                <Select
                  labelId="propriedades"
                  id="propriedadesId"
                  defaultValue={""}
                  name="propriedades"
                  // inputRef={register}
                  error={!!errors.propriedades}
                  helperText={
                    errors.propriedades
                      ? errors.propriedades.message
                      : "Preencha os campos obrigatórios"
                  }
                  {...register("indexPropriedade", {
                    required: "Preencha os campos obrigatórios",
                  })}
                  label="Propriedades"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {farms.map(({ nome, cnpj }, id) => {
                    return (
                      <MenuItem
                        key={id}
                        direction="column"
                        className={styles.menuItem}
                        value={id}
                      >
                        <>{nome}</>
                        <>{cnpj}</>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item spacing="6">
              <FormControl variant="standard" style={{ width: "576px" }}>
                <InputLabel id="laboratorio">Laboratório</InputLabel>
                <Select
                  labelId="laboratorio"
                  id="laboratorioId"
                  defaultValue={""}
                  error={!!errors.laboratorio}
                  helperText={
                    errors.laboratorio
                      ? errors.laboratorio.message
                      : "Preencha os campos obrigatórios"
                  }
                  {...register("indexlaboratorio", {
                    required: "Preencha os campos obrigatórios",
                  })}
                  label="laboratorio"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {labs.map((lab, id) => {
                    return (
                      <MenuItem key={id} value={id}>
                        {lab}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item style={{ padding: 16, width: "100%", marginBottom: 44 }}>
            <TextField
              name="observacoes"
              style={{ marginBottom: 44 }}
              required
              fullWidth
              id="observacoes"
              label="Observações:"
              multiline
              rows={10}
              defaultValue={""}
              error={!!errors.observacoes}
              helperText={
                errors.observacoes
                  ? errors.observacoes.message
                  : "Preencha os campos obrigatórios"
              }
              {...register("observacoes", {
                required: "Preencha os campos obrigatórios",
                maxLength: 1000,
              })}
            />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
