import {useRef, useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css'

const Parchment = Quill.import('parchment');
const Delta = Quill.import('delta');
const Inline = Quill.import('blots/inline')

// mark
class MarkBlot extends Inline {
}

MarkBlot.blotName = 'mark';
MarkBlot.tagName = 'mark';
Quill.register(MarkBlot);

// content-container
class ContentContainerBlot extends Quill.import('blots/block') {
  static blotName = 'cc';
  static tagName = 'div';

  static create() {
    const node = super.create();
    node.style.setProperty('background-color', '#f4f4f4');
    node.style.setProperty('padding', '6px 12px');
    node.style.setProperty('border-radius', '4px');
    return node;
  }

}

Quill.register(ContentContainerBlot);

const CustomToolbar = () => (
  <div id="toolbar">
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-mark">
      <b>M</b>
    </button>
    <button className="ql-cc">
      <b>Cc</b>
    </button>
  </div>
);

function Editor() {
  const [value, setValue] = useState('');
  const reactQuillRef = useRef(null);

  const modules = {
    toolbar: {
      container: '#toolbar',
    }
  }


  const handleSubmit = () => {
    console.log(reactQuillRef.current)
    console.log(value)
  }

  return (
    <div className="text-editor">
      <CustomToolbar/>
      <ReactQuill ref={reactQuillRef}
                  theme="snow"
                  style={{height: 300}}
                  value={value}
                  onChange={setValue}
                  modules={modules}/>

      <button onClick={handleSubmit}>submit</button>
    </div>
  )
}

export default Editor
