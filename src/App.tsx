import {useState} from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
// @ts-ignore
class ContentContainerBlot extends Quill.import('blots/block') {
  static blotName = 'cc';
  static tagName = 'div';

  static create(initialValue) {
    console.log(initialValue);
    // Allow the parent create function to give us a DOM Node
    // The DOM Node will be based on the provided tagName and className.
    // E.G. the Node is currently <code class="ClickableSpan">{initialValue}</code>
    const node = super.create();
    node.style.setProperty('background-color', '#f4f4f4');
    node.style.setProperty('padding', '6px 12px');
    node.style.setProperty('border-radius', '4px');

    // Returning <code style="xxx">{initialValue}</code>
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

function App() {
  const [value, setValue] = useState('');
  const modules = {
    toolbar: {
      container: '#toolbar',
    }
  }
  return (
    <div className="text-editor">
      <CustomToolbar/>
      <ReactQuill style={{height: '100%'}} theme="snow" value={value} onChange={setValue} modules={modules}/>
    </div>
  )
}

export default App
