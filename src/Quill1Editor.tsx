import {forwardRef, useEffect, useRef} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const Inline = Quill.import('blots/inline')
const Block = Quill.import('blots/block')

// html
Quill.prototype.getHTML = function getHTML() {
  return this.root.innerHTML;
};

Quill.prototype.setHTML = function setHTML(html: string) {
  this.clipboard.dangerouslyPasteHTML(html)
};

// mark
class MarkBlot extends Inline {
}

MarkBlot.blotName = 'mark';
MarkBlot.tagName = 'mark';
Quill.register(MarkBlot);

// content-container
class ContentContainerBlot extends Block {
  static blotName = 'cc';
  static tagName = 'div';

  static create() {
    const node = super.create();
    node.style.setProperty('background-color', '#f4f4f4');
    node.style.setProperty('padding', '6px 12px');
    node.style.setProperty('margin-top', '10px');
    node.style.setProperty('border-radius', '6px');
    return node;
  }

}

Quill.register(ContentContainerBlot);

interface QuillEditorProps {
  initialValue?: string
}

const Quill1Editor = forwardRef<Quill, QuillEditorProps>(function Quill1Editor(props, ref) {
  const quillContainerRef = useRef<HTMLDivElement>(null);
  const quillRef = ref;

  useEffect(() => {
    const quillContainer = quillContainerRef.current;

    if (!quillContainer) {
      return;
    }

    const editorContainer = quillContainer.ownerDocument.createElement('div');
    editorContainer.className = 'editor-container';
    quillContainer.appendChild(editorContainer);

    const quill = new Quill(editorContainer, {
      modules: {
        toolbar: {
          container: '#toolbar',
        },
      },
      theme: 'snow',
    });

    // forwardRef的 7 宗罪之一, 类型判断失效
    // https://stackoverflow.com/questions/62238716/using-ref-current-in-react-forwardref
    quillRef!.current = quill;

    return () => {
      quillRef!.current = null;
      quillContainer.innerHTML = '';
    };
  }, [ref]);


  return (
    <div className="quill-container" style={{width: 430}} ref={quillContainerRef}>
      <div id="toolbar">
        <button className="ql-italic"></button>
        <button className="ql-bold"></button>
        <button className="ql-mark">
          <b>M</b>
        </button>
        <button className="ql-cc">
          <b>Cc</b>
        </button>
      </div>
    </div>
  )
});

export default Quill1Editor;


