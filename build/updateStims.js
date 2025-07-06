/* global process */
/**
 * Usage: npm run update-stims [stims-directory]
 */
import fs from 'fs-extra';
import path from 'path';

const manifestName = 'manifest.json';
const stimsSource = process.argv[2];
const cwd = process.cwd();
const stimsTarget = path.join(cwd, 'media', 'audio', 'stims');
const stimsSourceCsv = path.join(stimsSource, manifestName);
const stimsTargetCsv = path.join(stimsTarget, manifestName);
const manifestJsFile = path.join(cwd, 'src', '_manifestData.js');

const createManifestJsFile = () => {
    const jsonContents = fs.readFileSync(stimsSourceCsv).toString();
    const json = JSON.parse(jsonContents);
    fs.writeFileSync(manifestJsFile, `export default ${JSON.stringify(json)}`);
};

const copyStimsToMediaDir = () => {
    fs.removeSync(stimsTarget);
    fs.copySync(stimsSource, stimsTarget);
    fs.removeSync(stimsTargetCsv);
};

const main = () => {
    createManifestJsFile();
    copyStimsToMediaDir();
};

main();
