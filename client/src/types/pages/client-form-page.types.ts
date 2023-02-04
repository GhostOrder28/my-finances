import { ClientEditableFields } from '#backend/client.types';
import FormButtons from '@/components/form-buttons.vue'

type State = {
  formHeight: number;
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
  formRef: HTMLElement;
  actionsRef: typeof FormButtons;
}

export {
  State,
  Methods,
  Refs
}
