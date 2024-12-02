dev:
	docker compose -f docker/compose.yaml --env-file=".env" up -d pg

reset:
	docker compose -f docker/compose.yaml --env-file=".env" down
	sudo rm -rf docker/postgres/data

setup:
	pnpm add -D prisma
	# pnpm prisma init
	pnpm add @prisma/client
	pnpm add jose bcrypt flowbite-react parse-duration zod date-fns lodash p-queue uuid @paralleldrive/cuid2 typescript-eslint zod-form-data react-icons next-auth react-responsive usehooks-ts
	pnpm add -D @dotenvx/dotenvx @trivago/prettier-plugin-sort-imports @types/bcrypt @types/lodash @types/uuid eslint eslint-config-prettier npm-run-all prettier tsx @onozaty/prisma-db-comments-generator
	
	echo 'DB_USER="postgres"' > .env.example.dev
	echo 'DB_PASSWORD="password"' >> .env.example.dev
	echo 'DB_NAME="app"' >> .env.example.dev
	echo 'DB_HOST="127.0.0.1"' >> .env.example.dev
	echo 'DB_PORT="5465"' >> .env.example.dev
	echo '' >> .env.example.dev
	echo 'DATABASE_URL="postgresql://$${DB_USER}:$${DB_PASSWORD}@$${DB_HOST}:$${DB_PORT}/$${DB_NAME}?schema=public"' >> .env.example.dev
	echo '' >> .env.example.dev
	echo 'TOKEN_SALT_ROUNDS="10"' >> .env.example.dev
	echo "TOKEN_SECRET=\"`openssl rand -base64 32`\"" >> .env.example.dev
	echo 'TOKEN_MAX_AGE_MINUTES="60"' >> .env.example.dev
	echo 'TOKEN_UPDATE_AGE_MINUTES="2.5"' >> .env.example.dev

	cp .env.example.dev .env

	pnpm dotenvx run -- pnpm tsx ./src/tools/setupPackageJson.ts
	pnpm dotenvx run -- pnpm tsx ./src/tools/setupDockerCompose.ts

setup-electron: setup
	pnpm add fs-extra @prisma/migrate
	pnpm add -D electron electron-builder

	echo 'node-linker=hoisted' > .npmrc
	echo 'symlink=false' >> .npmrc

	echo 'DATABASE_URL="file:../db/db.db"' > .env.example.dev
	echo '' >> .env.example.dev
	echo 'TOKEN_SALT_ROUNDS="10"' >> .env.example.dev
	echo "TOKEN_SECRET=\"`openssl rand -base64 32`\"" >> .env.example.dev
	echo 'TOKEN_MAX_AGE_MINUTES="60"' >> .env.example.dev
	echo 'TOKEN_UPDATE_AGE_MINUTES="2.5"' >> .env.example.dev

	cp .env.example.dev .env

	cp ./prisma/schema.electron.prisma ./prisma/schema.prisma
	rm -rf ./prisma/migrations

	pnpm dotenvx run -- pnpm tsx ./src/tools/setupPackageJsonElectron.ts
