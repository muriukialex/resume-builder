import { FormEvent } from 'react'
import jsPDF from 'jspdf'
import './styles.sass'
import { useContextDetails } from '../context/ContextProvider'

import PersonalDetailsForm from '../Forms/PersonalDetailsForm'
import ProfileDetailsForm from '../Forms/ProfileDetailsForm'
import ProfessionalDetailsForm from '../Forms/ProfessionalDetailsForm'
import EducationForm from '../Forms/EducationForm'

const ResumePreview = () => {
	const { state } = useContextDetails()
	switch (state.view) {
		case 'personalDetails':
			return <PersonalDetailsForm />
		case 'profileDetails':
			return <ProfileDetailsForm />
		case 'professionalDetails':
			return <ProfessionalDetailsForm />
		case 'educationDetails':
			return <EducationForm />
		default:
			return <ReviewYourResume />
	}
}

const ReviewYourResume = () => {
	const { state } = useContextDetails()
	const { personalDetails, profileDetails, professionalDetails, educationDetails } = state

	const handleFormDownload = (e: FormEvent) => {
		e.preventDefault()
		const pdf = new jsPDF()

		// heading
		pdf.setLineHeightFactor(1.5)
		pdf.setFont('helvetica', 'bold')
		pdf.setFontSize(20)
		pdf.text('CURRICULUM VITAE', pdf.internal.pageSize.width / 3.0, 10)

		// personal details
		pdf.setFont('times', 'normal')
		pdf.setFontSize(14)
		pdf.text('Name: ' + `${personalDetails.firstName} ${personalDetails.middleName} ${personalDetails.surName}`, 10, 30)
		pdf.text('Email: ' + personalDetails.email, 10, 40)
		pdf.text('Phone: ' + personalDetails.phoneNumber, 10, 50)

		// professional summary
		pdf.setFontSize(16)
		pdf.setFont('helvetica', 'bold')
		pdf.text('PROFESSIONAL SUMMARY ', 10, 60)
		pdf.setFontSize(14)

		let YprofessionalDetail = 60
		professionalDetails.map((summary, i) => {
			YprofessionalDetail += 10
			if (i > 0) {
				YprofessionalDetail += 15
			}
			pdf.setFont('helvetica', 'bold')
			pdf.text(`${summary.position}`, 10, YprofessionalDetail)
			YprofessionalDetail += 10

			pdf.setFont('helvetica', 'bold')
			pdf.text('Company', 10, YprofessionalDetail)
			YprofessionalDetail += 10
			pdf.setFont('times', 'normal')
			pdf.text(`${summary.company}`, 10, YprofessionalDetail)
			YprofessionalDetail += 10

			pdf.setFont('italic', 'normal')
			pdf.text(`Dates: ${summary.startDate} to ${summary.endDate}`, 10, YprofessionalDetail)
			YprofessionalDetail += 10

			pdf.setFont('helvetica', 'bold')
			pdf.text('Responsibilities', 10, YprofessionalDetail)
			YprofessionalDetail += 10
			pdf.setFont('times', 'normal')
			pdf.text(`${summary.responsibilities}`, 10, YprofessionalDetail)
		})

		YprofessionalDetail += 10
		let y = YprofessionalDetail + professionalDetails.length * 10
		// education
		pdf.setFontSize(16)
		pdf.setFont('helvetica', 'bold')
		pdf.text('EDUCATION ', 10, y)

		pdf.setFontSize(14)
		pdf.setFont('times', 'normal')
		y += 10
		educationDetails.map((summary, i) => {
			if (i > 0) {
				y += 10
			}
			pdf.text(`${summary.course}, (${summary.startDate} to ${summary.endDate})`, 10, y)
			y += 10
			pdf.text(`${summary.institution}`, 10, y)
			y += 10
		})

		pdf.save('resume.pdf')
	}

	return (
		<>
			<h1>Review Your resume</h1>
			<div className='resume-body'>
				<div className='resume-body-personal-details'>
					<h3 style={{ color: '#000', marginBottom: '0rem' }}>
						{personalDetails.firstName} {personalDetails.middleName} {personalDetails.surName}
					</h3>
					<div>{personalDetails.email}</div>
					<div>{personalDetails.phoneNumber}</div>
				</div>
				<div className='resume-body-profile-details'>
					<h3 style={{ color: '#000' }}>Professional Summary</h3>
					<p style={{ color: '#000' }}>{profileDetails}</p>
				</div>
				<div className='resume-body-professional-details'>
					<h3 style={{ color: '#000', marginBottom: '0rem' }}>Work Experience</h3>
					{professionalDetails.map((professionalExperience, idx) => (
						<div key={idx}>
							<h4 style={{ marginTop: '0.5rem', color: '#000' }}>{professionalExperience.position}</h4>
							<div>
								From: {professionalExperience.startDate} To: {professionalExperience.endDate}
							</div>
							<div>{professionalExperience.company}</div>
							<div>{professionalExperience.responsibilities}</div>
						</div>
					))}
				</div>
				<div className='resume-body-educational-details'>
					<h3 style={{ color: '#000', marginBottom: '0rem' }}>Education</h3>
					{educationDetails.map((education, idx) => (
						<div key={idx}>
							<h4 style={{ marginTop: '0.5rem', color: '#000' }}>{education.course}</h4>
							<div>{education.institution}</div>
							<div>
								From: {education.startDate} To: {education.endDate}
							</div>
						</div>
					))}
				</div>
				<div>
					<form>
						<button type='submit' onClick={handleFormDownload}>
							Download CV
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default ResumePreview
