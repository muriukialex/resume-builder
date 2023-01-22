import './styles.sass'
// import { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useContextDetails } from '../../context/ContextProvider'
import type { ProfileDetails } from '../../global/types'
import { errorStyles } from '../../utils'
import { ToolTip } from '../../Icons'

const ProfileDetailsForm = () => {
	const { dispatch } = useContextDetails()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ profileInfo: ProfileDetails }>()
	const onSubmitForm: SubmitHandler<{ profileInfo: ProfileDetails }> = data => {
		const { profileInfo } = data
		dispatch({ type: 'ADD_PROFILE_DETAILS', payload: profileInfo })
	}
	return (
		<>
			<h1>Professional Summary</h1>
			<p>
				<ToolTip width='1rem' height='1rem' stroke='#84879A' fill='#84879A' />
				Summary of your work, professional or work experience
			</p>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div>
					<label htmlFor='profileInformation'>Professional Summary & Experience</label>
					<div className='profileTipInfo'>Share more about your professional experience here eg. </div>
					<textarea
						id='profileInformation'
						{...register('profileInfo', { required: true })}
						placeholder='Professional, friendly and prompt hotelier with good hands in key hotel operations. Strong multitasking, communication and interpersonal skills...'
					/>
					{errors.profileInfo?.type === 'required' && (
						<p style={errorStyles}>Please include your professional summary</p>
					)}
				</div>
				<div>
					<input type='submit' value='Continue 👉🏾' />
				</div>
			</form>
		</>
	)
}

export default ProfileDetailsForm
