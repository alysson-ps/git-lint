import SpellChecker from 'simple-spellchecker';

const SpellCheckerNode = (words: string[]) => {
  let wordError: string[] = [];
  SpellChecker.getDictionary('pt-BR', (err: TypeError, dictionary: any) => {
    if (!err) {
      words.map((item) => {
        const misspelled = !dictionary.spellCheck(item);
        if (misspelled) {
          // const suggestions = dictionary.getSuggestions(item);
          wordError.push(item);
        }
      });
    }
  });

  return wordError.length > 0 ? false : true;
};

export default SpellCheckerNode;
