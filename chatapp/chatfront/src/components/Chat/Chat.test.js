import React from "react";
import { shallow } from "enzyme";
import Chat from "./Chat";

it("Expect to render Chat component", () => {
  expect(shallow(<Chat />).length).toEqual(1);
});
