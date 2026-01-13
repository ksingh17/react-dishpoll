import  { useEffect, useState } from "react";

const pointsMap = { 1: 30, 2: 20, 3: 10 };

const Result = ({ user }) => {
  const [dishes, setDishes] = useState([]);
  const [allVotes, setAllVotes] = useState({}); // {username: {dishId: rank}}

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json")
      .then((res) => res.json())
      .then((data) => setDishes(data));

    const votesObj = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("votes_")) votesObj[key.replace("votes_", "")] = JSON.parse(localStorage.getItem(key));
    });
    setAllVotes(votesObj);
  }, []);

  const calculatePoints = (dishId) => {
    let total = 0;
    Object.values(allVotes).forEach((userVote) => {
      const rank = userVote[dishId] || 0;
      total += pointsMap[rank] || 0;
    });
    return total;
  };

  const rankedDishes = [...dishes].sort((a, b) => calculatePoints(b.id) - calculatePoints(a.id));

  const userVotes = allVotes[user.username] || {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Poll Results</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {rankedDishes.map((dish) => (
          <div
            key={dish.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              width: "200px",
              backgroundColor: Object.keys(userVotes).includes(String(dish.id)) ? "#ffffcc" : "",
            }}
          >
            <img src={dish.image} alt={dish.dishName} style={{ width: "100%" }} />
            <h4>{dish.dishName}</h4>
            <p>Points: {calculatePoints(dish.id)}</p>
            {userVotes[dish.id] && <p>Your Rank: {userVotes[dish.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
