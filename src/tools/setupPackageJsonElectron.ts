import fs from 'fs';

async function main() {
  const packageJson = JSON.parse(
    (await fs.promises.readFile('./package.json')).toString(),
  );

  packageJson.main = './main.js';

  packageJson.scripts['build:linux'] = 'pnpm electron-builder --linux --dir';
  packageJson.scripts['build:win'] =
    'pnpm electron-builder --win --universal --dir';
  packageJson.scripts['package:linux'] =
    'pnpm run-s db:migrate:dev db:seed db:generate build build:linux';
  packageJson.scripts['package:win'] =
    'pnpm run-s db:migrate:dev db:seed db:generate build build:win';

  packageJson.build = {};
  packageJson.build['asar'] = false;
  packageJson.build['afterPack'] = './afterPack.js';

  await fs.promises.writeFile(
    './package.json',
    JSON.stringify(packageJson, null, 2),
  );
}

void main();
