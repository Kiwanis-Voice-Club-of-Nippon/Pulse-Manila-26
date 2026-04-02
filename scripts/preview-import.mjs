import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: node scripts/preview-import.mjs <csv-path>");
  process.exit(1);
}

const absolutePath = resolve(filePath);
const raw = readFileSync(absolutePath, "utf8").trim();
const [headerLine, ...rows] = raw.split(/\r?\n/);

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    const nextCharacter = line[index + 1];

    if (character === '"' && nextCharacter === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current);
  return values;
}

const headers = parseCsvLine(headerLine);

const records = rows.map((row) => {
  const values = parseCsvLine(row);
  return headers.reduce((record, header, index) => {
    record[header] = values[index] ?? "";
    return record;
  }, {});
});

console.log(
  JSON.stringify(
    {
      file: basename(absolutePath),
      rows: records.length,
      sample: records.slice(0, 2),
    },
    null,
    2,
  ),
);
