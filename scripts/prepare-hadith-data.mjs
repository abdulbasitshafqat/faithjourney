import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

const editions = [
  "ara-bukhari",
  "eng-bukhari",
  "urd-bukhari",
  "ara-muslim",
  "eng-muslim",
  "urd-muslim",
  "ara-abudawud",
  "eng-abudawud",
  "urd-abudawud",
];

const projectRoot = process.cwd();
const sourceRoot = path.resolve(projectRoot, "src/lib/data/hadith/editions");
const destinationRoot = path.resolve(projectRoot, "public/data/hadith/editions");

await mkdir(destinationRoot, { recursive: true });

await Promise.all(
  editions.map(async (edition) => {
    const source = path.join(sourceRoot, edition, "sections");
    const destination = path.join(destinationRoot, edition, "sections");
    await cp(source, destination, { recursive: true, force: true });
  }),
);

console.log(`Prepared on-demand Hadith data for ${editions.length} editions.`);
