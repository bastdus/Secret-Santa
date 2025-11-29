import { useState } from "react";
import Snowfall from "react-snowfall";
import result from "./data/secretSanta.json";

type Friend = {
  name: string;
  password: string;
  secretFriend: string;
};

const deobfuscateString = (encodedStr: string) => {
  let decoded = "";
  const parts = encodedStr.split("-");
  for (const part of parts) {
    const charCode = parseInt(part) - 5;
    decoded += String.fromCharCode(charCode);
  }
  return decoded;
};

const GiftIcon = () => (
  <svg
    className="gift-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <path d="M12 8v13" />
    <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
    <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
  </svg>
);

const App = () => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [password, setPassword] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const friends = result.map((f) => ({
    name: deobfuscateString(f.name),
    password: deobfuscateString(f.password),
    secretFriend: deobfuscateString(f.secretFriend),
  }));

  const handleOpenModal = (friend: Friend) => {
    setSelectedFriend(friend);
    setPassword("");
    setIsCorrect(false);
  };

  const handleCloseModal = () => {
    setSelectedFriend(null);
    setPassword("");
    setIsCorrect(false);
  };

  const handleCheckPassword = () => {
    if (selectedFriend && password === selectedFriend.password) {
      setIsCorrect(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCheckPassword();
    }
  };

  return (
    <div className="app">
      <Snowfall />
      <div className="card">
        <h1 className="card-title">
          🎅 Secret Santa 🤶
          <br />
          Samedi 20 décembre 2025
          <br />
          chez Tom & Georgie
        </h1>
        <p className="card-description">
          Découvre à qui tu dois offrir un cadeau ! 🎁 <br />
          (max 20€)
        </p>
        <div className="buttons-grid">
          {friends.map((friend) => (
            <button
              key={friend.name}
              className="btn"
              onClick={() => handleOpenModal(friend)}
            >
              <GiftIcon />
              {friend.name}
            </button>
          ))}
        </div>
      </div>

      {selectedFriend && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {isCorrect
                ? "Tu dois offrir un cadeau à..."
                : "Entre le mot de passe"}
            </h2>
            {!isCorrect ? (
              <>
                <input
                  type="password"
                  className="input"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <div className="modal-footer">
                  <button className="btn" onClick={handleCheckPassword}>
                    Vérifier
                  </button>
                </div>
              </>
            ) : (
              <div className="result">
                <p className="result-name">{selectedFriend.secretFriend} !</p>
                <span className="result-emojis">🎅 🎁 🤶</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
