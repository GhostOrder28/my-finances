import { ClientListItem } from '#backend/client.types';

type State = {
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
