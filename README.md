
clone repository
```
git clone https://github.com/kaoosz/Verx.git
```

create .env in the root of project
```
DATABASE_URL="postgresql://user:admuser@localhost:5433/dbpostgre?schema=public"
```

install all dependencys
```
npm install
```

now its time just run
```
docker-compose up -d --build
```




## 📄 Produtor Endpoints  




create produtor rural POST
`/produtor`
```
{
    "name":"gui",
    "document": "929.939.280-31",
}
```
update a produtor rural PATCH
`/produtor/:id`
```
{
    "name":"gui update",
    "document": "129.132.230-28",
}
```
list all produtor rural GET
`/produtor`

find produtor rural by id GET
`/produtor/:id`

delete a produtor rural DELETE
`/produtor/:id`


## 📄 Farm Endpoints

create farm POST
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
create farm culture only POST
`/culture/:farmId`
```
{
    "culture": "COFFEE"
}
```
list all farms GET
`/farm`

find farm GET
`/farm/:id`

delete a farm DELETE
`/farm/:id`


## 📄 Dashboard Endpoints

list farms in count GET
`/dashboard/total-farms-count`

list farms total area GET
`/dashboard/total-area`

list by state GET
`/dashboard/farms-by-state`

list by cultures GET
`/dashboard/cultures`

list by land use GET
`/dashboard/land-use`




## 📄 Test

run tests inside docker using name of container app
```
docker-compose exec app npm test
```
