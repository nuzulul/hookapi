# hookapi
hookapi

- DEV
-- npx wrangler d1 execute hookapi-d1 --local --file schema.sql
-- npx wrangler d1 execute hookapi-d1 --local --command "SELECT name FROM sqlite_schema WHERE type ='table'"

- PRODUCTION
-- npx wrangler d1 execute hookapi-d1 --file schema.sql
-- npx wrangler d1 execute hookapi-d1 --command "SELECT name FROM sqlite_schema WHERE type ='table'"
-- npx wrangler d1 execute hookapi-d1 --command "DROP TABLE IF EXISTS kv"
