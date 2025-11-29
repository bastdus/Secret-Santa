import Snowfall from "react-snowfall";

import { Button, Card, GiftIcon, Modal } from "@/components/ui";
import { useSecretSanta } from "@/hooks/useSecretSanta";
import data from "@/data.json";

import "@/app/styles.css";

const App = () => {
  const {
    friends,
    selectedFriend,
    password,
    isRevealed,
    error,
    openModal,
    closeModal,
    setPassword,
    checkPassword,
  } = useSecretSanta(data);

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
            Clique sur ton prénom pour découvrir à qui tu dois offrir un cadeau
            🎁
            <br />
            (max 20€)
          </>
        }
      >
        {friends.map((friend) => (
          <Button key={friend.name} onClick={() => openModal(friend)}>
            <GiftIcon className="gift-icon" />
            {friend.name}
          </Button>
        ))}
      </Card>

      {selectedFriend && (
        <Modal
          title={
            isRevealed
              ? "Tu dois offrir un cadeau à..."
              : "Entre le mot de passe"
          }
          onClose={closeModal}
        >
          {!isRevealed ? (
            <div className="modal-body">
              <input
                type="password"
                className={`modal-input ${error ? "modal-input-error" : ""}`}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && checkPassword()}
                autoFocus
                aria-label="Mot de passe"
                aria-invalid={!!error}
              />
              {error && <p className="modal-error">{error}</p>}
              <div className="modal-footer">
                <Button onClick={checkPassword}>Vérifier</Button>
              </div>
            </div>
          ) : (
            <div className="modal-result">
              <p className="modal-result-name">
                {selectedFriend.secretFriend} !
              </p>
              <span className="modal-result-emojis" aria-hidden="true">
                🎅 🎁 🤶
              </span>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;
