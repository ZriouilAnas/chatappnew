import React from 'react';

const GroupList = () => {
  // Exemple de groupes
  const groups = ["Groupe 1", "Groupe 2"];

  return (
    <div>
      {groups.map((group, index) => (
        <div key={index}>{group}</div>
      ))}
    </div>
  );
};

export default GroupList;
