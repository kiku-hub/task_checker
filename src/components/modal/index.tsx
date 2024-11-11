import React, { useState } from "react";
import Modal from "react-modal";

export const FormModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  Modal.setAppElement("#root");

  return (
    <div>
      <button onClick={handleOpen}>開くボタン</button>
      <Modal isOpen={isOpen}>
        <button onClick={handleClose}>閉じるボタン</button>
      </Modal>
    </div>
  );
};