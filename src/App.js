// App.js
import React, { useState } from 'react';
import './App.css';


// Available trap types.


// Generates a random trap type.
function randomTrapType() {
  const index = Math.floor(Math.random() * TRAP_TYPES.length);
  return TRAP_TYPES[index];
}

// Available trap types.
const TRAP_TYPES = ['Setback', 'Dangerous', 'Deadly'];

// Trap details for different levels and types.
const TRAP_DETAILS = {
  '1-4': {
    'Setback': { dc: 10, toHit: 3, damage: '1d10', xp: 25, description: '(snare, net, simple pit)', effects: 'Chance of restraint, exhaustion' },
    'Dangerous': { dc: 12, toHit: 6, damage: '2d10', xp: 450, description: '(rolling ball, falling block, slashing scythe blade, spiked pit)', effects: 'Chance of injury- crush, slash, pierce' },
    'Deadly': { dc: 16, toHit: 9, damage: '4d10', xp: 1800, description: '(poisoned spikes, diseased surface, gas)', effects: 'Chance of poison, disease' }
  },
  '5-10': {
    'Setback': { dc: 10, toHit: 4, damage: '2d10', xp: 200, description: '(rolling ball, falling block, slashing scythe blade, spiked pit)', effects: 'Chance of injury- crush, slash, pierce' },
    'Dangerous': { dc: 12, toHit: 7, damage: '4d10', xp: 1100, description: '(poisoned spikes, diseased surface, gas)', effects: 'Chance of poison, disease' },
    'Deadly': { dc: 17, toHit: 10, damage: '10d10', xp: 10000, description: '(filling pit, filling room with water or sand, crushing, gas)', effects: 'Chance of drowning/suffocation' }
  },
  '11-16': {
    'Setback': { dc: 11, toHit: 4, damage: '4d10', xp: 700, description: '(poisoned spikes, diseased surface, gas)', effects: 'Chance of poison, disease' },
    'Dangerous': { dc: 12, toHit: 7, damage: '10d10', xp: 2300, description: '(filling pit, filling room with water or sand, crushing, gas)', effects: 'Chance of drowning/suffocation' },
    'Deadly': { dc: 19, toHit: 11, damage: '18d10', xp: 25000, description: '(magic, fire, acid)', effects: 'Chance of soul destruction, petrification or complete disintegration' }
  },
  '17-20': {
    'Setback': { dc: 11, toHit: 5, damage: '10d10', xp: 1800, description: '(filling pit, filling room with water or sand, crushing, gas)', effects: 'Chance of drowning/suffocation' },
    'Dangerous': { dc: 12, toHit: 8, damage: '18d10', xp: 8400, description: '(magic, fire, acid)', effects: 'Chance of soul destruction, petrification or complete disintegration' },
    'Deadly': { dc: 20, toHit: 12, damage: '24d10', xp: 10000, description: '(magic, fire, acid)', effects: 'Chance of soul destruction, petrification or complete disintegration' }
  }
};




// Get level range.
function getLevelRange(level) {
  if (level <= 4) {
    return '1-4';
  } else if (level <= 10) {
    return '5-10';
  } else if (level <= 16) {
    return '11-16';
  } else {
    return '17-20';
  }
}

// Trap generation function.
function generateTrap(level) {
  let type = randomTrapType();
  let levelRange = getLevelRange(level);

  let details = TRAP_DETAILS[levelRange][type];

  let { dc, toHit, damage, xp } = details;

  return { type, dc, toHit, damage, xp };
}


// Trap component. This displays the generated trap to the user.
function Trap({ trap }) {
  return (
    <div>
      <h2>Generated Trap</h2>
      <p><strong>Type:</strong> {trap.type}</p>
      <p><strong>Description:</strong> {trap.description}</p>
      <p><strong>DC:</strong> {trap.dc}</p>
      <p><strong>To Hit Bonus:</strong> {trap.toHit}</p>
      <p><strong>Damage:</strong> {trap.damage}</p>
      <p><strong>Possible Effects:</strong> {trap.effects}</p>
      <p><strong>XP:</strong> {trap.xp}</p>
    </div>
  );
}

// Level Input Form component. This takes user input for the level and calls the onGenerate function prop when the form is submitted.
function LevelInputForm({ onGenerate }) {
  const [level, setLevel] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    onGenerate(level);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Party Level:
        <input type="number" value={level} onChange={(e) => setLevel(Number(e.target.value))} min="1" />
      </label>
      <button type="submit">Generate Trap</button>
    </form>
  );
}

// Main App component. This renders the Level Input Form and the Trap components, and handles trap generation when the form is submitted.
function App() {
  const [trap, setTrap] = useState(null);

  const handleGenerate = (level) => {
    const newTrap = generateTrap(level);
    setTrap(newTrap);
  };

  return (
    <div className="container">
      <h1>Random DnD Trap Generator</h1>
      <LevelInputForm onGenerate={handleGenerate} />
      {trap && <Trap trap={trap} />}
    </div>
  );
}

export default App;

