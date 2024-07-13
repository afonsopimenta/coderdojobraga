"use client";

import { untrackNinjaAction } from "../actions";

type NinjaListProps = {
  ninjas: {
    id: string;
    name: string;
    age: number;
  }[];
};

export const NinjaList = ({ ninjas }: NinjaListProps) => {
  return (
    <div className="space-y-2">
      <h2>Ninjas</h2>
      <ul className="space-y-2">
        {ninjas.map((ninja) => (
          <li key={ninja.id}>
            <p>Nome: {ninja.name}</p>
            <p>Idade: {ninja.age}</p>
            <button
              onClick={() => untrackNinjaAction({ id: ninja.id })}
              className="text-blue-500 underline"
            >
              Remove Ninja
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
