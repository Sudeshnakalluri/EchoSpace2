import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { users as seedUsers, seedConstellations, CURRENT_USER_ID } from '../data/mockData.js';
import { sanitizeText, sanitizeTitle, isValidId } from '../utils/sanitize.js';
import { computeResonance } from '../utils/resonance.js';

const STORAGE_KEY = 'echospace:v1';
const AppContext = createContext(null);

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.constellations)) {
        return parsed;
      }
    }
  } catch {
    // Corrupt or inaccessible storage — fall back to seed data silently.
  }
  return { constellations: seedConstellations, users: seedUsers };
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_NODE': {
      const { constellationId, text, authorId, connections } = action.payload;
      return {
        ...state,
        constellations: state.constellations.map((c) => {
          if (c.id !== constellationId) return c;
          const newNode = {
            id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            authorId,
            text,
            connections: connections.filter((id) => c.nodes.some((n) => n.id === id)),
            createdAt: Date.now(),
          };
          return { ...c, nodes: [...c.nodes, newNode] };
        }),
      };
    }
    case 'ADD_CONSTELLATION': {
      const { title, prompt, authorId, seedText } = action.payload;
      const constellationId = `c_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const firstNode = {
        id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        authorId,
        text: seedText,
        connections: [],
        createdAt: Date.now(),
      };
      const newConstellation = {
        id: constellationId,
        title,
        prompt,
        createdAt: Date.now(),
        nodes: [firstNode],
      };
      return { ...state, constellations: [newConstellation, ...state.constellations] };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);
  const [drifting, setDrifting] = useState([]); // ambient co-presence, per constellation

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be full or disabled (private browsing) — the app still
      // functions in-memory for the session.
    }
  }, [state]);

  const currentUser = useMemo(
    () => state.users.find((u) => u.id === CURRENT_USER_ID) ?? state.users[0],
    [state.users]
  );

  const getUser = useCallback((id) => state.users.find((u) => u.id === id), [state.users]);

  const getConstellation = useCallback(
    (id) => state.constellations.find((c) => c.id === id),
    [state.constellations]
  );

  const addNode = useCallback((constellationId, rawText, connections = []) => {
    if (!isValidId(constellationId)) return { ok: false, error: 'Invalid constellation.' };
    const text = sanitizeText(rawText, 280);
    if (!text) return { ok: false, error: 'A thought needs at least a few words.' };
    dispatch({
      type: 'ADD_NODE',
      payload: { constellationId, text, authorId: CURRENT_USER_ID, connections },
    });
    return { ok: true };
  }, []);

  const addConstellation = useCallback((rawTitle, rawPrompt, rawSeedText) => {
    const title = sanitizeTitle(rawTitle, 60);
    const prompt = sanitizeText(rawPrompt, 140);
    const seedText = sanitizeText(rawSeedText, 280);
    if (!title || !seedText) {
      return { ok: false, error: 'Give the constellation a name and a first thought.' };
    }
    dispatch({ type: 'ADD_CONSTELLATION', payload: { title, prompt, authorId: CURRENT_USER_ID, seedText } });
    return { ok: true };
  }, []);

  // Ambient presence simulation: a gentle, low-frequency signal that other
  // people are currently "drifting" through a constellation. Not a metric,
  // not a counter to optimize — just a quiet sense of co-presence.
  const activeConstellationRef = useRef(null);
  const setActiveConstellation = useCallback((id) => {
    activeConstellationRef.current = id;
    if (!id) {
      setDrifting([]);
      return;
    }
    const others = seedUsers.filter((u) => u.id !== CURRENT_USER_ID);
    const pick = () => {
      const count = 1 + Math.floor(Math.random() * 3);
      const shuffled = [...others].sort(() => Math.random() - 0.5);
      setDrifting(shuffled.slice(0, count));
    };
    pick();
    const interval = setInterval(pick, 9000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cleanup;
    const id = activeConstellationRef.current;
    if (id) cleanup = setActiveConstellation(id);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resonance: how much shared creative history exists between "you" and
  // everyone else — computed from shared constellations and direct thread
  // connections, never from follows or likes (there are none).
  const resonance = useMemo(
    () => computeResonance(state.constellations, state.users, CURRENT_USER_ID),
    [state.constellations, state.users]
  );

  const myTrail = useMemo(() => {
    const items = [];
    for (const c of state.constellations) {
      for (const node of c.nodes) {
        if (node.authorId === CURRENT_USER_ID) {
          items.push({ ...node, constellationId: c.id, constellationTitle: c.title });
        }
      }
    }
    items.sort((a, b) => b.createdAt - a.createdAt);
    return items;
  }, [state.constellations]);

  const value = {
    constellations: state.constellations,
    users: state.users,
    currentUser,
    getUser,
    getConstellation,
    addNode,
    addConstellation,
    drifting,
    setActiveConstellation,
    resonance,
    myTrail,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within an AppProvider');
  return ctx;
}
