import { ClientListItem } from '#backend/client.types';

type State = {
  receivables: number;
  debtors: number;
  clientList: ClientListItem[];
  tbodyHeight: number;
}

type Methods = {
  getClients: () => Promise<void>;
}

type Refs = {
  tableRef: HTMLTableElement;
  tbodyRef: HTMLTableSectionElement;
}

export {
  State,
  Methods,
  Refs
}
