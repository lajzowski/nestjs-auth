
## Opis

<p>Moduł uwierzytelnienia oraz autoryzacji wraz z nakładaniem uprawnień dla poszczególnych modułów aplikacji
za pomocą prostego dekoratora <b>@useRule</b></p>

<p> Moduł został czytelnie napisany dlatego też świetnie nadaje się do dalszej modyfikacji i rozbudowy do Twojego projektu!</p>

## Jak To działa?

Dodajemy do kolumny "rule" w tabeli użytkowników "users" dany numerek np. 264
Oznacza to, że użytkownik będzie miał dostęp do 2, 6, 4
```ts
//Dostęp bedą mieli tylko użytkownicy którzy mają rule 2
 @UseRule(2) 
```

```ts
//Dostęp bedą mieli wszyscy zalogowani użytkownicy
 @UseRule() 
```

Poniżej przykład

```ts
@Controller('dashboard')  
export class DashboardController {  
  constructor(private readonly dashboardService: DashboardService) {}  
  
  @Get('/')  
  @UseRule()  
  showHello(  
  @UserObj() user: User,  
  ) {  
  return `${user.username} ${user.password} Jesteś zalogowany !`;  
  }  
  
  
  @Get('/adminPanel')  
  @UseRule(9)  
  adminPanel(  
  @UserObj() user: User,  
  ) {  
  return `${user.username} ${user.password} Jesteś zalogowany jako admin!`;  
  }  
  
}
```

## Wymagania
- Baza danych MySQL/MariaDB

## Wykorzystane technologie

- NestJS
- TypeORM (MySQL/MariaDB)
- TypeScript

## Konfiguracja
<p>Tworzymy plik <b>.env</b> i  wypełniamy danymi jak poniżej</p>

```
DB_HOST=localhost
DB_PORT=3306  
DB_USERNAME=databaseUsername 
DB_PASSWORD=yourPasswordToDatabase
DB_DATABASE=DatabaseName
secretKeyAuth=yourSecretKey 
DOMAIN=yourDomainName
DOMAIN_SLL=0
```

## Instalacja

```bash
$ npm i
```

## Uruchamianie aplikacji

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
