import { PaymentPostReqBody, PaymentPatchReqBody, PaymentEditionData } from "../../types/entities/payment.types"
import FormButtons from '@/components/form-buttons.vue'
import { FormErrors } from "../global.types"

type State = {
  formState: PaymentPostReqBody | PaymentPatchReqBody | PaymentEditionData;
  clientName: string;
  clientNameDetails: string;
  saleDate: string;
  unpaidAmount: number;
  formHeight: number;
  formErrors?: FormErrors;
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
