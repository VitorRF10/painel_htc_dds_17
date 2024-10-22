//Importando pacote express
import express from 'express';

import { cadastroAula, mostrandoAulas,atualizandoAula, excluindoAula } from './controllers/AulaController.js';

//Intanciando objeto express
const app = express();
const porta = 5000;

//Configurando comunicação em JSON
app.use(express.json());

//Rota de teste da API
app.get('/',(req,res)=>{
    res.send('API funcionando')
});

//Rotas de CRUD de aulas
app.post('/aulas',cadastroAula);
app.get('/aulas',mostrandoAulas);
app.put('/aulas/:id',atualizandoAula);
app.delete('/aulas/:id',excluindoAula);

app.listen(porta, ()=>{
    console.log(`API funcionando na porta ${porta}`)
});