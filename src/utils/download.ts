export function downLoad (canvas:any){
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'graph-image.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
