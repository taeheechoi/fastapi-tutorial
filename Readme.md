Tutorial from 
https://www.jeffastor.com/blog/pairing-a-postgresql-db-with-your-dockerized-fastapi-app

### Configuring a postgresql db with your dockerized fastapi app
- Configuring database tables and migrations with sql alchemy and alembic. Read this section again. 3 parts are required to use alembic (script.py.mako, env.py and migrations folder)

- Connect to db docker
```
docker exec -it container# bash
```

- Generating migration script on container, error when save file through VS code, VS ext: Save as Root is required
```
alembic revision -m "create_main_tables" 
alembic upgrade head
```

- Access to Postgres using docker-compose
```
docker-compose exec db psql -h localhost -U postgres --dbname=postgres
```
- Postgres commands
```
\l - list all db
\d+ - list all tables
\c postgres - connect to db
\d contacts - describe table
```


### References:
- https://stackoverflow.com/questions/68273745/how-to-make-a-mount-shared-in-docker
- https://stackoverflow.com/questions/56291492/how-to-save-a-file-in-vscode-remote-ssh-with-a-non-root-user-privileges
- https://stackoverflow.com/questions/43181654/locating-data-volumes-in-docker-desktop-windows