export const isFullParams = (object) => {
  return (!!object.leverage && !!object.margin && !!object.entry && !!object.profitable)
}
