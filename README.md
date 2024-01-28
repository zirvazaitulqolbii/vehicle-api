## Vehicle API

### Development

Run `npm run dev` to start development server with auto reload. Make sure all required envs are set.


### Environment variables
- `SECRET` for jwt token signing, required
- `DATABASE_URL` database connection url, required. Example: `postgresql://postgres:password@localhost:5432/database?schema=public`
- `PORT` port for server to listen 

### Deployment
Set `NODE_ENV` to `production` to omit debug log, run `npm run start` to apply migration and start production server