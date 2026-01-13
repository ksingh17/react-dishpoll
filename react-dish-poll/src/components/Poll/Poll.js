import { useState, useEffect } from "react";
import "./Poll.css";

const Poll = ({ user }) => {
  const [dishes, setDishes] = useState([]);
  const [votes, setVotes] = useState({}); // {dishId: rank}

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json")
      .then((res) => res.json())
      .then((data) => setDishes(data));

    const savedVotes =
      JSON.parse(localStorage.getItem(`votes_${user.username}`)) || {};
    setVotes(savedVotes);
  }, [user.username]);

  const handleRankChange = (dishId, rank) => {
    let newVotes = { ...votes };

    // Remove same rank from other dish
    Object.keys(newVotes).forEach((key) => {
      if (newVotes[key] === rank) newVotes[key] = 0;
    });

    // Assign rank or remove if already selected
    if (newVotes[dishId] === rank) newVotes[dishId] = 0;
    else newVotes[dishId] = rank;

    setVotes(newVotes);
    localStorage.setItem(`votes_${user.username}`, JSON.stringify(newVotes));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vote for Your Favourite Dishes</h2>
      <p>Select up to 3 dishes and rank them (1 = 1st, 2 = 2nd, 3 = 3rd)</p>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <img src={dish.image} alt={dish.dishName} />

            <div className="dish-content">
              <h4>{dish.dishName}</h4>
              <p>{dish.description}</p>
            </div>

            <div className="rank-container">
              {[1, 2, 3].map((rank) => (
                <button
                  className={`rank-btn ${
                    votes[dish.id] === rank ? "active" : ""
                  }`}
                  onClick={() => handleRankChange(dish.id, rank)}
                >
                  {rank}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Poll;
