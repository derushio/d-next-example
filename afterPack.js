/**
 * electron-builder用afterPackスクリプト
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs-extra');

async function afterPack(context) {
  const { appOutDir } = context;
  const outDir = `${appOutDir}/resources/app.asar.unpacked`;

  // 必要なファイルを指定してコピー
  await fs.copy('node_modules', `${appOutDir}/node_modules`, {
    overwrite: false,
  });
  await fs.copy('src', `${appOutDir}/src`);
  await fs.copy('main.js', `${appOutDir}/main.js`);
  await fs.copy('public', `${appOutDir}/public`);
  await fs.copy('prisma', `${appOutDir}/prisma`);
  await fs.copy('.next', `${appOutDir}/.next`);

  await fs.copy('.env', `${appOutDir}/.env`);
  await fs.copy('next.config.ts', `${appOutDir}/next.config.ts`);
  await fs.copy('next-env.d.ts', `${appOutDir}/next-env.d.ts`);
  await fs.copy('postcss.config.mjs', `${appOutDir}/postcss.config.mjs`);
  await fs.copy('tailwind.config.ts', `${appOutDir}/tailwind.config.ts`);
  await fs.copy('tsconfig.json', `${appOutDir}/tsconfig.json`);
  await fs.copy('package.json', `${appOutDir}/package.json`);

  await fs.copy('node_modules', `${outDir}/node_modules`);
  await fs.remove(`${appOutDir}/node_modules/bcrypt`);
  await fs.copy(
    `${outDir}/node_modules/bcrypt`,
    `${appOutDir}/node_modules/bcrypt`,
  );
}

module.exports = afterPack;
