type ValidatedType<T> = {
  [Prop in keyof T]: Exclude<T[Prop], undefined>
}
type ValidateCond<T, P> = P extends 'validated' ? { [Prop in keyof T]: Exclude<T[Prop], undefined> } : T

export {
  ValidatedType,
}
