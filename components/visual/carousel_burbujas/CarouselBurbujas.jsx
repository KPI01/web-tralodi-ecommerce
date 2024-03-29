import WrapperBurbujas from './WrapperBurbujas'

export default function CarouselBurbujas ({ context, state, callback }) {
  const handleMarcaAct = (id) => {
    callback(id)
  }

  return (
    <div id='carousel-burbujas' className='carousel slide' data-bs-touch='true'>
      <div className='carousel-inner py-2 p-lg-0'>
        {context.map(arr => {
          const activation = arr.filter(item => item.id === state)[0]
          return (
            <div key={context.indexOf(arr)} className={'carousel-item ' + (activation ? 'active' : '')}>
              <WrapperBurbujas contexto={arr} activa={state} callback={handleMarcaAct} />
            </div>
          )
        })}
      </div>
      <button className='carousel-control-prev p-0' type='button' data-bs-target='#carousel-burbujas' data-bs-slide='prev'>
        <i id='control-prev-icon' className='bi bi-arrow-left-short text-primary fs-1 d-flex' />
        <span className='visually-hidden'>Anterior</span>
      </button>
      <button className='carousel-control-next p-0' type='button' data-bs-target='#carousel-burbujas' data-bs-slide='next'>
        <i id='control-next-icon' className='bi bi-arrow-right-short text-primary fs-1 d-flex' />

        <span className='visually-hidden'>Siguiente</span>
      </button>
    </div>
  )
}
