import { useId, useRef, useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import Icon from './Icon.jsx';

const MAX_LEN = 280;

export default function ComposeModal({ isOpen, onClose, onSubmit, linkedNode }) {
  const containerRef = useRef(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const titleId = useId();
  const textareaId = useId();
  useFocusTrap(containerRef, isOpen, onClose);
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) { setError('Say something first — even a fragment counts.'); return; }
    const result = onSubmit(trimmed);
    if (result?.ok === false) { setError(result.error ?? 'Something went wrong.'); return; }
    setText(''); setError('');
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1} className="modal-card">
        <div className="modal-orbit-art" aria-hidden="true"><Icon name="spark" size={21} /></div>
        <div className="modal-head">
          <div><span className="mini-label">ADD TO THE SKY</span><h2 id={titleId}>Grow a thought</h2></div>
          <button type="button" onClick={onClose} className="icon-button focus-ring" aria-label="Close dialog"><Icon name="close" size={18} /></button>
        </div>
        {linkedNode && <div className="linked-thought"><span><Icon name="branch" size={14} /> Growing from</span><em>“{linkedNode.text.slice(0, 105)}{linkedNode.text.length > 105 ? '…' : ''}”</em></div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor={textareaId}>Your thought</label>
          <textarea id={textareaId} value={text} onChange={(e) => { setText(e.target.value); if (error) setError(''); }} maxLength={MAX_LEN} rows={5} placeholder="Add a perspective, a contradiction, a memory, or a question…" aria-describedby={`${textareaId}-meta`} aria-invalid={Boolean(error)} />
          <div id={`${textareaId}-meta`} className="field-meta">{error ? <span className="field-error" role="alert">{error}</span> : <span>Thoughts can be unfinished.</span>}<strong>{text.length}/{MAX_LEN}</strong></div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="secondary-button focus-ring">Keep exploring</button>
            <button type="submit" aria-label="Add to constellation" className="primary-button focus-ring"><Icon name="branch" size={16} /> Add branch</button>
          </div>
        </form>
      </div>
    </div>
  );
}
