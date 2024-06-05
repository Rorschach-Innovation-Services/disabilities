import {
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyEventV2WithRequestContext,
  APIGatewayEventRequestContextV2,
} from 'aws-lambda';

export type APIGatewayEvent =
  APIGatewayProxyEventV2WithRequestContext<APIGatewayEventRequestContextV2>;

/**
 * Returns the request body as a string.
 * @param event The APIGatewayProxyEvent object.
 * @returns The request body string, or an empty string if the body is null.
 */
export function getRequestBody(
  event: APIGatewayEvent
): null | Record<string, any> {
  return event.body ? JSON.parse(event.body) : '';
}

/**
 * Returns the request path.
 * @param event The APIGatewayProxyEvent object.
 * @returns The request path string.
 */
export function getRequestPath(event: APIGatewayEvent): string {
  return event.rawPath;
}

/**
 * Returns the request headers.
 * @param event The APIGatewayProxyEvent object.
 * @returns An object containing the request headers with string values.
 */
export function getRequestHeaders(event: APIGatewayEvent): {
  [name: string]: string;
} {
  const headers: { [name: string]: string } = {};
  const eventHeaders: APIGatewayProxyEventHeaders = event.headers;

  for (const [key, value] of Object.entries(eventHeaders)) {
    headers[key] = value ? value : '';
  }

  return headers;
}

/**
 * Returns the request query string parameters.
 * @param event The APIGatewayProxyEvent object.
 * @returns An object containing the request query string parameters with string values, or null if there are no query string parameters.
 */
export function getQueryStringParameters(
  event: APIGatewayEvent
): { [name: string]: string } | null {
  const queryStringParams:
    | APIGatewayProxyEventQueryStringParameters
    | undefined = event.pathParameters;

  if (!queryStringParams) {
    return null;
  }

  const params: { [name: string]: string } = {};

  for (const [key, value] of Object.entries(queryStringParams)) {
    params[key] = value ? value : '';
  }

  return params;
}

type SendResponseParameters = {
  statusCode: number;
  body: Record<string, any> | string;
};

export const sendResponse = ({ statusCode, body }: SendResponseParameters) => {
  return { statusCode, body: typeof body === "string" ? JSON.stringify({ message: body }) : JSON.stringify(body) }
};
