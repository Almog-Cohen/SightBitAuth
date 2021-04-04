import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { validateRoomName } from "../../utils/formValidation";
import { useFormik } from "formik";
import { createRoom } from "../../utils/apiClient";
import { useStateValue } from "../../StateProvider";

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

const CreateRoom = ({ userName }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [state, dispatch] = useStateValue();

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
    onSubmit: (values) => {
      createNewRoom(values);
    },
  });

  const createNewRoom = (values) => {
    // const newdata = await createRoom(values.roomName, userName);
    console.log(values.roomName);
    dispatch({
      type: "CHANGE_USER_ROOM",
      roomName: values.roomName,
    });
  };

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
    </div>
  );
};

export default CreateRoom;
