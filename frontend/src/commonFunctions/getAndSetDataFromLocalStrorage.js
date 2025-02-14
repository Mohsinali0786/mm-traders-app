export function getDataFromLS(ref){
   return localStorage.getItem(ref)
}
export function setDataInLS(ref,obj){
    return localStorage.setItem(ref, JSON.stringify(obj))
}
