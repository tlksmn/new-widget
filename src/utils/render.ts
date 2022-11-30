export function appendChild(htmlElement: HTMLElement){
  document.body.appendChild(htmlElement)
  return;
}

export function appendChildAndClickToDeleteElement(div: HTMLElement){
  div.addEventListener("click", ()=> {
    document.body.removeChild(div)
  })
  appendChild(div);
  return;
}
