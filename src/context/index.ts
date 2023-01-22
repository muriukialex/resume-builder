import { createContext } from 'react'
import type { DispatchType } from './types'
import type { DetailsState } from '../global/types'

export const ResumeContext = createContext<{ state: DetailsState; dispatch: DispatchType } | undefined>(undefined)
