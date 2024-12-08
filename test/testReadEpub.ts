import { EpubParser } from "../src/ReadEpub.js";

(async () => {
  let epubFilePath: string =
    "/home/sonnycalcr/HDisk/Books/Test/沉默的大多数.epub";
  // epubFilePath = "/home/sonnycalcr/HDisk/Books/Test/沉重的翅膀.epub";
  // epubFilePath = "/home/sonnycalcr/HDisk/Books/Test/背叛.epub";

  const epubParser = new EpubParser(epubFilePath);
  await epubParser.parseBasic();

  console.log("book file data(info): ");
  if (epubParser.bookFileData) {
    // ./ is the root dir of unzipped epub/zip file
    console.log("./" + epubParser.bookFileData.contentRootDir);
  }

  console.log("metadata:");
  if (epubParser.bookMetadata) {
    console.log(epubParser.bookMetadata.title);
    console.log(epubParser.bookMetadata.author);
    console.log(epubParser.bookMetadata.language);
    console.log(epubParser.bookMetadata.date);
    console.log(epubParser.bookMetadata.publisher);
    console.log(epubParser.bookMetadata.identifier);
  } else {
    console.log("No metadata found.");
  }

  console.log("============================================");
  console.log("manifest:");
  if (epubParser.bookManifest) {
    epubParser.bookManifest.printManifest();
  } else {
    console.log("No manifest found.");
  }

  console.log("============================================");
  console.log("spine:");
  if (epubParser.bookSpine) {
    epubParser.bookSpine.printSpine();
  } else {
    console.log("No spine found.");
  }
})();
