import React, { useState } from "react";
import "./Sidebar.css";
import CreateRoom from "../Modal/CreateRoom";
import SidebarChat from "./SidebarChat";
import { Avatar } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../StateProvider";

const styles = {
  width: "100%",
};

const Sidebar = ({ setRoomNumber, userName }) => {
  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);

  const [openModal, setOpenModal] = useState(false);
  const [state, dispatch] = useStateValue();

  const setModal = (e) => {
    e.preventDefault();
    setOpenModal((state) => !state);
  };

  const changeUserRoom = (roomName) => {
    dispatch({
      type: "CHANGE_USER_ROOM",
      roomName: roomName,
    });
  };

  return (
    <div className="side-bar">
      <div className="side-bar-header">
        <Avatar />
        <div className="side-bar-headerRight"></div>
      </div>
      <div className="side-bar-search">
        <div className="side-bar-searchContainer">Channels</div>
        <Button
          type="button"
          onClick={setModal}
          color="primary"
          fullWidth={true}
          variant="contained"
          disabled={false}
        >
          Create room
        </Button>
      </div>
      <div className="side-bar-chats">
        <ButtonBase style={styles} onClick={() => changeUserRoom("1")}>
          <SidebarChat roomName={"Room 1"} />
        </ButtonBase>
        <ButtonBase style={styles} onClick={() => changeUserRoom("2")}>
          <SidebarChat roomName={"Room 2"} />
        </ButtonBase>
      </div>

      <div>
        <Modal
          open={openModal}
          onClose={setModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div>
            <CreateRoom userName={userName} />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
