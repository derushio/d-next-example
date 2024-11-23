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
	pnpm add -D @dotenvx/dotenvx @trivago/prettier-plugin-sort-imports @types/bcrypt @types/lodash @types/uuid eslint eslint-config-prettier npm-run-all prettier tsx
	
	echo 'DB_USER="postgres"' > .env.example.dev
	echo 'DB_PASSWORD="password"' >> .env.example.dev
	echo 'DB_NAME="app"' >> .env.example.dev
	echo 'DB_HOST="127.0.0.1"' >> .env.example.dev
	echo 'DB_PORT="5465"' >> .env.example.dev
	echo '' >> .env.example.dev
	echo 'DATABASE_URL="postgresql://$${DB_USER}:$${DB_PASSWORD}@$${DB_HOST}:$${DB_PORT}/$${DB_NAME}?schema=public"' >> .env.example.dev
	echo '' >> .env.example.dev
	echo 'TOKEN_SECRET="fa438848-fc87-43ca-a2f5-8810f7c4a856"' >> .env.example.dev
	echo 'TOKEN_MAX_AGE_MINUTES="60"' >> .env.example.dev
	echo 'TOKEN_UPDATE_AGE_MINUTES="2.5"' >> .env.example.dev

	cp .env.example.dev .env

	pnpm dotenvx run -- pnpm tsx ./src/tools/setupPackageJson.ts
