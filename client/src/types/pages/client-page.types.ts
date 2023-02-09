import { ClientResBody } from '#backend/client.types';

type Props = {
  clientname: string;
}

type State = {
  displayClientDeletionConfirmation: boolean;
  clientData: ClientResBody | undefined;
  tbodyHeight: number;
  isLoading: boolean;
}

type Methods = {
  getClientData: () => Promise<void>;
  declareClientDeletionIntent: () => void;
  deleteClient: () => Promise<void>;
}

type Computed = {
  tbody: () => number;
}

type Refs = {
  tableRef: HTMLTableElement;
  tbodyRef: HTMLTableSectionElement;
}

export {
  Props,
  State,
  Refs,
  Computed,
  Methods,
}
