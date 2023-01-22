import './App.sass'
import ResumePreview from './ResumePreview'
import { ContextProvider } from './context/ContextProvider'

function App() {
	return (
		<div className='App'>
			<ContextProvider>
				<ResumePreview />
			</ContextProvider>
		</div>
	)
}

export default App
