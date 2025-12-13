export function getSrcFromImageFile(file) {
    const img = new Image();
    const url = URL.createObjectURL(file);
    return {image : img, url : url};
}

