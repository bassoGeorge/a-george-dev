declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.css' {
  const value: string
  export default value
}
declare module '*.css?url' {
  const value: string
  export default value
}
