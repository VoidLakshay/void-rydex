"use client"
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
/**
 * Wrapper component to provide the Redux store to the application.
 */
function ReduxProvider({children}:{children:ReactNode}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default ReduxProvider
