import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import CreateRoom from "../Modal/CreateRoom";
import SidebarChat from "./SidebarChat";
import { Avatar } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useStateValue } from "../../StateProvider";
import io from "socket.io-client";

const styles = {
  width: "100%",
};

const END_POINT = "localhost:3001";
let socket;
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const Sidebar = ({ setRoomNumber }) => {
  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);

  console.log("CHAT SIDENAR RENDRING");

  const [openModal, setOpenModal] = useState(false);
  const [roomsList, setRoomsList] = useState([]);
  // const [state, dispatch] = useStateValue();

  const setModal = (e) => {
    e.preventDefault();
    setOpenModal((state) => !state);
  };

  const createNewRoom = () => {
    socket.emit("rooms");
  };

  useEffect(() => {
    socket = io(END_POINT, connectionOptions);

    socket.on("rooms", (rooms) => {
      setRoomsList(rooms);
    });

    socket.emit("rooms", {});

    return () => {
      socket.disconnect();
    };
  }, []);

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
        {roomsList?.map((room) => (
          <ButtonBase style={styles} onClick={() => setRoomNumber(room)}>
            <SidebarChat roomName={room} />
          </ButtonBase>
        ))}
      </div>
      <div>
        <Modal
          open={openModal}
          onClose={setModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div>
            <CreateRoom
              createNewRoom={createNewRoom}
              setRoomNumber={setRoomNumber}
              setOpenModal={setOpenModal}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Sidebar;
