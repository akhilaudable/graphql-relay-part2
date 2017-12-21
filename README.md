# graphql-relay-part2

This is the continuation of [GraphQL-Relay-part1](https://github.com/akhilaudable/graphql-relay-part1). A GraphQL server implementing a tiny example schema, and a transpiler that you can use to get started building an app with Relay which is built for both query and mutation. 

#### Please import the file Bookstore.sql. 
``` $ mysql -u root -p Bookstore < path / to / graphql_relay_starter / Bookstore.sql```

## Installation

```
$  path / to / graphql-relay-part1 / npm install
```
## Running

Start a local server:

``` 
$  path / to / graphql-relay-part1 / npm start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `data/schema.js`, stop the server,
regenerate `data/schema.json`, and restart the server:

```
npm run update-schema
npm start
```

1. Open browser [localhost](http://localhost:3000/). Please mind the username and password for MySQL database of your local system.
2. Fill the Quantity field and check the ```Orders``` table of Bookstore database.  
