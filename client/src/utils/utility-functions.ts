function getReferenceHeight (ref: { tableRef: HTMLTableElement }) {
  const { tableRef } = ref;
  const tHeadNode = tableRef.children['0'];
  const tParent = tableRef.parentElement;
  const tParentPaddingBottom = Number(window.getComputedStyle(tParent as HTMLElement).paddingBottom.slice(0, -2));
  // console.log('table ref', tableRef);
  // console.log('tbody ref', tbodyRef);
  // console.log('window inner height', window.innerHeight);
  // console.log('table offset top', tableRef.offsetTop);
  // console.log('tHead height', tHeadNode.clientHeight);
  // console.log('tParent padding bottom', tParentPaddingBottom);
  const referenceHeight = window.innerHeight - tableRef.offsetTop - tHeadNode.clientHeight - tParentPaddingBottom;
  // this last part is just for testing purposes in my desktop environment, for some reason on firefox when tbody display is set to block then offsettop alwaqys returns 0
  return referenceHeight;
}

export {
  getReferenceHeight,
}
