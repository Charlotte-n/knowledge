function getWH(element: HTMLElement) {
  const width = element.getBoundingClientRect().width
  const height = element.getBoundingClientRect().height
  return {
    width,
    height
  }
}

export { getWH }
