import { graphql, GraphQLSchema } from "graphql";
import type { Route } from "wren/types.ts";
import * as Response from "wren/response.ts";

import type { GraphQLParams } from "./types.ts";
import { GraphiQL } from "./graphiql.ts";

export const performGraphQLOperation = async (
  schema: GraphQLSchema,
  params: GraphQLParams,
) => {
  const { query, mutation, variables: variableValues, operationName } = params;

  const result = await graphql({
    schema,
    source: (query || mutation)!,
    variableValues,
    operationName,
  });

  return result;
};

export const GraphQL = (
  pathname: string,
  schema: GraphQLSchema,
): Route => {
  return [pathname, {
    GET: () => Response.HTML(GraphiQL(pathname)),
    POST: async (request) => {
      const { params } = request;

      try {
        const result = await performGraphQLOperation(
          schema,
          params as unknown as GraphQLParams,
        );

        return Response.OK(result);
      } catch (error) {
        console.error(error);

        return Response.BadRequest();
      }
    },
  }];
};

export * from "./types.ts";
