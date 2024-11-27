import { EpubParser } from "../src/ReadEpub.js";

(async () => {
  let epubFilePath = "/home/sonnycalcr/HDisk/Books/Test/沉默的大多数.epub";
  // epubFilePath = "/home/sonnycalcr/HDisk/Books/Test/沉重的翅膀.epub";
  // epubFilePath = "/home/sonnycalcr/HDisk/Books/Test/背叛.epub";
  const epubParser = new EpubParser(epubFilePath);
  await epubParser.parseBasic();
  console.log("metadata: ");
  console.log(epubParser.bookMetadata.title);
  console.log(epubParser.bookMetadata.author);
  console.log(epubParser.bookMetadata.language);
  console.log(epubParser.bookMetadata.date);
  console.log(epubParser.bookMetadata.publisher);
  console.log(epubParser.bookMetadata.identifier);
  console.log("============================================");
  console.log("manifest: ");
  epubParser.bookManifest.printManifest();
  console.log("============================================");
  console.log("spine: ");
  epubParser.bookSpine.printSpine();
})();
