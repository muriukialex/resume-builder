import { useContext, useReducer, useState, useEffect } from 'react'
import { ResumeContext } from '..'
import type { ContextProviderProps, ActionType } from '../types'
//import type { DetailsState } from '../../global/types'

const contextReducer = (state: any /*DetailsState*/, action: ActionType) => {
	switch (action.type) {
		case 'ADD_PERSONAL_DETAILS':
			return {
				...state,
				view: 'profileDetails',
				personalDetails: action.payload,
			}
		case 'ADD_PROFILE_DETAILS':
			return {
				...state,
				view: 'professionalDetails',
				profileDetails: action.payload,
			}
		case 'ADD_PROFESSIONAL_DETAILS':
			return {
				...state,
				view: 'educationDetails',
				professionalDetails: action.payload,
			}
		case 'ADD_EDUCATION_DETAILS':
			return {
				...state,
				view: 'review',
				educationDetails: action.payload,
			}
		default:
			throw new Error(`Error!, an unhandled action type!`)
	}
}

const ContextProvider = ({ children }: ContextProviderProps) => {
	const [view, setView] = useState('personalDetails')
	const [state, dispatch] = useReducer(contextReducer, { view: view, setView: setView })

	const value = { state, dispatch }
	return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

const useContextDetails = () => {
	const context = useContext(ResumeContext)
	if (context === undefined) {
		throw new Error('useContextDetails must be used within the ContextProvider')
	}
	return context
}

export { ContextProvider, useContextDetails }
