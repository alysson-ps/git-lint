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
import pusher from './components/pusher';

const branchesArray: string[] = branches.sync('.');

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
    if (answer.length > 0) {
      return true;
    } else {
      return 'Please enter a message of commit.';
    }
  },
};

const doPush: ConfirmQuestionOptions<Answers> = {
  message: 'Dejesa realizar o push: ',
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
  when: (answers: any) => answers.doPush,
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
    console.log(answers);
    let messageCompleted = '';
    if (answers.scopeChanged === '') {
      messageCompleted = `${answers.typeChange}: ${answers.messageCommit}`;
    } else {
      messageCompleted = `${answers.typeChange}[${answers.scopeChanged}]: ${answers.messageCommit}`;
    }
    committer(messageCompleted);

    if (answers.doPush) {
      pusher(answers.branch);
    }
  })
  .catch((err) => {
    console.log(err);
  });
