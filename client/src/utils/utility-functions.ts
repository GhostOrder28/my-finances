function getReferenceHeight (ref: { tableRef: HTMLTableElement, tbodyRef: HTMLTableSectionElement }) {
  const { tableRef, tbodyRef } = ref;
  // const isFirefox = InstallTrigger !== 'undefined';    
  console.log('tbody ref', tbodyRef);
  console.log('window inner height', window.innerHeight);
  console.log('table offset top', tableRef.offsetTop);
  console.log('table body offset top', tbodyRef.offsetTop);
  const referenceHeight = window.innerHeight - tableRef.offsetTop - tbodyRef.offsetTop - 41/* - (isFirefox ? 50 : 0)*/; 
  // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  return referenceHeight;
}

function getReferenceHeight2 (ref: { tbodyRef: HTMLTableSectionElement }) {
  const { tbodyRef } = ref;
  console.log('refs', ref);
  // const isFirefox = InstallTrigger !== 'undefined';    
  console.log('tbody ref', tbodyRef);
  console.log('window inner height', window.innerHeight);
  console.log('table body offset top', tbodyRef.offsetTop);
  const referenceHeight = window.innerHeight - tbodyRef.offsetTop;
  // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  return referenceHeight;
}
export {
  getReferenceHeight,
  getReferenceHeight2,
}
