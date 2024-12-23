import * as os from "os";
import { EpubParser } from "../src/ReadEpub.js";

function getOperatingSystem(): string {
  const platform = os.platform();
  switch (platform) {
    case "win32":
      return "Windows";
    case "darwin":
      return "MacOS";
    case "linux":
      return "Linux";
    case "android":
      return "Android";
    case "freebsd":
      return "FreeBSD";
    case "sunos":
      return "Solaris";
    default:
      return "Unknown OS";
  }
}

(async () => {
  // default os is linux
  let epubSystemPath = "/home/sonnycalcr/";
  // if os is osx
  if (getOperatingSystem() === "MacOS") epubSystemPath = "/Users/sonnycalcr/";
  let epubFilePath: string =
    epubSystemPath + "HDisk/Books/Test/沉默的大多数.epub";
  // epubFilePath = epubSystemPath + "HDisk/Books/Test/沉重的翅膀.epub";
  // epubFilePath = epubSystemPath + "HDisk/Books/Test/背叛.epub";

  const epubParser = new EpubParser(epubFilePath);
  await epubParser.parseBasic();

  console.log("book file data(info): ");
  if (epubParser.bookFileData) {
    // ./ is the root dir of unzipped epub/zip file
    console.log("./" + epubParser.bookFileData.contentRootDir);
    console.log("pure root dir: " + epubParser.bookFileData.contentRootDir);
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

  console.log("============================================");
  console.log("chapters contents:");
  if (epubParser.bookChapters) {
    console.log(epubParser.bookChapters.getChapter(8));
  } else {
    console.log("No chapters found.");
  }
})();
