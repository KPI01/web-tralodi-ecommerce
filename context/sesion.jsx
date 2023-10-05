'use client'
import { createContext, useEffect, useReducer } from 'react'
import { monedas, usuario, productos } from './AppContext'

function sessionSet (key, value) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value)
  }
}

// Reducer
export const Reducer = (state, action) => {
  let updtCarrito = []
  let nuevoProd = ''

  switch (action.type) {
    case 'SET_MONEDA':
      state.monedaActiva = action.payload
      sessionSet('monedaActiva', JSON.stringify(state.monedaActiva))
      action.type = 'DONE'
      return { ...state }

    case 'ADD_TO_CARRITO':
      if (state.carrito.find((prdct) => prdct.id === action.payload.id)) {
        state.carrito.map((prdct) => {
          if (prdct.id === action.payload.id) {
            prdct.cant += action.payload.cant
          }
          console.log(prdct)
          updtCarrito.push(prdct)
          return true
        })
      } else {
        updtCarrito = state.carrito
        nuevoProd = productos.filter(
          (prdct) => prdct.id === action.payload.id
        )[0]
        nuevoProd.cant = action.payload.cant
        updtCarrito.push(nuevoProd)
      }
      action.type = 'DONE'
      sessionSet('carrito', JSON.stringify(updtCarrito))
      state.carrito = updtCarrito
      return { ...state }

    case 'RED_FROM_CARRITO':
      state.carrito.map((producto) => {
        if (producto.id === action.payload.id) {
          producto.cant -= action.payload.cant
        }
        updtCarrito.push(producto)
        return true
      })
      state.carrito = updtCarrito
      sessionStorage.setItem('carrito', JSON.stringify(state.carrito))
      action.type = 'DONE'
      return { ...state }

    case 'DEL_FROM_CARRITO':
      state.carrito.map((producto) => {
        if (producto.id === action.payload.id) {
          producto.cant = 0
        }
        updtCarrito.push(producto)
        return true
      })
      state.carrito = updtCarrito
      sessionSet('carrito', JSON.stringify(state.carrito))
      action.type = 'DONE'
      return { ...state }

    default:
      return state
  }
}

// Información básica para sesión
const sesion = {
  usuario,
  monedaActiva: monedas[0],
  divisas: monedas,
  carrito: [
    {
      id: 39100057,
      empresa: 2,
      marca: 'Alfonzo Rivas',
      descripcion: 'Cronch Flakes',
      presentacion: 'Bolsa',
      medida: '300 Gr',
      categoria: 'Cereales',
      cant: 1,
      precio: 1,
      estado: 'Activo',
      descuento: 0
    },
    {
      id: 39400123,
      empresa: 2,
      marca: 'Alfonzo Rivas',
      descripcion: 'Fruty Aros',
      presentacion: 'Bolsa',
      medida: '25 Gr',
      categoria: 'Cereales',
      cant: 1,
      precio: 1,
      estado: 'Activo',
      descuento: 30
    }
  ]
}

// Creación del contexto
export const Sesion = createContext()

// Componente que envuelve a todos los elementos
export const App = (props) => {
  const [state, dispatch] = useReducer(Reducer, sesion)

  useEffect(() => {
    const carritoStrg = sessionStorage.getItem('carrito')
    const mndActStrg = sessionStorage.getItem('monedaActiva')
    // Guardando en sesion el carrito si es que ya no existe
    if (carritoStrg) {
      state.carrito = JSON.parse(carritoStrg)
    } else {
      sessionStorage.setItem('carrito', JSON.stringify(state.carrito))
    }
    if (mndActStrg) {
      state.monedaActiva = JSON.parse(mndActStrg)
    } else {
      sessionStorage.setItem('monedaActiva', JSON.stringify(state.monedaActiva))
    }
  })

  // Guardando en sesion la moneda que se esta utilizando, si es que ya no existe

  // Calculando subtotal del carrito
  const subTotal = state.carrito.reduce((total, prdct) => {
    if (prdct.descuento > 0) {
      const descuento = prdct.precio * (prdct.descuento / 100)
      const precioProd = prdct.precio - descuento
      return (total += precioProd * prdct.cant)
    } else {
      return (total += prdct.precio * prdct.cant)
    }
  }, 0)

  // Calculando total del carrito
  const total = state.carrito.reduce((total, prdct) => {
    if (prdct.descuento > 0) {
      const descuento = prdct.precio * (prdct.descuento / 100)
      const precioProd = prdct.precio - descuento
      const iva = precioProd * prdct.cant * 0.16
      return (total += precioProd * prdct.cant + iva)
    } else {
      const iva = prdct.precio * prdct.cant * 0.16
      return (total += prdct.precio * prdct.cant + iva)
    }
  }, 0)

  return (
    <Sesion.Provider
      value={{
        usuario: state.usuario,
        monedaActiva: state.monedaActiva,
        divisas: state.divisas,
        carrito: state.carrito,
        subTotal,
        total,
        dispatch
      }}
    >
      {props.children}
    </Sesion.Provider>
  )
}
