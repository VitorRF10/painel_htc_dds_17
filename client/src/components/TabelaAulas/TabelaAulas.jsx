import { useEffect, useState } from 'react';
import styles from './TabelaAulas.module.css';
import AbrevieData from './AbrevieData';
import AbreviaInstrutor from './AbreviaInstrutor';
import AbreviaUC from './AbreviaUC';
import AbreviaAmbiente from './AbreviaAmbiente';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';

function TabelaAulas({tipo}) {
  const [aulas, setAulas] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      carregarAulas();
    }, 300);
  }, []);

  async function carregarAulas() {
    try {
      const resposta = await fetch('http://localhost:5000/aulas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!resposta) {
        throw new Error('Erro ao buscar aula');
      }

      const consulta = await resposta.json();
      setAulas(consulta);
      //console.log(consulta);
    } catch (error) {
      console.log('Erro ao buscar aulas', error);
    }
  }

async function deletarAula(id){
  try {
    const resposta = await fetch(`http://localhost:5000/aulas/${id}`,{
      method:'DELETE',
      headers:{
        'Content-type':'application/json'
      }
    });
    if (!resposta.ok) {
      const erro = await resposta.json();
        throw new Error ('Erro ao Deletar Usuário', erro);
    }
    else{
      alert('Aula deletada');
      setAulas(aulas.filter(aula=>aula.id !== id))
    }
  } catch (error) {
    throw new Error ('Erro ao Deletar Usuário', error);
    
  }
}

  return (
    <div className={`{styles.aulas} ${tipo === 'edit' ? styles.edit : ''}`}>
      <table className={styles.tabelaAulas}>
        <thead>
          <tr>
            <th>Fim</th>
            <th>Turma</th>
            <th>Inicio</th>
            <th>Instrutor</th>
            <th>Unidade Curricular</th>
            <th>Ambiente</th>
            {tipo === 'edit' && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id}>
              <td>{<AbrevieData data={aula.data_hora_inicio} />}</td>
              <td>{<AbrevieData data={aula.data_hora_fim} />}</td>
              <td>{aula.turma}</td>
              <td>{<AbreviaInstrutor nomeCompleto={aula.instrutor} />}</td>
              <td>
                {<AbreviaUC unidade_curricular={aula.unidade_curricular} />}
              </td>
              <td>{<AbreviaAmbiente nomeAmbiente={aula.ambiente} />}</td>
              {tipo === 'edit' && (
                <td>
                  <Link to={`/editar_aula/${aula.id}`} className="btn btn-warning">Editar</Link>
                  <button className="btn btn-danger ms-2" onClick={()=>deletarAula(aula.id)}>Deletar</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!removeLoading && <Loading />}
      {removeLoading && aulas.length === 0 && <h1>Não há aulas disponíveis</h1>}
    </div>
  );
}

export default TabelaAulas;
