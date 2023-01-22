export interface PersonalDetails {
	firstName: string
	middleName: string
	surName: string
	email: string
	phoneNumber: string
}

export type ProfileDetails = string

export interface ProfessionalDetails {
	position: string
	company: string
	responsibilities: string | string[]
	startDate: string
	endDate: string
}

export type ProfessionalExperience = ProfessionalDetails[]

export interface EducationDetails {
	institution: string
	course: string
	startDate: string
	endDate: string
}

export type EducationDetailsInfo = EducationDetails[]

export type DetailsState = {
	view: viewType
	setView: setViewType
	personalDetails: PersonalDetails
	profileDetails: ProfileDetails
	professionalDetails: ProfessionalExperience
	educationDetails: EducationDetailsInfo
}

export type viewType = 'personalDetails' | 'profileDetails' | 'professionalDetails' | 'educationDetails' | 'review'
export type setViewType = React.Dispatch<React.SetStateAction<viewType>>
