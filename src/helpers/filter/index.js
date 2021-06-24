export const isFullParams = (object) => {
  return (!!object.leverage && !!object.margin && !!object.opening && !!object.closing)
}
