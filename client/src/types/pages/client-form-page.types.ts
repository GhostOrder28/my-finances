import { ClientEditableFields } from '../../types/entities/client.types';
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
  getClientData: () => void;
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
