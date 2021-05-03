const { getDictionarySync } = require('simple-spellchecker');

const SpellCheckerNode = (words = ['uma', 'safada', 'de', 'saia', 'curta']) => {
  // let wordsWithError = [];
  const dict = getDictionarySync('en-US');
  return words.map((word) => dict.spellCheck(word));
  // dict.spellCheck()
};
console.log(SpellCheckerNode());
