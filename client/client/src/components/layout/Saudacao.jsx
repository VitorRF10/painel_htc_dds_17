import { useEffect, useState } from "react";
import styles from './Saudacao.module.css';

function Saudacao() {
    //Criando estado da saudação
    const [saudacaoPeriodo, setSaudacaoPeriodo] = useState('');

    useEffect(()=>{
        atualizaSaudacao();

        const intervalo = setInterval(atualizaSaudacao,1000);

        //Interrompe a função ao desmontar o elemento
        return () =>{
            clearInterval(intervalo);
        }
    });
    //Criando texto da saudação
    function atualizaSaudacao() {
        //Declarando o Objeto do tipo Date
        const agora = new Date();

        //Obtendo hora em inteiro exemplo 21:15 retorna 21
        const hora = agora.getHours();

        //Obtendo dia da semana em inteiro iniciando em domingo como 0 e sabado como 6
        const dia = agora.getDay();

        //Declarando varivel testo saudacao
        let textoSaudacao = '';

        // Definindo array dias da semana
        const diaSemana = [
            'Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'
        ];

        //Adicionando o dia da semana ao textoSaudacao
        textoSaudacao = diaSemana[dia];

        if (hora >= 18) {
            textoSaudacao += ' - Boa noite!'
        } else if (hora >= 12) {
            textoSaudacao += ' - Boa tarde!'
        } else if (hora >= 6) {
            textoSaudacao += ' - Bom dia!'
        } else {
            textoSaudacao += ' - Boa madrugada!'
        }
        setSaudacaoPeriodo(textoSaudacao);
    }

    return (
        <div className={styles.saudacao}>{saudacaoPeriodo}</div>
    )
}

export default Saudacao;

