import Quill1Editor from "./Quill1Editor.tsx";
import Quill from 'quill'
import {useCallback, useRef} from "react";

function App() {
  // Use a ref to access the quill instance directly
  const quillRef = useRef<Quill>(null);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    // quill instance
    const quill = quillRef.current!;
    console.log(quill)

    // html
    const content = quill.getHTML();
    console.log(content)

    // delta
    const delta = JSON.stringify(quill.getContents().ops);
    console.log(delta);
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Quill1Editor ref={quillRef} />
        <button style={{marginTop: 10}} type="submit">Submit</button>
      </form>

    </div>
  )
}

export default App
