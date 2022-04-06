/************************************************************
 ******************** JSON API RESPONSE *********************
 ************************************************************/

// TODO WARNING: For temporary convenience we currently do not pass included types

export type JsonApiResponse<T> = Omit<JsonApiResponseInterface<T>, T extends Array<infer E> ? never : 'links' | 'meta'>;

interface JsonApiResponseInterface<T> {
  data: T extends Array<infer E> ? JsonApiData<E & JsonApiDataAttributes>[] : JsonApiData<T & JsonApiDataAttributes>;
  links: T extends Array<infer E> ? JsonApiLinks : never;
  meta: T extends Array<infer E> ? JsonApiMeta : never;
  included?: JsonApiData<JsonApiDataAttributes>[];
}

/************************************************************
 ******** JSON API MULTI ENTITY RESPONSE ATTRIBUTES *********
 ************************************************************/

export interface JsonApiMeta {
  totalPages: number;
  totalRecords: number;
  page: {
    number: number,
    size: number
  };
}

interface JsonApiLinks {
  self: string;
  prev: string;
  last: string;
  next: string;
  first: string;
}

/************************************************************
 ****************** API SUB COMMON PARTS ********************
 ************************************************************/

// ENTITY PART
export interface JsonApiData<T extends JsonApiDataAttributes> {
  type: string;
  id: string;
  attributes: T;
  relationships: {
    [attr: string]: JsonApiDataRelationship;
  };
}

// DEFAULT ATTRIBUTES API RESULT
interface JsonApiDataAttributes {
  _kind: string;

  [attr: string]: any;
}

// API RESULT RELATIONSHIP
interface JsonApiDataRelationship {
  links: {
    related: string;
  };
  data: {
    type: string;
    id: string;
  };
}
