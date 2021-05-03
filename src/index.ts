#!/usr/bin/env node
import {
  prompt,
  InputQuestionOptions,
  ListQuestionOptions,
  Answers,
  ConfirmQuestionOptions,
  Question,
  CheckboxQuestionOptions,
} from 'inquirer';
import branches from 'list-git-branches';
import { getDictionary } from 'simple-spellchecker';

import committer from './components/committer';
import banner from './components/banner';

const branchesArray: string[] = branches.sync('.');

const typeChange: ListQuestionOptions<Answers> = {
  message: 'Escolha o tipo da modificação feita no seu repositorio: ',
  name: 'typeChange',
  type: 'list',
  choices: ['feat', 'refactor', 'fix', 'docs', 'style', 'test'],
};

const scopeChanged: InputQuestionOptions<Answers> = {
  message: 'Qual escopo foi modificado: ',
  name: 'scopeChanged',
  type: 'input',
  filter: (answer: string) => {
    return answer.toLowerCase();
  },
  default: '',
};

const messageCommit: InputQuestionOptions<Answers> = {
  message: 'Escreva uma mensagem de commit: ',
  name: 'messageCommit',
  type: 'input',
  filter: (answer: string) => {
    return answer.toLowerCase();
  },
  validate: (answer: string) => {
    if (answer.length > 0) {
      const words = answer.split(' ');
      const res = getDictionary('pt-BR', (err: TypeError, dictionary: any) => {
        if (!err) {
          words.map((item) => {
            const misspelled = !dictionary.spellCheck(item);
            if (misspelled) {
              const suggestions = dictionary.getSuggestions(item);
              return JSON.stringify(suggestions);
            } else {
              return misspelled;
            }
          });
        }
      });
      return res;
    } else {
      return 'Please enter a message of commit.';
    }
  },
};

const doPush: ConfirmQuestionOptions<Answers> = {
  message: 'Quer fazer o push: ',
  name: 'doPush',
  type: 'confirm',
};

const branch: ListQuestionOptions<Answers> = {
  message: 'Escolha a branch para fazer o commit: ',
  name: 'branch',
  type: 'list',
  choices: branchesArray.filter(
    (item, index) => branchesArray.indexOf(item) === index
  ),
};

const questions: Answers[] = [
  typeChange,
  scopeChanged,
  messageCommit,
  doPush,
  branch,
];

banner();
prompt(questions)
  .then((answers: Ianswers) => {
    let messageCompleted = '';
    if (answers.scopeChanged === '') {
      messageCompleted = `${answers.typeChange}: ${answers.messageCommit}`;
    } else {
      messageCompleted = `${answers.typeChange}[${answers.scopeChanged}]: ${answers.messageCommit}`;
    }
    console.log(messageCompleted);
    // committer()
  })
  .catch((err) => {
    console.log(err);
  });
