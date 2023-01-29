import { PaymentPostReqBody, PaymentPatchReqBody, PaymentEditionData } from "#backend/payment.types"

type State = {
  formState: PaymentPostReqBody | PaymentPatchReqBody | PaymentEditionData;
  clientName: string;
  clientNameDetails: string;
  saleDate: string;
  unpaidAmount: number;
  sectionHeight: number;
}

type Methods = {
  handleSubmit: () => Promise<void>;
  getPaymentData: () => Promise<void>;
}

type Refs = {
  formRef: HTMLFormElement;
  actionsRef: HTMLDivElement;
}

export {
  State,
  Methods,
  Refs,
}
