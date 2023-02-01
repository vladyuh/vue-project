export const isOnlyLangChange = (newRoute, oldRoute) => {
    const newLang = newRoute.params.language || ''
    const oldLang = oldRoute.params.language || ''
    const remainNewString = newRoute.path.match(/^\//) ? getRemainString(newRoute.path, newLang) : ''
    const remainOldString = oldRoute.path.match(/^\//) ? getRemainString(oldRoute.path, oldLang) : ''

    return newLang !== oldLang && remainNewString === remainOldString
}

export const getRemainString = (url, lang)=> {
    const lowerCaseUrl = url.toLowerCase()
    const lowerCaseLang = lang.toLowerCase()
    const startPosition = lowerCaseUrl.indexOf(`/${lowerCaseLang}`)

    if (startPosition === -1) {
        return ''
    }

    const startIndex = startPosition + (lowerCaseLang.length + 1)
    let resultString = url.slice(startIndex)

    resultString = resultString.match(/^\//) ? resultString.slice(1) : resultString
    resultString = resultString.match(/\/$/) ? resultString.slice(0, -1) : resultString

    return resultString
}