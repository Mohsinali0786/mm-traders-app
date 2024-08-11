export function MakeCapitalFirstLetter(text){
    const firstLetter = text.slice(0,1).toUpperCase()
    return firstLetter + text.slice(1)
}