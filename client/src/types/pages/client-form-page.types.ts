import { ClientEditableFields } from '#backend/client.types';

type State = {
  sectionHeight: number;
  formState: ClientEditableFields;
  formErrors: Partial<ClientEditableFields> & {
    notFoundError?: string;
  };
}

type Methods = {
  handleSubmit: () => Promise<void>;
  getClientData: () => Promise<void>;
}

type Refs = {
  sectionRef: HTMLElement
}

export {
  State,
  Methods,
  Refs
}
