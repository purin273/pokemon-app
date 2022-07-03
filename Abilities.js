import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "./abilities.css";
import { useParams } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function Abilities() {
  const [abilities, setAbilities] = useState([]);
  const [species, setSpecies] = useState([]);
  const [stats, setStats] = useState([]);
  const [formDesc, setFormDesc] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((result) => {
      result.json().then((resp) => {
        setAbilities(resp);
      });
    });
  }, []);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${abilities.name}`).then(
      (result) => {
        result.json().then((resp) => {
          setSpecies(resp);
          setFormDesc(resp.order);
        });
      }
    );
  }, [abilities]);

  useEffect(() => {
    setStats(abilities.sprites);
  }, [abilities]);
  console.log(species);
  console.log(formDesc);
  const data = {
    labels: ["Base-Experience:", "Height(in cm)", "Order", "Weight(in lbs)"],
    datasets: [
      {
        label: "# of Pokemon",
        data: [
          abilities.base_experience,
          abilities.height * 30,
          abilities.order,
          abilities.weight,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data2 = {
    labels: ["Base-Happiness:", "Capture-Rate", "Hatch-Counter", "HP", "Power"],
    datasets: [
      {
        label: "# of Pokemon",
        data: [
          species.base_happiness,
          species.capture_rate,
          species.hatch_counter,
          abilities.id,
          species.order,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // console.log(abilities);
  // console.log(species);
  // console.log(species.base_happiness);
  // console.log(species.capture_rate);
  // console.log(species.hatch_counter);
  // console.log(abilities.base_experience);
  // console.log(abilities.height);
  // console.log(abilities.name);
  // console.log(abilities.order);
  // console.log(abilities.weight);

  return (
    <div>
      <div className="container">
        <h1 className="h1">{abilities.name}</h1>
        <img
          className="img"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${name}.svg`}
          alt=""
        />
      </div>
      <div className="pieChart">
        <div className="pie1">
          <h3>
            Abilities
            <Pie data={data} />
          </h3>
        </div>
        <div className="pie2">
          <h3>Species</h3>
          <Pie data={data2} />
        </div>
      </div>
    </div>
  );
}

export default Abilities;
