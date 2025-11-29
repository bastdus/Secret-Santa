import { useState } from "react";
import { deobfuscate } from "@/utils/deobfuscate";

type Friend = {
  name: string;
  password: string;
  secretFriend: string;
};

interface UseSecretSantaReturn {
  friends: Friend[];
  selectedFriend: Friend | null;
  password: string;
  isRevealed: boolean;
  error: string | null;
  openModal: (friend: Friend) => void;
  closeModal: () => void;
  setPassword: (value: string) => void;
  checkPassword: () => void;
}

export const useSecretSanta = (data: Friend[]): UseSecretSantaReturn => {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [password, setPassword] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const friends: Friend[] = data.map((f) => ({
    name: deobfuscate(f.name),
    password: deobfuscate(f.password),
    secretFriend: deobfuscate(f.secretFriend),
  }));

  const openModal = (friend: Friend) => {
    setSelectedFriend(friend);
    setPassword("");
    setIsRevealed(false);
    setError(null);
  };

  const closeModal = () => {
    setSelectedFriend(null);
    setPassword("");
    setIsRevealed(false);
    setError(null);
  };

  const checkPassword = () => {
    if (!selectedFriend) return;

    if (password === selectedFriend.password) {
      setIsRevealed(true);
      setError(null);
    } else {
      setError("Mot de passe incorrect 🎅");
    }
  };

  return {
    friends,
    selectedFriend,
    password,
    isRevealed,
    error,
    openModal,
    closeModal,
    setPassword,
    checkPassword,
  };
};
