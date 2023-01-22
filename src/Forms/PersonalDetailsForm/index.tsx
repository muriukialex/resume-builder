import './styles.sass'
import { useForm, SubmitHandler } from 'react-hook-form'
import type { PersonalDetails } from '../../global/types'
import { useContextDetails } from '../../context/ContextProvider'
import { capitalizeFirstCharacter, makeAllLowerCase, errorStyles } from '../../utils'

const PersonalDetailsForm = () => {
	const { dispatch } = useContextDetails()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PersonalDetails>()
	const onSubmitForm: SubmitHandler<PersonalDetails> = data => {
		const { firstName, middleName, surName, phoneNumber, email } = data
		let details = {
			firstName: capitalizeFirstCharacter(firstName),
			middleName: capitalizeFirstCharacter(middleName),
			surName: capitalizeFirstCharacter(surName),
			email: makeAllLowerCase(email),
			phoneNumber: phoneNumber,
		}
		dispatch({ type: 'ADD_PERSONAL_DETAILS', payload: details })
	}
	return (
		<>
			<h1>Personal Details</h1>
			<form onSubmit={handleSubmit(onSubmitForm)} className='form'>
				<div>
					<label htmlFor='firstName'>First Name</label>
					<input
						id='firstName'
						{...register('firstName', { required: true })}
						type='text'
						placeholder='Enter Your First Name'
					/>
					{errors.firstName?.type === 'required' && <p style={errorStyles}>Please include your first name</p>}
				</div>
				<div>
					<label htmlFor='middleName'>Middle Name</label>
					<input
						id='middleName'
						{...register('middleName', { required: true })}
						type='text'
						placeholder='Enter your middle name'
					/>
					{errors.middleName?.type === 'required' && <p style={errorStyles}>Please include your middle name</p>}
				</div>
				<div>
					<label htmlFor='surName'>Surname</label>
					<input
						id='surName'
						{...register('surName', { required: true })}
						type='text'
						placeholder='Enter your surname'
					/>
					{errors.surName?.type === 'required' && <p style={errorStyles}>Please include your surname</p>}
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input id='email' {...register('email', { required: true })} type='email' placeholder='Enter your email' />
					{errors.email?.type === 'required' && <p style={errorStyles}>Please include your email</p>}
				</div>
				<div>
					<label htmlFor='phoneNumber'>Phone number</label>
					<input
						id='phoneNumber'
						{...register('phoneNumber', { required: true })}
						type='text'
						placeholder='Enter your phone number eg. +254'
					/>
					{errors.phoneNumber?.type === 'required' && <p style={errorStyles}>Please include your phone number</p>}
				</div>
				<div>
					<input type='submit' value='Continue 👉🏾' />
				</div>
			</form>
		</>
	)
}

export default PersonalDetailsForm
