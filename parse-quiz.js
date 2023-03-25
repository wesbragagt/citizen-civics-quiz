const fs = require('fs');
const path = require("path");
const fileRead = fs.readFileSync('./quiz', 'utf8')

const questionsMap = fileRead.split("\n\n").reduce((acc, cur, i) => {
  const questionNumberRegex = /\d+\./;
  const questionNumberMatch = cur.match(questionNumberRegex);
  if (questionNumberMatch) {
    acc.set(questionNumberMatch[0].replace('.', ''), {
      question: cur.match(/\d+\..*/)[0].replace(/\t/g, '').trim(),
      answers: cur.replace(/(\d+\..*)\n(.*)/, '$2').split('\n').filter(Boolean).map((value) => value.replace(/\t/g, '').trim())
    })
  }


  return acc;
}, new Map());

const quiz = Array.from(questionsMap, ([key, value]) => value);

fs.writeFile('./quiz.json', JSON.stringify(quiz), () => {
  console.log('done')
})
