import WebFont from 'webfontloader'

export default () => {
  WebFont.load({
    google: {
      families: ['Poppins:300,400,500,600,700&display=swap']
    }
  })
}
