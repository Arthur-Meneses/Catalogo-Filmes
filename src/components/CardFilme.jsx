
function CardFilme(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <img className="poster" src={props.posterUrl} alt={props.title}/>
      <p>Descrição: {props.description}</p>
      <p>Gênero: {props.genre}</p>
      <p>Diretor: {props.director}</p>
      <p>Nota: {props.rating}</p>
      <p>Ano de estréia: {props.releaseYear}</p>
    </div>
  );
}

export default CardFilme;
