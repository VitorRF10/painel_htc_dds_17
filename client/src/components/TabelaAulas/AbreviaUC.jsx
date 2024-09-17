function AbreviaUC(props) {
    let nome = props.unidade_curricular.toString();
    const nomes = nome.split(" ")
    
   if (nomes.length === 1){
    return nomes[0]
  }
  return (
    nomes[0] + ' ' + nomes.pop()
  )
}

export default AbreviaUC;
