import type { PersonalDetails, ProfileDetails, ProfessionalDetails, EducationDetails } from '../global/types'

export type ActionType =
	| { type: 'ADD_PERSONAL_DETAILS', payload: any }
	| { type: 'ADD_PROFILE_DETAILS', payload: any  }
	| { type: 'ADD_PROFESSIONAL_DETAILS', payload: any  }
	| { type: 'ADD_EDUCATION_DETAILS', payload: any  }

export type DispatchType = (action: ActionType) => void

export type ContextProviderProps = { children: React.ReactNode }
