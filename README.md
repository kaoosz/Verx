
Clone the Repository
```
git clone https://github.com/kaoosz/Verx.git
```

Create a .env file in the root of the project with the following content:

```
DATABASE_URL="postgresql://user:admuser@localhost:5433/dbpostgre?schema=public"
```

Install All Dependencies
```
npm install
```

Run the Application
```
docker-compose up -d --build
```




## 📄 Produtor Endpoints  




Create Produtor Rural (POST)
`/produtor`
```
{
    "name":"gui",
    "document": "929.939.280-31",
}
```
Update a Produtor Rural (PATCH)
`/produtor/:id`
```
{
    "name":"gui update",
    "document": "129.132.230-28",
}
```
List All Produtor Rural (GET)
`/produtor`

Find Produtor Rural by ID (GET)
`/produtor/:id`

Delete a Produtor Rural (DELETE)
`/produtor/:id`


## 📄 Farm Endpoints

Create Farm (POST)
`/farm`
```
{
    "city": "São Paulo",
    "state": "SP",
    "area_total": 34,
    "area_arable": 12,
    "area_vegetation": 13,
    "name": "fazenda galo branco",
    "produtorRuralId": "fdd44b7e-d8dc-4d4e-906d-e0325d07eefa"
}
```
Or with Farm Cultures:
```
{
    "city": "São Paulo",
    "state": "SP",
    "area_total": 34,
    "area_arable": 12,
    "area_vegetation": 13,
    "name": "fazenda galo branco",
    "produtorRuralId": "8dc33455-1f94-4cf1-a445-d90a75cbcb84",
    "FarmCultures": [
        {
            "culture": "COFFEE"
        },
        {
            "culture": "CORN"
        }
    ]
}
```
Create Farm Culture Only (POST)
`/culture/:farmId`
```
{
    "culture": "COFFEE"
}
```
List All Farms (GET)
`/farm`

Find Farm by ID (GET)
`/farm/:id`

Delete a Farm (DELETE)
`/farm/:id`


## 📄 Dashboard Endpoints

List Farms in Count (GET)
`/dashboard/total-farms-count`

List Farms Total Area (GET)
`/dashboard/total-area`

List by State (GET)
`/dashboard/farms-by-state`

List by Cultures (GET)
`/dashboard/cultures`

List by Land Use (GET)
`/dashboard/land-use`




## 📄 Testing

Run tests inside Docker using the name of the container 'app':
```
docker-compose exec app npm test
```
