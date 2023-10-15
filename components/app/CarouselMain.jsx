import Carousel from '../visual/Carousel'
import getData from '../../app/libs/getDir'

export default async function CarouselMain () {
  const imgs = []
  const dir = 'main_carousel'
  const data = await (await getData(dir))
  console.log('CarouselMain: ', data, typeof data)

  // Guardar nombres de imágenes en array
  data.map(item => {
    imgs.push(item.name)
    return true
  })

  return (
    <Carousel nombre='principal' contexto={imgs} dir={dir} />
  )
}
