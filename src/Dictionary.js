import React from "react";

export default (props) => {
  const [phonetic, setPhonetic] = React.useState();
  const [meanings, setMeanings] = React.useState();

  React.useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${props.keyWord}`)
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (!results.title) {
          const [firstResult] = results || [];

          const findPhoneticWithText = (phonetic) => {
            if (phonetic.text && phonetic.audio) {
              return true;
            }
            return false;
          };
          const foundResultWithPhonetic = results.find((result) => {
            if (result.phonetics && result.phonetics.length) {
              return result.phonetics.find(findPhoneticWithText);
            }
            return false;
          });

          if (foundResultWithPhonetic) {
            const foundPhoneticWithText =
              foundResultWithPhonetic.phonetics.find(findPhoneticWithText);

            setPhonetic(foundPhoneticWithText);
          }

          const meanings = results.reduce((accumulatedMeanings, result) => {
            return [...accumulatedMeanings, ...result.meanings];
          }, []);
          console.log({ meanings });
          setMeanings(meanings);
        }
      });
  }, [props.keyWord]);

  return (
    <div>
      {" "}
      {phonetic && (
        <div>
          {" "}
          <a href={phonetic.audio}>Link</a>
          <h2>{phonetic.text}</h2>
        </div>
      )}
      <div className="meanings">
        {meanings &&
          meanings.map((meaning) => {
            return (
              <div>
                <h2>{meaning.partOfSpeech}</h2>
                <ul>
                  {meaning.definitions.map((definition) => {
                    return <li>{definition.definition}</li>;
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};
