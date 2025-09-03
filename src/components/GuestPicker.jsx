import React, { useState } from "react";
import { Button } from "antd";
import "./GuestPicker.scss";
const GuestPicker = ({
  guestCount,
  setGuestCount,
  roomCount,
  setRoomCount,
  onClose,
}) => {
  const updateGuestCount = (newGuestCount) => {
    if (newGuestCount >= 1 && newGuestCount <= 20) {
      setGuestCount(newGuestCount);
      if (newGuestCount < roomCount) {
        setRoomCount(newGuestCount);
      }
    }
  };

  const updateRoomCount = (newRoomCount) => {
    if (newRoomCount >= 1 && newRoomCount <= 20) {
      setRoomCount(newRoomCount);
      if (newRoomCount > guestCount) {
        setGuestCount(newRoomCount);
      }
    }
  };

  return (
    <div className="guest-picker-content">
      <div className="choose-qty">
        <label>Người</label>
        <div className="qty-control">
          <Button onClick={() => updateGuestCount(guestCount - 1)}>-</Button>
          <span>{guestCount}</span>
          <Button onClick={() => updateGuestCount(guestCount + 1)}>+</Button>
        </div>
      </div>

      <div className="choose-qty">
        <label>Phòng</label>
        <div className="qty-control">
          <Button onClick={() => updateRoomCount(roomCount - 1)}>-</Button>
          <span>{roomCount}</span>
          <Button onClick={() => updateRoomCount(roomCount + 1)}>+</Button>
        </div>
      </div>

      <Button
        className="done-btn"
        type="primary"
        size="large"
        onClick={onClose}
      >
        Xong
      </Button>
    </div>
  );
};

export default GuestPicker;
