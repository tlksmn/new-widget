import {sendMessageToRuntime, storageAsyncGet} from "../shared";
import {
  eventListenersInitialize,
  ProductInfoAnalytic,
  ProductWidgetGen
} from "./id.render";
import {NotFoundGen} from "./404.render";
import {appendChild, appendChildAndClickToDeleteElement} from "../utils/render";
import {NotAuthorizedGen} from "./403.render";

export enum StorageKey {
  active="activated",
  show = "showExtension",
  token = "JWT",
  refreshToken = "refreshJWT"
}

export async function main(){
  const [activatedObj, showObj, tokenObj, refreshTokenObj]: Record<string, string>[] =await Promise.all([
      storageAsyncGet(StorageKey.active),
      storageAsyncGet(StorageKey.show),
      storageAsyncGet(StorageKey.token),
      storageAsyncGet(StorageKey.refreshToken)
  ]);
  if(!showObj[StorageKey.show]) return;

  const div: HTMLDivElement = document.createElement('div');
  // if(!activatedObj[StorageKey.active] || !tokenObj[StorageKey.token] || !refreshTokenObj[StorageKey.refreshToken]){
  //     div.innerHTML = NotAuthorizedGen();
  //     appendChildAndClickToDeleteElement(div);
  //     return;
  // }

  const location =  window.location.toString();
  const url = new URL(location);
  const cityIndex = url.searchParams.get('c');
  const productPath = url.pathname.split('/').at(-2);
  const temp = productPath?.split('-');
  const productId = temp?.at(-1);
  const product = temp?.slice(0,temp?.length - 1).join(' ');
  const productFullName:string = document.getElementsByClassName('item__heading')[0]?.textContent!;
  const currentCityFullName:string = document.getElementsByClassName('current-location__city')[0]?.textContent!;
  const currentProductId:string = document.getElementsByClassName('item__sku')[0]?.textContent?.split(': ')[1]!;

  const requestOptions: RequestInit = {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "Cookies": tokenObj[StorageKey.token],
    },
    body: JSON.stringify({
      "filter": {
        "cityId": cityIndex,
        "productId": productId ?? currentProductId
      }
    }),
  };

  const response = await sendMessageToRuntime({
    type: "fetch",
    payload: {
      url: "https://demetra.systems/esb/api/log/get-product-widget",
      data: requestOptions}
  })

  if(response.statusCode === 401 && response.message === "NOT_FOUNT_ID"){
    div.innerHTML = NotFoundGen()
    appendChildAndClickToDeleteElement(div)
    return;
  }

  if(response.statusCode === 200){
    const productToRender:ProductInfoAnalytic = {
      fullName: productFullName||product||"product",
      city: currentCityFullName || cityIndex || "city",
      ordersAmount: 20,
      sellerCount: 25,
      avgPrice: 50000,
      countAnalysis: 600,
      index: 3,
      rating: 4,
      trend: 8
    }
    div.innerHTML = ProductWidgetGen(productToRender);
    appendChild(div)
    eventListenersInitialize()
  }

}
