export const getImageUrl = (currentPath) => {
    const newPath = currentPath.replace(/^\.\//, '')
    return newPath
}