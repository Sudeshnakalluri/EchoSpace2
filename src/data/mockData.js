// Seed data for EchoSpace. Everything is local/mock for the challenge demo.
// The content models collaborative thinking rather than a conventional social feed.

export const CURRENT_USER_ID = 'u_you';

export const users = [
  { id: 'u_you', name: 'You', hue: 168, bio: 'Still figuring out what to build.' },
  { id: 'u_mara', name: 'Mara Ilić', hue: 262, bio: 'Collects unfinished thoughts.' },
  { id: 'u_theo', name: 'Theo Nakamura', hue: 20, bio: 'Sound, static, and small rituals.' },
  { id: 'u_priya', name: 'Priya Chandran', hue: 205, bio: 'Believes in slow conversations.' },
  { id: 'u_jules', name: 'Jules Okafor', hue: 330, bio: 'Draws maps of feelings.' },
  { id: 'u_sena', name: 'Sena Aksoy', hue: 45, bio: 'Asks the second question.' },
  { id: 'u_wren', name: 'Wren Castillo', hue: 285, bio: 'Night-shift thinker.' },
  { id: 'u_ami', name: 'Ami Park', hue: 105, bio: 'Turns observations into tiny experiments.' },
];

const now = Date.now();
const hoursAgo = (h) => now - h * 60 * 60 * 1000;

export const seedConstellations = [
  {
    id: 'c_unsent',
    title: 'Unsent Messages',
    prompt: 'Things you almost said out loud.',
    createdAt: hoursAgo(96),
    nodes: [
      { id: 'n1', authorId: 'u_mara', text: 'I rehearsed the apology in the shower and never gave it.', connections: [], createdAt: hoursAgo(95) },
      { id: 'n2', authorId: 'u_theo', text: 'Told the group chat I was “busy.” I was watching the ceiling fan.', connections: ['n1'], createdAt: hoursAgo(90) },
      { id: 'n3', authorId: 'u_priya', text: 'Sometimes the almost-said thing is the truest draft of it.', connections: ['n1'], createdAt: hoursAgo(80) },
      { id: 'n4', authorId: 'u_jules', text: 'I keep a note titled “say this eventually.” It has 40 lines.', connections: ['n2'], createdAt: hoursAgo(60) },
      { id: 'n5', authorId: 'u_sena', text: 'What if silence is just a message with a longer delivery time.', connections: ['n3', 'n4'], createdAt: hoursAgo(40) },
      { id: 'n6', authorId: 'u_you', text: 'I sent it three years later. They had already forgiven me on their own.', connections: ['n5'], createdAt: hoursAgo(12) },
      { id: 'n7', authorId: 'u_ami', text: 'Maybe an unsent message still changes you, even without a recipient.', connections: ['n5'], createdAt: hoursAgo(7) },
    ],
  },
  {
    id: 'c_smallrituals',
    title: 'Small Rituals',
    prompt: 'The tiny habits that quietly hold your day together.',
    createdAt: hoursAgo(70),
    nodes: [
      { id: 'n10', authorId: 'u_theo', text: 'I touch the doorframe before leaving. Not superstition — just a hello to the house.', connections: [], createdAt: hoursAgo(69) },
      { id: 'n11', authorId: 'u_wren', text: 'Same three songs before any hard conversation. It resets something.', connections: ['n10'], createdAt: hoursAgo(55) },
      { id: 'n12', authorId: 'u_sena', text: 'I name my plants after people I need to forgive. Easier to be gentle with a fern.', connections: ['n10'], createdAt: hoursAgo(50) },
      { id: 'n13', authorId: 'u_mara', text: 'Rituals are just grief and hope, disguised as habit.', connections: ['n11', 'n12'], createdAt: hoursAgo(30) },
      { id: 'n14', authorId: 'u_you', text: 'I re-read the last text before deleting a thread. A tiny funeral.', connections: ['n13'], createdAt: hoursAgo(8) },
      { id: 'n15', authorId: 'u_ami', text: 'I put a glass of water beside my bed before difficult days. Future me deserves logistics.', connections: ['n12'], createdAt: hoursAgo(4) },
    ],
  },
  {
    id: 'c_futureletters',
    title: 'Letters to a Future Self',
    prompt: 'What should a version of you, five years out, know right now?',
    createdAt: hoursAgo(48),
    nodes: [
      { id: 'n20', authorId: 'u_priya', text: 'You will not remember this exact fear. Be kind to the version of you holding it.', connections: [], createdAt: hoursAgo(47) },
      { id: 'n21', authorId: 'u_jules', text: 'The apartment you’re scared to leave will become a story you tell at dinner.', connections: ['n20'], createdAt: hoursAgo(40) },
      { id: 'n22', authorId: 'u_wren', text: 'Keep one photo of yourself looking unsure. You’ll want proof you didn’t always know.', connections: ['n20'], createdAt: hoursAgo(20) },
      { id: 'n23', authorId: 'u_you', text: 'You were allowed to change the plan. The plan was never the point.', connections: ['n21', 'n22'], createdAt: hoursAgo(10) },
      { id: 'n24', authorId: 'u_sena', text: 'Save some curiosity for the things that do not have an immediate use.', connections: ['n23'], createdAt: hoursAgo(5) },
    ],
  },
  {
    id: 'c_noisewekeep',
    title: 'Noise We Keep',
    prompt: 'Ambient sounds and textures that quietly mean something.',
    createdAt: hoursAgo(30),
    nodes: [
      { id: 'n30', authorId: 'u_theo', text: 'The specific hum of a fridge at 2am when you can’t sleep.', connections: [], createdAt: hoursAgo(29) },
      { id: 'n31', authorId: 'u_sena', text: 'Rain on a car roof while parked, engine off, in no hurry to go inside.', connections: ['n30'], createdAt: hoursAgo(18) },
      { id: 'n32', authorId: 'u_you', text: 'The elevator arriving one floor too early, a tiny mechanical surprise.', connections: ['n30'], createdAt: hoursAgo(11) },
      { id: 'n33', authorId: 'u_ami', text: 'Keyboard clicks from another room make a house feel inhabited.', connections: ['n31', 'n32'], createdAt: hoursAgo(3) },
    ],
  },
  {
    id: 'c_unfinished',
    title: 'Beautifully Unfinished',
    prompt: 'Things that became useful before they became complete.',
    createdAt: hoursAgo(21),
    nodes: [
      { id: 'n40', authorId: 'u_you', text: 'The first version only worked on my laptop. It still taught me what the idea wanted.', connections: [], createdAt: hoursAgo(20) },
      { id: 'n41', authorId: 'u_ami', text: 'A sketch can be a tool, not a promise of a final drawing.', connections: ['n40'], createdAt: hoursAgo(16) },
      { id: 'n42', authorId: 'u_mara', text: 'Sometimes “done enough” is the first version that can meet another person.', connections: ['n40', 'n41'], createdAt: hoursAgo(12) },
      { id: 'n43', authorId: 'u_priya', text: 'The unfinished parts leave room for someone else to contribute.', connections: ['n42'], createdAt: hoursAgo(6) },
    ],
  },
  {
    id: 'c_betterquestions',
    title: 'Questions Worth Keeping',
    prompt: 'Not answers. Questions that keep becoming more interesting.',
    createdAt: hoursAgo(15),
    nodes: [
      { id: 'n50', authorId: 'u_sena', text: 'What would I notice if I stopped trying to be impressive?', connections: [], createdAt: hoursAgo(14) },
      { id: 'n51', authorId: 'u_jules', text: 'What changes when nobody is watching?', connections: ['n50'], createdAt: hoursAgo(11) },
      { id: 'n52', authorId: 'u_you', text: 'Which parts of a life are only visible from the inside?', connections: ['n51'], createdAt: hoursAgo(8) },
      { id: 'n53', authorId: 'u_wren', text: 'Can a question be a place we meet instead of a problem we solve?', connections: ['n50', 'n52'], createdAt: hoursAgo(2) },
    ],
  },
];

export const seedActivityLog = [
  { userId: 'u_mara', action: 'grew a thought in', constellationId: 'c_unsent', at: hoursAgo(2) },
  { userId: 'u_theo', action: 'joined', constellationId: 'c_noisewekeep', at: hoursAgo(3) },
  { userId: 'u_sena', action: 'connected two threads in', constellationId: 'c_smallrituals', at: hoursAgo(5) },
];
