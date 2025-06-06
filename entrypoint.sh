#!/bin/sh

echo "Waiting for database in ${DB_HOST}:${DB_PORT}..."

until nc -z $DB_HOST $DB_PORT; do
  echo "Waiting for PostgreSQL to start..."
  sleep 2
done

echo "Database available! Running migrations..."
npx prisma migrate dev --name init

echo "Starting application..."
npm run start:dev