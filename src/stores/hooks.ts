import { useDispatch as _useDispatch, useSelector as _useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

export const useDispatch = _useDispatch.withTypes<AppDispatch>()
export const useSelector = _useSelector.withTypes<RootState>()
