interface GraphQLOperationParams {
	variables?: Record<string, unknown>;
	operationName?: string;
}

interface GraphQLQueryParams extends GraphQLOperationParams {
	query: string;
	mutation?: never;
}

interface GraphQLMutationParams extends GraphQLOperationParams {
	mutation: string;
	query?: never;
}

export type GraphQLParams =
	| GraphQLQueryParams
	| GraphQLMutationParams;
