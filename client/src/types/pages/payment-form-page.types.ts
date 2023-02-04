import { PaymentPostReqBody, PaymentPatchReqBody, PaymentEditionData } from "#backend/payment.types"
import FormButtons from '@/components/form-buttons.vue'

type State = {
  formState: PaymentPostReqBody | PaymentPatchReqBody | PaymentEditionData;
  clientName: string;
  clientNameDetails: string;
  saleDate: string;
  unpaidAmount: number;
  formHeight: number;
}

type Methods = {
  handleSubmit: () => Promise<void>;
  getPaymentData: () => Promise<void>;
}

type Refs = {
  formRef: HTMLFormElement;
  actionsRef: typeof FormButtons;
}

export {
  State,
  Methods,
  Refs,
}
