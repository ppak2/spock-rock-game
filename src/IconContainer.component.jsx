import "./App.css";

export const Icon = ({ who, showSide, showScore }) => {
  
  return (
    <>
      <h2>
        {`${showSide}`} - <span id={`${who}Score`}>{showScore}</span>
        <span className="choice" id={`${who}Choice`}>
          
        </span>
      </h2>
      <i className="far fa-hand-rock" title="Rock" id={`${who}Rock`}></i>
      <i className="far fa-hand-paper" title="Paper" id={`${who}Paper`}></i>
      <i
        className="far fa-hand-scissors"
        title="Scissors"
        id={`${who}Scissors`}
      ></i>
      <i className="far fa-hand-lizard" title="Lizard" id={`${who}Lizard`}></i>
      <i className="far fa-hand-spock" title="Spock" id={`${who}Spock`}></i>
    </>
  );
};
