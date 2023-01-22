import './App.sass'
import NavBar from './ui-common/NavBar'
import ResumePreview from './ResumePreview'
import { ContextProvider } from './context/ContextProvider'

function App() {
	return (
		<div className='App'>
			<NavBar />
			<ContextProvider>
				<ResumePreview />
			</ContextProvider>
		</div>
	)
}

export default App
