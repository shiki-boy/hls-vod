import './App.css'
import 'plyr/dist/plyr.css'

import VideoPlayer from './VideoPlayer'

function App() {
  return (
    <>
      <h1>HLS Video on Demand (deployed on AWS)</h1>

      <VideoPlayer />
    </>
  )
}

export default App
