#!/usr/bin/env node

import {
  prompt,
  InputQuestionOptions,
  ListQuestionOptions,
  Answers,
} from 'inquirer';

import branches from 'list-git-branches';

import committer from './components/committer';
import banner from './components/banner';

const typeChange: ListQuestionOptions<Answers> = {
  message: 'Escolha o tipo da modificação feita no seu repositorio: ',
  name: 'typeChange',
  type: 'list',
  choices: ['feat', 'refactor', 'fix', 'docs', 'style', 'test', 'revert'],
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
    if (answer.length > 10) {
      return true;
    } else {
      return 'Please enter a message of commit.';
    }
  },
};

const questions: Answers[] = [typeChange, scopeChanged, messageCommit];

banner();
prompt(questions)
  .then((answers: Ianswers) => {
    let messageCompleted = '';
    if (answers.scopeChanged === '') {
      messageCompleted = `${answers.typeChange}: ${answers.messageCommit}`;
    } else {
      messageCompleted = `${answers.typeChange}[${answers.scopeChanged}]: ${answers.messageCommit}`;
    }
    committer(messageCompleted)
  })
  .catch((err) => {
    console.log(err);
  });

