import { ClientResBody } from '#backend/client.types';

type State = {
  clientData: ClientResBody | undefined;
  tbodyHeight: number;
}

type Methods = {
  getClientData: () => Promise<void>;
}

type Computed = {
  tbody: () => number;
}

type Refs = {
  tableRef: HTMLTableElement;
  tbodyRef: HTMLTableSectionElement;
}

export {
  State,
  Refs,
  Computed,
  Methods,
}
