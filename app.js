const fs = require('node:fs/promises');
const path = require('path');

const foo = async () => {
    const basePath = path.join(process.cwd(), 'baseFolder');
    await fs.mkdir(basePath, { recursive: true });
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt'];
    const folderNames = ['folder1', 'folder2', 'folder3', 'folder4'];

    for (const file of fileNames) {
        await fs.writeFile(path.join(basePath, file), 'random text');
    }

    for (const folder of folderNames) {
        await fs.mkdir(path.join(basePath, folder), { recursive: true });
    }

    const files = await fs.readdir(basePath);
    for (const file of files) {
        const stat = await fs.stat(path.join(basePath,file))
        console.log(path.join(basePath,file),' : ', stat.isDirectory() ? 'folder': 'file')
    }
};
foo();
