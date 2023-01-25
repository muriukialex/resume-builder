import './styles.sass'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { EducationDetails, EducationDetailsInfo } from '../../global/types'
import { useContextDetails } from '../../context/ContextProvider'
import { getRelevantDateInfo } from '../../utils'
import { errorStyles } from '../../utils'
import { ToolTip, AddIconCircle } from '../../Icons'

const EducationForm = () => {
	const [userDetails, setUserDetails] = useState<EducationDetailsInfo | []>([])
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
	} = useForm<EducationDetails>()
	const onSubmitForm: SubmitHandler<EducationDetails> = data => {
		const { institution, course } = data
		const { startDate, endDate } = dates
		let details = {
			institution: institution,
			course: course,
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
		dispatch({ type: 'ADD_EDUCATION_DETAILS', payload: userDetails })
	}

	const EducationalDetailsForm = () => {
		return (
			<>
				<div>
					<label htmlFor='institution'>Institution</label>
					<input
						id='institution'
						{...register('institution', { required: true })}
						type='text'
						placeholder='eg. PC Kinyanjui Technical Training Institute'
					/>
					{errors.institution?.type === 'required' && (
						<p style={errorStyles}>Please include the institution you attended</p>
					)}
				</div>
				<div>
					<label htmlFor='course'>Course</label>
					<input
						id='course'
						{...register('course', { required: true })}
						type='text'
						placeholder='eg. Diploma In Catering & Accommodation Management'
					/>
					{errors.course?.type === 'required' && <p style={errorStyles}>Please include the course you pursued</p>}
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
			<h2>Educational Details</h2>
			<p>
				<ToolTip width='1rem' height='1rem' stroke='#84879A' fill='#84879A' />
				Give us more info about your educational
			</p>

			<a href='#form'>
				<button
					onClick={handleShowForm}
					disabled={isDetailsEmpty}
					style={{ background: isDetailsEmpty ? '#eee' : '#3B57F7' }}
				>
					<AddIconCircle width='2rem' height='2rem' stroke='#fff' fill='#fff' />
					{userDetails.length > 0 ? 'Add More Education' : 'Add Education'}
				</button>
			</a>
			<div>
				{userDetails.length >= 1 &&
					userDetails.map((userDetail, idx) => (
						<div key={idx}>
							<h2>{userDetail.institution}</h2>
							<div>{userDetail.course}</div>
							<p>
								Attended from: {userDetail.startDate} to: {userDetail.endDate}
							</p>
						</div>
					))}
			</div>
			<form onSubmit={handleSubmit(onSubmitForm)} id='form'>
				{isDetailsEmpty && <EducationalDetailsForm />}
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

export default EducationForm
