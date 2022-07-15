export const html = (titulo, info, button) => {
    if(button){
        if (!button?.text || !button.text.length) {button.text = "Click here"}
        let a = `<a href="${button.link}"><button>${button.text}</button></a>`;
    if (!button?.link || !button.link.length) {a = "<p></p>"}
    return `<img style="background: black; display: block; width:400px; height: 152px;" src="https://i.postimg.cc/x8y022Hb/adoptame-logo-resplandor.png" alt="logo"><h1>${titulo}</h1><p>${info}</p>${a}`
}
return `<img style="background: black; display: block; width:400px; height: 152px;" src="https://i.postimg.cc/x8y022Hb/adoptame-logo-resplandor.png" alt="logo"><h1>${titulo}</h1><p>${info}</p>`
}