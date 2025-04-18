import type { Rule } from 'eslint';

import chalk from 'chalk';
import ora from 'ora';

const start = Date.now();
const rootPath = `${process.cwd()}/`;
const spinner = ora();

let files = 0;
let bindExit = false;

function exitCallback(exitCode: number) {
  const elapsed = chalk.blue((Date.now() - start) / 1000);
  const nbFiles = chalk.blue(files);
  if (exitCode === 0) {
    spinner.succeed(`Lint ${chalk.green('finished')} after processing '${nbFiles}' files in '${elapsed}' seconds.`);
  } else {
    spinner.fail(`Lint ${chalk.red('failed')} after processing '${nbFiles}' files in '${elapsed}' seconds.`);
  }
}

function create(context: Rule.RuleContext): Rule.RuleListener {
  files += 1;
  if (!bindExit) {
    process.on('exit', exitCallback);
    bindExit = true;
  }

  spinner.text = `${chalk.blue('Processing')}: ${chalk.whiteBright(context.filename.replace(rootPath, ''))} \n`;
  spinner.render();

  return {};
}

const meta: Rule.RuleMetaData = {
  type: 'layout',
  docs: {
    description: 'Print progress indicator while linting.',
    url: 'https://github.com/dvcol/eslint-config',
  },
  messages: {
    lintProgressError: 'Error while linting',
  },
  schema: [],
};

export const name = 'lint-progress';
export const rule: Rule.RuleModule = {
  meta,
  create,
};

export default {
  name,
  rule,
};
