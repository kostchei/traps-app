// App.js
import React, { useState } from 'react';

// Available trap types.
const TRAP_TYPES = ['Poison Dart', 'Scythe', 'Pit Trap'];

// Generates a random trap type.
function randomTrapType() {
  const index = Math.floor(Math.random() * TRAP_TYPES.length);
  return TRAP_TYPES[index];
}

// Trap generation function. This takes into account the party level to generate an appropriate trap.
function generateTrap(level) {
  let difficulty, xp, dc, toHit, damage, type;

  type = randomTrapType();
  
  if (level <= 4) {
    difficulty = 'Easy';
    xp = 10;
    dc = 14;
    toHit = 6;
    damage = '3d6';
  } else if (level <= 10) {
    difficulty = 'Medium';
    xp = 50;
    dc = 16;
    toHit = 8;
    damage = '4d6';
  } else if (level <= 15) {
    difficulty = 'Hard';
    xp = 100;
    dc = 18;
    toHit = 10;
    damage = '6d6';
  } else {
    difficulty = 'Deadly';
    xp = 200;
    dc = 20;
    toHit = 12;
    damage = '8d6';
  }

  return { type, difficulty, xp, dc, toHit, damage };
}

// Trap component. This displays the generated trap to the user.
function Trap({ trap }) {
  return (
    <div>
      <h2>Generated Trap</h2>
      <p>Type: {trap.type}</p>
      <p>Difficulty: {trap.difficulty}</p>
      <p>XP: {trap.xp}</p>
      <p>DC to Detect: {trap.dc}</p>
      <p>Chance to Hit: +{trap.toHit}</p>
      <p>Damage: {trap.damage}</p>
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
    <div>
      <h1>Random DnD Trap Generator</h1>
      <LevelInputForm onGenerate={handleGenerate} />
      {trap && <Trap trap={trap} />}
    </div>
  );
}

export default App;

