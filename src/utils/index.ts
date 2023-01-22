export const capitalizeFirstCharacter = (character: string) => {
	return character.charAt(0).toUpperCase() + character.slice(1, character.length).toLocaleLowerCase()
}

export const makeAllLowerCase = (character: string) => {
	return character.toLocaleLowerCase()
}

export const getRelevantDateInfo = (date: Date): string => {
	let dateArr = date.toDateString().split(' ')
	return dateArr[1] + '-' + dateArr[2] + '-' + dateArr[3]
}

export const errorStyles = {
	color: '#e60c0c',
	fontFamily: 'Avenir',
	fontWeight: 'bold',
}
