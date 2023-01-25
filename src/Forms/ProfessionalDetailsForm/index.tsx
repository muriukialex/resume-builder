import './styles.sass'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { ProfessionalDetails, ProfessionalExperience } from '../../global/types'
import { useContextDetails } from '../../context/ContextProvider'
import { getRelevantDateInfo } from '../../utils'
import { errorStyles } from '../../utils'
import { ToolTip, AddIconCircle } from '../../Icons'

const ProfessionalDetailsForm = () => {
	const [userDetails, setUserDetails] = useState<ProfessionalExperience | []>([])
	const [dates, setDates] = useState({
		startDate: new Date(),
		endDate: new Date(),
	})

	const { dispatch } = useContextDetails()
	const [isDetailsEmpty, setIsDetailsEmpty] = useState(true)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProfessionalDetails>()
	const onSubmitForm: SubmitHandler<ProfessionalDetails> = data => {
		const { position, company, responsibilities } = data
		const { startDate, endDate } = dates
		let details = {
			position: position,
			company: company,
			responsibilities: responsibilities,
			startDate: getRelevantDateInfo(startDate),
			endDate: getRelevantDateInfo(endDate),
		}
		setUserDetails([...userDetails, details])
		setIsDetailsEmpty(false)
		reset()
	}
	const handleShowForm = () => {
		setIsDetailsEmpty(true)
	}
	const handleMoveToReviewResumeReview = () => {
		dispatch({ type: 'ADD_PROFESSIONAL_DETAILS', payload: userDetails })
	}

	const ProfessionalExperienceForm = () => {
		return (
			<>
				<div>
					<label htmlFor='position'>Position</label>
					<input id='position' {...register('position', { required: true })} type='text' placeholder='eg. Hotelier' />
					{errors.position?.type === 'required' && <p style={errorStyles}>Please include the position you hold/held</p>}
				</div>
				<div>
					<label htmlFor='company'>Company / Institution</label>
					<input
						id='company'
						{...register('company', { required: true })}
						type='text'
						placeholder='eg. Enashipai Resort & Spa'
					/>
					{errors.company?.type === 'required' && (
						<p style={errorStyles}>Please include the company/organization name</p>
					)}
				</div>
				<div>
					<label htmlFor='responsibilites'>Responsibilities</label>
					<textarea
						id='responsibilites'
						{...register('responsibilities', { required: true })}
						placeholder='eg. &#10; 1. Ensured all tables were attended duly and promptly per customer requests. &#10; 2. Ensured guests get an exquisite experience from check in to check out'
					/>
					{errors.position?.type === 'required' && (
						<p style={errorStyles}>Please include some of the responsibilities you held/hold</p>
					)}
				</div>
				<div>
					<label htmlFor='startDate'>From</label>
					<DatePicker
						id='startDate'
						selected={dates.startDate}
						onChange={(date: Date) => setDates({ ...dates, startDate: date })}
					/>
					<label htmlFor='endDate'>To</label>
					<DatePicker
						id='endDate'
						selected={dates.endDate}
						onChange={(date: Date) => setDates({ ...dates, endDate: date })}
					/>
				</div>
				<div>
					<input style={{ marginTop: '0rem' }} type='submit' value='Add ✅' />
				</div>
			</>
		)
	}

	return (
		<>
			<h2>Work or Volunteer Experience</h2>
			<p>
				<ToolTip width='1rem' height='1rem' stroke='#84879A' fill='#84879A' />
				Give us more info about your work experience
			</p>

			<a href='#form'>
				<button
					onClick={handleShowForm}
					disabled={isDetailsEmpty}
					style={{ background: isDetailsEmpty ? '#eee' : '#3B57F7' }}
				>
					<AddIconCircle width='2rem' height='2rem' stroke='#fff' fill='#fff' />
					{userDetails.length > 0 ? 'Add More Experience' : 'Add Expeience'}
				</button>
			</a>
			<div>
				{userDetails.length >= 1 &&
					userDetails.map((userDetail, idx) => (
						<div key={idx}>
							<h2>{userDetail.position}</h2>
							<div>{userDetail.company}</div>
							<p>{userDetail.responsibilities}</p>
							<p>
								Worked from: {userDetail.startDate} to: {userDetail.endDate}
							</p>
						</div>
					))}
			</div>
			<form onSubmit={handleSubmit(onSubmitForm)} id='form'>
				{isDetailsEmpty && <ProfessionalExperienceForm />}
			</form>
			<button
				onClick={handleMoveToReviewResumeReview}
				style={{ background: isDetailsEmpty ? '#eee' : '#3B57F7' }}
				disabled={userDetails.length === 0}
			>
				All Done, Let's Continue 👉🏾
			</button>
		</>
	)
}

export default ProfessionalDetailsForm
