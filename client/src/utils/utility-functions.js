export function getReferenceHeight (ref) {
  const { tableRef, tbodyRef } = ref;
  const isFirefox = typeof InstallTrigger !== 'undefined';    
  const referenceHeight = window.innerHeight - tableRef.offsetTop - tbodyRef.offsetTop - 41 - (isFirefox ? 50 : 0); 
  // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  return referenceHeight;
}
