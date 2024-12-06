import fs from "fs";
import JSZip from "jszip";
import { Parser } from "xml2js";
import { BookManifest, BookMetadata, BookSpine } from "./book/BookData.js";
import { getInnermostDirectory } from "./utils/commonUtils.js";

export class EpubParser {
  private filePath: string;

  // Raw data
  private _opfData: any | null = null;
  private _metadata: any | null = null;
  private _manifest: any | null = null;
  private _spine: any | null = null;

  // Class data extracted from raw data
  private _bookMetadata: BookMetadata | null = null;
  private _bookManifest: BookManifest | null = null;
  private _bookSpine: BookSpine | null = null;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  // Getters and setters
  get opfData(): any | null {
    return this._opfData;
  }
  set opfData(value: any | null) {
    this._opfData = value;
  }

  get metadata(): any | null {
    return this._metadata;
  }
  set metadata(value: any | null) {
    this._metadata = value;
  }

  get manifest(): any | null {
    return this._manifest;
  }
  set manifest(value: any | null) {
    this._manifest = value;
  }

  get spine(): any | null {
    return this._spine;
  }
  set spine(value: any | null) {
    this._spine = value;
  }

  get bookMetadata(): BookMetadata | null {
    return this._bookMetadata;
  }
  set bookMetadata(value: BookMetadata | null) {
    this._bookMetadata = value;
  }

  get bookManifest(): BookManifest | null {
    return this._bookManifest;
  }
  set bookManifest(value: BookManifest | null) {
    this._bookManifest = value;
  }

  get bookSpine(): BookSpine | null {
    return this._bookSpine;
  }
  set bookSpine(value: BookSpine | null) {
    this._bookSpine = value;
  }

  async parseBasic(): Promise<void | null> {
    const zip = new JSZip();
    try {
      // Read EPUB file
      const data = fs.readFileSync(this.filePath);
      // Load EPUB file
      const content = await zip.loadAsync(data);
      // Read container.xml
      const containerXml = await content
        .file("META-INF/container.xml")!
        .async("string");

      const parser = new Parser({
        explicitArray: true,
        mergeAttrs: true,
        explicitCharkey: true,
      });

      // Parse XML with xml2js
      const containerData: any = await parser.parseStringPromise(containerXml);
      const rootFilePath =
        containerData.container.rootfiles[0].rootfile[0]["full-path"][0];

      // Read OPF file
      const opfContent = await content.file(rootFilePath)!.async("string");
      // Parse OPF file
      this.opfData = await parser.parseStringPromise(opfContent);

      // Parse metadata
      this.metadata = this.opfData["package"]["metadata"][0];
      const title = this.metadata["dc:title"]?.[0]?.["_"] || "";
      const author = this.metadata["dc:creator"]?.[0]?.["_"] || "";
      const language = this.metadata["dc:language"]?.[0]?.["_"] || "";
      const dateStr = this.metadata["dc:date"]?.[0]?.["_"] || "";
      const bookDate = new Date(dateStr);
      const date = `${String(bookDate.getFullYear()).padStart(4, "0")}-${String(
        bookDate.getMonth() + 1
      ).padStart(2, "0")}-${String(bookDate.getDate()).padStart(2, "0")}`;
      const publisher =
        this.metadata["dc:publisher"]?.[0]?.["_"] || "佚名出版社";

      let identifier = "佚号"; // Default identifier
      this.metadata["dc:identifier"]?.forEach((each_id: any) => {
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

      // Parse manifest
      this.manifest = this.opfData["package"]["manifest"][0];
      const items: any[] = this.manifest["item"];
      this.bookManifest = new BookManifest();
      const idToHrefMap: Record<string, string> = {};
      items.forEach((item) => {
        idToHrefMap[item["id"][0]] = item["href"][0];
        this.bookManifest!.addItem(
          item["id"][0],
          item["href"][0],
          item["media-type"][0]
        );
      });

      // Parse spine
      this.spine = this.opfData["package"]["spine"][0];
      const tocType = this.spine["toc"][0];
      const itemrefs: any[] = this.spine["itemref"];
      this.bookSpine = new BookSpine(tocType);
      itemrefs.forEach((itemref) => {
        this.bookSpine!.addItem(idToHrefMap[itemref["idref"]]);
      });

      // TODO: Read all HTML files
      const rootDir = getInnermostDirectory(rootFilePath);
    } catch (error) {
      console.error("Error parsing EPUB:", error);
      return null;
    }
  }
}
