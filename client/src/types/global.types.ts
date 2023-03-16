type Empty = Record<string, never>;
type FormErrors = { [key: string]: string }
type Icon = 
  | 'menu'
  | 'search'
  | 'total-debt'
  | 'debtor'
  | 'plus'
  | 'phone'
  | 'total-value'
  | 'amount-paid'
  | 'debt'
  | 'new-payment'
  | 'new-sale'
  | 'new-client'
  | 'cross'
  | 'close'
  | 'edit'
  | 'thrash'
  | 'backlink';

export {
  Empty,
  FormErrors,
  Icon,
}
