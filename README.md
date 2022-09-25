# Graphism 

*Graphism* is a library for creating GraphQL servers in Deno & Deno Deploy.

- compatible with GraphQL.js 16.6.0
- out of the box GraphiQL
- support for GraphQL JIT

```tsx
import { serve } from 'wren';
import { GET } from 'wren/route.ts';
import * as Response from 'wren/response.ts';
import { GraphQL } from 'graphism';
import SchemaBuilder from 'pothos';

const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `Hello, ${name || 'World'}`,
    }),
  }),
});


const schema = builder.toSchema();

const routes = [
  GET('/', () => Response.OK('Graphism')),
  GraphQL("/graphql", schema)
];

serve(routes, { port: 3000 });
```


## Getting Started

### Generate a Wren project

```sh
deno run -A -r https://wren.deno.dev my-graphql-server
```

### Add Graphism & (optionally) Pothos

In `import_map.json` add `graphql`, `graphism` and `pothos` as dependencies:

```json
{
  "imports": {
    // ...
    "graphql": "https://esm.sh/graphql@16.6.0",
    "graphism": "https://deno.land/x/graphism@0.1.0/mod.ts",
    "pothos": "https://esm.sh/@pothos/core@3.21.0"
  }
}
```

### Build the GraphQL Schema

```tsx
const builder = new SchemaBuilder({});

builder.queryType({
  fields: (t) => ({
    hello: t.string({
      args: {
        name: t.arg.string(),
      },
      resolve: (_parent, { name }) => `Hello, ${name || 'World'}`,
    }),
  }),
});


const schema = builder.toSchema();
```

### Add the GraphQL route

```tsx
const routes = [
  GET('/', () => Response.OK('Graphism')),
  GraphQL("/graphql", schema)
];

serve(routes, { port: 3000 });
```

### Start the server

```
deno task start
```