import { useEffect, useState } from 'react'
import AbrevieData from './AbrevieData';
import AbreviaInstrutor from './AbreviaInstrutor'
import AbreviaUC from './AbreviaUC';
import AbreviaAmbiente from './AbreviaAmbiente';

function TabelaAulas() {
    const [aulas, setAulas] = useState([]);

    useEffect(() => {
        carregarAulas();
    }, [])

    async function carregarAulas() {
        try {
            const resposta = await fetch('http://localhost:5000/aulas', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!resposta) {
                throw new Error('Erro ao buscar aula')
            }

            const consulta = await resposta.json();
            setAulas(consulta);
            //console.log(consulta);
        } catch (error) {
            console.log('Erro ao buscar aulas', error);
        }

    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Fim</th>
                        <th>Turma</th>
                        <th>Inicio</th>
                        <th>Instrutor</th>
                        <th>Unidade Curricular</th>
                        <th>Ambiente</th>
                    </tr>
                </thead>
                <tbody>
                    {aulas.map((aula) => (
                        <tr key={aula.id}>
                            <td>{<AbrevieData data={aula.data_hora_inicio} />}</td>
                            <td>{<AbrevieData data={aula.data_hora_fim} />}</td>
                            <td>{aula.turma}</td>
                            <td>{<AbreviaInstrutor nomeCompleto={aula.instrutor} />}</td>
                            <td>{<AbreviaUC unidade_curricular={aula.unidade_curricular} />}</td>
                            <td>{<AbreviaAmbiente nomeAmbiente={aula.ambiente} />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TabelaAulas
