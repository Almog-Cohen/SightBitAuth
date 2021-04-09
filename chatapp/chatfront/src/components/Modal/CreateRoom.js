import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { validateRoomName } from "../../utils/formValidation";
import { useFormik } from "formik";
import { isRoomExists } from "../../utils/apiClient";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CreateRoom = ({ setRoomNumber, createNewRoom, setOpenModal }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      roomName: "",
    },
    validate: (values) => {
      // returns error object, if empty then there are not errors and the form is valid
      return {
        ...validateRoomName(values.roomName),
      };
    },
    onSubmit: async (values) => {
      const roomExists = await isRoomExists(values.roomName);

      console.log(roomExists);
      if (roomExists) {
        setError("The rome name is taken please chose another");
      } else {
        createNewRoom();
        setRoomNumber(values.roomName);
        setOpenModal(false);
      }
    },
  });

  console.log("CHECK ERROR", error);
  return (
    <div style={modalStyle} className={classes.paper}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={formik.errors.roomName}
          helperText={formik.errors.roomName}
          fullWidth={true}
          required
          label="RoomName"
          name="roomName"
          placeholder="Enter room name"
          onChange={formik.handleChange}
          value={formik.values.roomName}
        />
        <Button
          type="submit"
          color="primary"
          fullWidth={true}
          variant="contained"
          disabled={false}
        >
          Create room
        </Button>
      </form>

      {error && (
        <p style={{ color: "red", display: "flex", justifyContent: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CreateRoom;
