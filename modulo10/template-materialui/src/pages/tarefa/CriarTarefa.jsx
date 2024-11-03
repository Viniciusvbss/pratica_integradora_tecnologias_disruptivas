import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, LinearProgress, Box, Grid, Card, CardHeader, CardContent, Button, MenuItem, Select } from '@mui/material';

const CriarTarefa = ({ handleClose, tarefas, setTarefas }) => {
  const [idTarefa, setIdTarefa] = useState();
  const [tituloTarefa, setTituloTarefa] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('');
  const [inicioTarefa, setInicioTarefa] = useState('');
  const [fimTarefa, setFimTarefa] = useState('');
  const [recursoTarefa, setRecursoTarefa] = useState('');
  const [statusTarefa, setStatusTarefa] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let proximoId = Math.max(...tarefas.map(tarefa => tarefa.idTarefa)) + 1;
    setIdTarefa(proximoId);
  }, []);

  useEffect(() => {
    const fields = [tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, recursoTarefa, statusTarefa];
    const filledFields = fields.filter(field => field).length;
    const progressValue = (filledFields / fields.length) * 100;
    setProgress(progressValue);
  }, [tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, recursoTarefa, statusTarefa]);

  const handleRecurso = (event) => {
    setRecursoTarefa(event.target.value);
  };

  const handleStatus = (event) => {
    setStatusTarefa(event.target.value);
  };

  const handleSalvar = () => {
    setTarefas([
      ...tarefas,
      { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, recursoTarefa, statusTarefa }
    ]);
    handleClose();
  };

  return (
    <Grid container spacing={2}>
      <Card sx={style}>
        <CardHeader title="Tarefas" subheader="Cadastro de Tarefas" />
        <CardContent>
          {/* Barra de Progresso */}
          <Box sx={{ width: '100%', mb: 2 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>

          {/* Campos do Formulário */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input id="tarefa_titulo" value={tituloTarefa} onChange={e => setTituloTarefa(e.target.value)} />
              <FormHelperText>Título da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input id="tarefa_descricao" value={descricaoTarefa} onChange={e => setDescricaoTarefa(e.target.value)} />
              <FormHelperText>Descrição da Tarefa.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={3}>
              <FormControl>
                <Input id="tarefa_inicio" type="date" value={inicioTarefa} onChange={e => setInicioTarefa(e.target.value)} />
                <FormHelperText>Início da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl>
                <Input id="tarefa_fim" type="date" value={fimTarefa} onChange={e => setFimTarefa(e.target.value)} />
                <FormHelperText>Fim da Tarefa.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_recurso">Recurso</InputLabel>
                <Select
                  id="tarefa_recurso"
                  value={recursoTarefa}
                  onChange={handleRecurso}
                >
                  <MenuItem value="Recurso 1">Recurso 1</MenuItem>
                  <MenuItem value="Recurso 2">Recurso 2</MenuItem>
                  <MenuItem value="Recurso 3">Recurso 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="tarefa_status">Status</InputLabel>
                <Select
                  id="tarefa_status"
                  value={statusTarefa}
                  onChange={handleStatus}
                >
                  <MenuItem value="Aguardando">Aguardando</MenuItem>
                  <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                  <MenuItem value="Concluída">Concluída</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Botões de Ação */}
          <Grid container spacing={2} mt={2}>
            <Grid item xs={1}>
              <Button size="small" variant="contained" onClick={handleSalvar} sx={{ backgroundColor: 'blueviolet' }}>Salvar</Button>
            </Grid>
            <Grid item xs={1}>
              <Button size="small" variant="outlined" onClick={handleClose}>Cancelar</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  p: 4,
};

export default CriarTarefa;
