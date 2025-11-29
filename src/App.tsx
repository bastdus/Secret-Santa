import { useState } from "react";
import Snowfall from "react-snowfall";
import result from "./data.json";
import Card from "./components/Card/Card";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import GiftIcon from "./components/GiftIcon/GiftIcon";
import "./App.css";

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
      <Card
        title={
          <>
            🎅 Secret Santa 🤶
            <br />
            Samedi 20 décembre 2025
            <br />
            chez Tom & Georgie
          </>
        }
        description={
          <>
            Découvre à qui tu dois offrir un cadeau ! 🎁 <br />
            (max 20€)
          </>
        }
      >
        {friends.map((friend) => (
          <Button key={friend.name} onClick={() => handleOpenModal(friend)}>
            <GiftIcon />
            {friend.name}
          </Button>
        ))}
      </Card>

      {selectedFriend && (
        <Modal
          title={
            isCorrect
              ? "Tu dois offrir un cadeau à..."
              : "Entre le mot de passe"
          }
          onClose={handleCloseModal}
        >
          {!isCorrect ? (
            <div className="modal-body">
              <input
                type="password"
                className="modal-input"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <div className="modal-footer">
                <Button onClick={handleCheckPassword}>Vérifier</Button>
              </div>
            </div>
          ) : (
            <div className="modal-result">
              <p className="modal-result-name">
                {selectedFriend.secretFriend} !
              </p>
              <span className="modal-result-emojis">🎅 🎁 🤶</span>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;
