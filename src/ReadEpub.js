import fs from "fs";
import JSZip from "jszip";
import { Parser } from "xml2js";
import { BookMetadata } from "./book/BookData.js";

export class EpubParser {
  constructor(filePath) {
    this.filePath = filePath;
    this.opfData = null;
    this.metadata = null;
    this.bookMetadata = null;
  }

  // getters and setters
  get opfData() {
    return this._opfData;
  }

  set opfData(value) {
    this._opfData = value;
  }

  get metadata() {
    return this._metadata;
  }

  set metadata(value) {
    this._metadata = value;
  }

  get bookMetadata() {
    return this._bookMetadata;
  }

  set bookMetadata(value) {
    this._bookMetadata = value;
  }

  async parseBasic() {
    const zip = new JSZip();
    try {
      // read epub file
      const data = fs.readFileSync(this.filePath);
      // load epub file
      const content = await zip.loadAsync(data);
      // read container.xml
      const containerXml = await content
        .file("META-INF/container.xml")
        .async("string");
      const parser = new Parser({
        explicitArray: true,
        mergeAttrs: true,
        explicitCharkey: true,
      });
      // use xml2js to parse XML
      const containerData = await parser.parseStringPromise(containerXml);
      const rootFilePath =
        containerData.container.rootfiles[0].rootfile[0]["full-path"][0];
      // read opf file
      const opfContent = await content.file(rootFilePath).async("string");
      // parse opf file
      this.opfData = await parser.parseStringPromise(opfContent);
      this.metadata = this.opfData["package"]["metadata"][0];
      const title = this.metadata["dc:title"]?.[0]?.["_"] || "";
      const author = this.metadata["dc:creator"]?.[0]?.["_"] || "";
      const language = this.metadata["dc:language"]?.[0]?.["_"] || "";
      const dateStr = this.metadata["dc:date"]?.[0]?.["_"] || "";
      const bookDate = new Date(dateStr);
      const date = `${String(bookDate.getFullYear()).padStart(4, "0")}-${String(
        bookDate.getMonth() + 1
      ).padStart(2, "0")}-${String(bookDate.getDate()).padStart(2, "0")}`;
      const publisher = this.metadata["dc:publisher"]?.[0]?.["_"] || "佚名出版社";
      let identifier = "佚号"; // default is none
      this.metadata["dc:identifier"].forEach((each_id) => {
        if (
          each_id["opf:scheme"]?.[0] === "ASIN" ||
          each_id["opf:scheme"]?.[0] === "ISBN"
        ) {
          identifier = each_id?.["_"] + "(" + each_id["opf:scheme"]?.[0] + ")";
        }
      });
      this.bookMetadata = new BookMetadata(
        title,
        author,
        language,
        date,
        publisher,
        identifier
      );
    } catch (error) {
      console.log("Error parsing EPUB:", error);
      return null;
    }
  }
}
