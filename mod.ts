import { graphql, GraphQLSchema } from 'graphql';
import type { HandlerMapping, Route } from 'wren';
import * as Response from 'wren/response.ts';

import type { GraphQLParams } from './types.ts';
import { GraphiQL } from './graphiql.ts';

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

export const GraphQLHandler = (schema: GraphQLSchema): HandlerMapping => {
	return {
		GET: ({ url }) => {
			const { pathname } = new URL(url);
			return Response.HTML(GraphiQL(pathname));
		},
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
	};
};

export const GraphQL = (pathname: string, schema: GraphQLSchema) => {
	return [pathname, GraphQLHandler(schema)] as Route;
};

export * from './types.ts';
export { GraphiQL }
