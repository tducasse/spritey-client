import { useState } from "react"
import Upload from "./Upload"

const App = () => {
  const [tag, setTag] = useState('')

  return <div>
    <label htmlFor='tag'>Enter a tag here</label>
    <input name='tag' onChange={e => setTag(e.target.value)} value={tag} />
    <Upload tag={tag}></Upload>
  </div>
}

export default App;
