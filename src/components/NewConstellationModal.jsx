import { useId, useRef, useState } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import Icon from './Icon.jsx';

const TITLE_MAX = 60;
const PROMPT_MAX = 140;
const SEED_MAX = 280;

export default function NewConstellationModal({ isOpen, onClose, onSubmit }) {
  const containerRef = useRef(null);
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [error, setError] = useState('');
  const headingId = useId();
  const titleId = useId();
  const promptId = useId();
  const seedId = useId();
  useFocusTrap(containerRef, isOpen, onClose);
  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !seed.trim()) { setError('A name and a first thought are both needed.'); return; }
    const result = onSubmit(title.trim(), prompt.trim(), seed.trim());
    if (result?.ok === false) { setError(result.error ?? 'Something went wrong.'); return; }
    setTitle(''); setPrompt(''); setSeed(''); setError('');
  }

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby={headingId} tabIndex={-1} className="modal-card constellation-modal">
        <div className="modal-art-grid" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="modal-head">
          <div><span className="mini-label">CREATE A NEW SPACE</span><h2 id={headingId}>Start a new constellation</h2></div>
          <button type="button" onClick={onClose} className="icon-button focus-ring" aria-label="Close dialog"><Icon name="close" size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div><label htmlFor={titleId}>Name</label><input id={titleId} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={TITLE_MAX} placeholder="e.g. Things I Learned Too Late" /></div>
          <div><label htmlFor={promptId}>Invitation <span>(optional)</span></label><input id={promptId} value={prompt} onChange={(e) => setPrompt(e.target.value)} maxLength={PROMPT_MAX} placeholder="What are you inviting people to add?" /></div>
          <div><label htmlFor={seedId}>First thought</label><textarea id={seedId} value={seed} onChange={(e) => setSeed(e.target.value)} maxLength={SEED_MAX} rows={4} placeholder="Plant the first node. Someone else will choose what happens next." /><span className="char-count">{seed.length}/{SEED_MAX}</span></div>
          {error && <p className="field-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" onClick={onClose} className="secondary-button focus-ring">Cancel</button><button type="submit" className="primary-button focus-ring"><Icon name="spark" size={16} /> Set it drifting</button></div>
        </form>
      </div>
    </div>
  );
}
