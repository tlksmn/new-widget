export function storageAsyncSet (data: Record<string, string>) : Promise<void | never> {
  return new Promise((resolve, reject) =>
    chrome.storage.local.set(data, () =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve()
    )
  )
}

export function storageAsyncGet(key: string): Promise<Record<string, string>| never> {
  return new Promise<Record<string, string> | never>((resolve, reject) =>
    chrome.storage.local.get(key, result =>
      chrome.runtime.lastError
        ? reject(Error(chrome.runtime.lastError.message))
        : resolve(result)
    )
  )
}

export function parseJwt (token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

interface MessageSentI{
  type: string,
  payload: Record<string, string| RequestInit>
}

export function sendMessageToRuntime(props: MessageSentI): Promise<Record<string, any>>{
  return new Promise((resolve, reject)=> {
    if (chrome.runtime.lastError) {
      reject(Error(chrome.runtime.lastError.message))
    }
    chrome.runtime.sendMessage(props, (response)=> {
      resolve(response);
    })
  })
}

function wait(seconds: number): Promise<void>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chrome.runtime.lastError) {
        reject(Error(chrome.runtime.lastError.message))
      }
      resolve();
    },seconds *1000)
  })
}
