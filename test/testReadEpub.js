import { parseEpub } from "../src/readEpub.js";

(async () => {
  const epubFilePath = '/home/sonnycalcr/HDisk/Books/Test/沉默的大多数.epub';
  const opfData = await parseEpub(epubFilePath);
  const metadata = opfData['package']['metadata'][0];
  const title = metadata['dc:title'][0];
  const author = metadata['dc:creator'][0]._;
  const publisher = metadata['dc:publisher'][0]
  console.log('书名:', title);
  console.log('作者:', author);
  console.log('出版社:', publisher);
})();
