import fs from 'fs';

async function main() {
  const packageJson = JSON.parse(
    (await fs.promises.readFile('./package.json')).toString(),
  );

  packageJson.scripts['dev'] =
    'pnpm run-p next:dev db:generate:watch db:studio';
  packageJson.scripts['format'] = 'pnpm prettier -w package.json src';
  packageJson.scripts['next:dev'] = 'next dev --turbopack';
  packageJson.scripts['next:build'] = 'next build';
  packageJson.scripts['next:start'] = 'next start';
  packageJson.scripts['next:lint'] = 'next lint';
  packageJson.scripts['db:generate'] = 'pnpm prisma generate --sql';
  packageJson.scripts['db:generate:watch'] =
    'pnpm prisma generate --sql --watch';
  packageJson.scripts['db:format'] = 'pnpm prisma format';
  packageJson.scripts['db:push'] = 'pnpm prisma db push';
  packageJson.scripts['db:migrate:dev'] = 'pnpm prisma migrate dev';
  packageJson.scripts['db:migrate:deploy'] = 'pnpm prisma migrate deploy';
  packageJson.scripts['db:studio'] = 'pnpm prisma studio';
  packageJson.scripts['hash:generate'] =
    'pnpm dotenvx run -- pnpm tsx ./src/tools/generateHash.ts';

  await fs.promises.writeFile(
    './package.json',
    JSON.stringify(packageJson, null, 2),
  );
}

void main();
