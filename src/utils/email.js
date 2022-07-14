export const html = (titulo, info, button) => {
    return `<img style="background: black; display: block; width:400px" src="https://i.postimg.cc/x8y022Hb/adoptame-logo-resplandor.png" alt="logo"><h1>${titulo}</h1><p>${info}</p><a href="${button.link}"><button>${button.text}</button></a>`
}