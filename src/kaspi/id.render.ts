const zeroStar = `
    <svg width="22px" height="22px" viewBox="0 0 107 99" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M53.5,1.1134358 L69.4816613,32.9123521 L105.195158,38.0083228 L79.3533785,62.7439668 L85.4561872,97.6849531 L53.5,81.1873005 L21.5438128,97.6849531 L27.6466215,62.7439668 L1.80484249,38.0083228 L37.5183387,32.9123521 L53.5,1.1134358 Z" id="Star" stroke="#C8C8C8" fill="#FFFFFF"></path>
        </g>
    </svg>`.trim();

const halfStar = `
    <svg width="22px" height="22px" viewBox="0 0 109 103" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group" transform="translate(1.716363, 3.000000)" stroke="#C8C8C8">
                <polygon id="Path-2" fill="#FFF500" points="52.7836367 0 36.4725959 32.4542869 1.52384931e-15 37.6585738 26.3918183 62.9207131 20.1615552 98.5914262 52.7836367 81.75"></polygon>
                <polygon id="Path-3" fill="#FFFFFF" points="52.7836367 81.75 85.4057182 98.5914262 79.175455 62.9207131 105.567273 37.6585738 69.0946774 32.4542869 52.7836367 -2.81883145e-17"></polygon>
            </g>
        </g>
    </svg>`.trim();

const fullStar = `
    <svg width="22px" height="22px" viewBox="0 0 107 99" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M53.5,1.1134358 L69.4816613,32.9123521 L105.195158,38.0083228 L79.3533785,62.7439668 L85.4561872,97.6849531 L53.5,81.1873005 L21.5438128,97.6849531 L27.6466215,62.7439668 L1.80484249,38.0083228 L37.5183387,32.9123521 L53.5,1.1134358 Z" id="Star" stroke="#C8C8C8" fill="#FFF500"></path>
        </g>
    </svg>`.trim();

function generateStars(rating: number){
    return Array.from({length: 5}, (x, i) => i).map((e, index)=> {
        const ratingFloor = Math.floor(rating);
        if (ratingFloor > index){
          return fullStar;
        }
        if (rating - ratingFloor && ratingFloor + 1 > index){
          return halfStar;
        }
        return zeroStar;
    }).join('\n');
}

export interface ProductInfoAnalytic{
    fullName: string,
    city: string,
    ordersAmount: number,
    sellerCount: number,
    avgPrice: number,
    countAnalysis: number,
    index: number,
    rating: number,
    trend: number
}

export function ProductWidgetGen({fullName, city, ordersAmount, sellerCount, avgPrice, countAnalysis, index, rating, trend}: ProductInfoAnalytic){
    return `<div class="analytic-service-view">
    <div>
        <h3>Аналитика</h3>
    </div>
    <div class="group title">
        <div>${fullName}</div>
    </div>

    <div class="group row">
        <div class="property">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.25 0.25H14.75V4.25H19.75V18.75H0.25V4.25H5.25V0.25ZM6.75 4.25H13.25V1.75H6.75V4.25ZM1.75 9.93496V17.25H18.25V9.93496L10 11.7683L1.75 9.93496ZM18.25 8.39837V5.75H1.75V8.39837L10 10.2317L18.25 8.39837Z"
                    fill="black"/>
            </svg>
            <span>Выбранный город</span>
        </div>
        <div class="value">${city}</div>
    </div>

    <div class="group row">
        <div class="property">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0 0.25H3.54057L4.54057 3.25H20.2731L14.4543 13.75H7.375L5.43018 16.3431C5.50702 16.471 5.5715 16.6072 5.62197 16.75H14.378C14.6869 15.8761 15.5203 15.25 16.5 15.25C17.7426 15.25 18.75 16.2574 18.75 17.5C18.75 18.7426 17.7426 19.75 16.5 19.75C15.5203 19.75 14.6869 19.1239 14.378 18.25H5.62197C5.31309 19.1239 4.47966 19.75 3.5 19.75C2.25736 19.75 1.25 18.7426 1.25 17.5C1.25 16.2574 2.25736 15.25 3.5 15.25C3.77153 15.25 4.03182 15.2981 4.27282 15.3862L6.16422 12.8644L2.45943 1.75H0V0.25ZM7.54057 12.25H13.5707L17.7269 4.75H5.04057L7.54057 12.25ZM16.5 16.75C16.0858 16.75 15.75 17.0858 15.75 17.5C15.75 17.9142 16.0858 18.25 16.5 18.25C16.9142 18.25 17.25 17.9142 17.25 17.5C17.25 17.0858 16.9142 16.75 16.5 16.75ZM2.75 17.5C2.75 17.0858 3.08579 16.75 3.5 16.75C3.91421 16.75 4.25 17.0858 4.25 17.5C4.25 17.9142 3.91421 18.25 3.5 18.25C3.08579 18.25 2.75 17.9142 2.75 17.5Z"
                    fill="black"/>
            </svg>
            <span>Заказы</span>
        </div>
        <div class="value">${ordersAmount}</div>
    </div>

    <div class="group row">
        <div class="property">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 0.25C5.65279 0.25 3.75 2.15279 3.75 4.5C3.75 6.84721 5.65279 8.75 8 8.75C10.3472 8.75 12.25 6.84721 12.25 4.5C12.25 2.15279 10.3472 0.25 8 0.25ZM5.25 4.5C5.25 2.98122 6.48122 1.75 8 1.75C9.51878 1.75 10.75 2.98122 10.75 4.5C10.75 6.01878 9.51878 7.25 8 7.25C6.48122 7.25 5.25 6.01878 5.25 4.5Z"
                    fill="black"/>
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 10.75C3.71979 10.75 0.25 14.2198 0.25 18.5V19.75H15.75V18.5C15.75 14.2198 12.2802 10.75 8 10.75ZM8 12.25C11.3681 12.25 14.1139 14.9141 14.2451 18.25H1.75491C1.88613 14.9141 4.63195 12.25 8 12.25Z"
                    fill="black"/>
            </svg>
            <span>Продавцы</span>
        </div>
        <div class="value">${sellerCount}</div>
    </div>

    <div class="group row">
        <div class="property">
            <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.74999 2.25V0L5.24999 6.55671e-08V2.25H0.25V10.75H5.24999L5.24999 16.25H0.25V17.75H5.24999V20H6.74999V17.75H11.75V9.25H6.74999V3.75H11.75V2.25H6.74999ZM5.24999 3.75H1.75V9.25H5.24999L5.24999 3.75ZM6.74999 10.75V16.25H10.25V10.75H6.74999Z"
                    fill="black"/>
            </svg>
            <span>Средняя цена</span>
        </div>
        <div class="value">${avgPrice} ₸</div>
    </div>

    <div class="group row">
        <div class="property">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.250001 19.75L0.25 0.25L1.75 0.25L1.75 18.25H19.75V19.75H0.250001Z"
                    fill="black"/>
                <path d="M9.5078 6.44716L3.93933 12.0156L4.99999 13.0763L9.5078 8.56848L12.9602 12.0208L18.5286 6.45237L17.468 5.39171L12.9602 9.89951L9.5078 6.44716Z"
                    fill="black"/>
            </svg>
            <span>На основе</span>
        </div>
        <div class="value">${countAnalysis} записей</div>
    </div>

    <div class="group row">
        <div class="property">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.250001 19.75H19.75V18.25H17.75V4.25H12.25V18.25H9.75V9.25H4.25V18.25H1.75L1.75 0.25L0.25 0.25L0.250001 19.75ZM5.75 18.25H8.25V10.75H5.75V18.25ZM16.25 5.75V18.25H13.75V5.75H16.25Z"
                    fill="black"/>
            </svg>
            <span>Конкурентность:</span>
        </div>
        <div class="value">
            <span class=${index > 7 ? "dangerous-message" : index > 4 ? "default-message" : "good-message" }>
                ${index > 7 ? "высокая" : index > 4 ? "средняя" : "низкая" }
            </span>
        </div>
    </div>

    <br>
    <div class="group">
        <div class="property">
            <span>Рейтинг товара:</span>
        </div>
        <div class="value">
        ${generateStars(rating)}
        </div>
    </div>

     <div class="group action">
        <div class="property">
            <span class=${trend > 7 ? "good-message" : trend > 4 ? "default-message" : "dangerous-message" }>
                Товар ${trend > 7 ? "в тренде" : trend > 4 ? "в плато" : "не в тренде" }
            </span>
        </div>                <div class="space"></div>
        <div class="value"><button id="close-btn" class="button dng-button"> Скрыть </button></div>
     </div>

     <div class="group open-ctl">
        <div class="property"></div>
        <div class="space"></div>
        <div class="value">
            <button id="show-btn" class="button"> Показать </button>
        </div>
     </div>

</div>`.trim()
}

export function eventListenersInitialize(){
  const closeButton = document.querySelector<HTMLButtonElement>('#close-btn')
  const showBtn = document.querySelector<HTMLButtonElement>('#show-btn')
  const openCtlContainer = document.querySelector<HTMLDivElement>('.open-ctl');
  const groupInfo = document.querySelector<HTMLDivElement>('.analytic-service-view');

  closeButton!.addEventListener('click', ()=> {
    groupInfo!.style.background = 'rgba(255,255,255,0.65)';
    groupInfo!.style.color = 'rgba(47,45,45,0.65)';
    for (const groupInfoElement  of groupInfo!.children as HTMLCollectionOf<HTMLDivElement>) {
      if(!groupInfoElement.classList.contains('title') && !groupInfoElement.classList.contains('open-ctl')){
        groupInfoElement.style.display = 'none';
      }
    }
    openCtlContainer!.style.display = 'flex';
  })
  showBtn!.addEventListener('click', ()=> {
    for (const groupInfoElement of groupInfo!.children as HTMLCollectionOf<HTMLDivElement> ) {
      if(!groupInfoElement.classList.contains('title') && !groupInfoElement.classList.contains('open-ctl')){
        groupInfoElement.style.display = 'flex';
      }
    }
    openCtlContainer!.style.display = 'none';
    groupInfo!.style.background = 'rgb(255,255,255)';
    groupInfo!.style.color = 'rgba(12,12,12,0.9)';
  })
}
