const fs = require('fs');

function readLinesFromFile(file_name) {
  const act_Plan_lines = [];
  const fileStream = fs.createReadStream(file_name);

  const lineReader = require('readline').createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  lineReader.on('line', (line) => {
    act_Plan_lines.push(line);
  });

  return new Promise((resolve, reject) => {
    lineReader.on('close', () => {
      resolve(act_Plan_lines);
    });

    lineReader.on('error', (err) => {
      reject(err);
    });
  });
}


module.exports = {readLinesFromFile};
