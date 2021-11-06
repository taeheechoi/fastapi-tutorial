Tutorial from 
https://www.jeffastor.com/blog/pairing-a-postgresql-db-with-your-dockerized-fastapi-app

### Configuring a postgresql db with your dockerized fastapi app
- app/core/config.py - DATABASE_URL
- app/core/tasks.py - create_start_app_handler, create_stop_app_handler
- app/db/tasks.py -  connect_to_db, close_db_connection
- app/api/server.py - app.add_event_handler for "startup": create_start_app_handler, "shutdown": create_stop_app_handler

- Configuring database tables and migrations with sql alchemy and alembic. Read this section again. 3 parts are required to use alembic (script.py.mako, env.py and migrations folder)
    - app/db/migrations/script.py.mako - template for migration scripts
    - app/db/migrations/env.py - run_migrations_online, run_migrations_offline
    - app/db/migrations/versions - versions for migration
    - ./alembic.ini - script_location, version_locations


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
### Hooking fastapi endpoints up to a postgres database
- Pydantic - declare the 'shape' of the data as classes with attributes. each attribute has a type.

- dataclasses are just classes that contain primarily data.
```python
@dataclass
class InventoryItem:
    """Class for keeping track of an item in inventory."""
    name: str
    unit_price: float
    quantity_on_hand: int = 0
    def total_cost(self) -> float:
        return self.unit_price * self.quantity_on_hand

class Item:
    def __init__(self, *, name: str, unit_price: float, quantity_on_hand: int = 0) -> None: // *: kwargs
        self.name = name
        self.unit_price = unit_price
        self.quantity_on_hand = quantity_on_hand
    def total_cost(self) -> float:
        return self.unit_price * self.quantity_on_hand

```
- Pydantic's BaseModel: dataclasses + data validation + data type corecion
- app/models/core.py, cleaning.py
    - BaseModel 
        - CoreModel(BaseModel), IDModelMixin(BaseModel)
            - CleaningBase(CoreModel) : Optional type
                - CleaningCreate(CleaningBase)
                - CleaningUpdate(CleaningBase)
                - CleaningInDB(IDModelMixin, CleaningBase)
                - CleaningPublic(IDModelMixin, CleaningBase)

- Repositories: for business(application) logic
- app/db/repositories/base.py, cleanings.py
    - base.py: reference to database connection. BaseRepository 
    - cleanings.py
        - CleaningRepository(BaseRepository)
            - create_cleaning: CleaningCreate instance --> dictionary --> insert --> return CleaningInDB instance
            ```python
            new_cleaning = CleaningCreate(name="Clean My House", cleaning_type="full_clean", price="29.99")
            query_values = new_cleaning.dict()
            print(query_values)
            # {"name": "Clean My House", "cleaning_type": "full_clean", "price": 29.99, "description": None}
            cleaning = await self.db.fetch_one(query=CREATE_CLEANING_QUERY, values=query_values)
            print(cleaning)
            # {"name": "Clean My House", "cleaning_type": "full_clean", "price": 29.99, "description": None}
            result = CleaningInDB(**cleaning)
            print(result)
            # CleaningInDB(name="Clean My House", cleaning_type="full_clean", price="29.99")
            ```
- Dependencies: Read again
- app/api/dependencies/database.py: get_databse, get_repository
```python
@router.post("/", response_model=CleaningPublic, name="cleanings:create-cleaning", status_code=HTTP_201_CREATED)  
async def create_new_cleaning(
    new_cleaning: CleaningCreate = Body(..., embed=True),
    cleanings_repo: CleaningsRepository = Depends(get_repository(CleaningsRepository)),
) -> CleaningPublic:
    created_cleaning = await cleanings_repo.create_cleaning(new_cleaning=new_cleaning)

    return created_cleaning
```

- new_cleaning: CleaningCreate
    - Read the body of the request as JSON.
    - Convert the corresponding types.
    - Validate the data.
    - Respond with an error if validation fails, or provide the route with the model instance needed.


### References:
- https://stackoverflow.com/questions/68273745/how-to-make-a-mount-shared-in-docker
- https://stackoverflow.com/questions/56291492/how-to-save-a-file-in-vscode-remote-ssh-with-a-non-root-user-privileges
- https://stackoverflow.com/questions/43181654/locating-data-volumes-in-docker-desktop-windows