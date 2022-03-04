import React from "react";

export default (props) => {
  const [meaning, setMeaning] = React.useState();
  const [partOfSpeech, setPartOfSpeech] = React.useState();
  React.useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.keyWord}`)
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (!results.title) {
          const [firstResult] = results || [];
          const [firstMeaning] = firstResult.meanings || [];
          setPartOfSpeech(firstMeaning.partOfSpeech);
          const receivedMeanings = [];
        }
      });
  }, [props.keyWord]);

  return (
    <div> {partOfSpeech && <div>part of speech: {partOfSpeech}</div>}</div>
  );
};
