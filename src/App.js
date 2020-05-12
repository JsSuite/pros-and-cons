import React, { useReducer } from "react";
import { Box, Flex, Button, Heading, Card } from "rebass";
import "./App.scss";
import { Input } from "@rebass/forms";

export const App = () => {
  const reducerPros = (state, action) => {
    const proArray = [...state];
    switch (action.type) {
      case "increment":
        proArray.push({ text: "", points: '"' });
        return proArray;
      case "decrement":
        proArray.pop();
        return proArray;
    }
  };

  const reducerCons = (state, action) => {
    const consArray = [...state];
    switch (action.type) {
      case "increment":
        return consArray.push({ text: "", points: '"' });
      case "decrement":
        return consArray.pop();
      default:
        throw new Error();
    }
  };

  const initialState = [{ text: "", points: "" }];
  const [pros, dispatchPros] = useReducer(reducerPros, initialState);
  const [cons, dispatchCons] = useReducer(reducerCons, initialState);

  return (
    <>
      <div className="container">
        <Heading py={2} fontSize={[5, 6, 7]} color="secondary">
          Pros and Cons 🤔
        </Heading>
      </div>
      <Flex>
        <Box p={2} fontSize={4} width={1} color="black">
          <Card width={1} minHeight={500}>
            <Flex>
              <Button
                mx={5}
                className="pointer"
                bg="secondary"
                onClick={() => dispatchPros({ type: "increment" })}
              >
                Add Pros
              </Button>
              <Button
                mx={5}
                className="pointer"
                bg="primary"
                onClick={() => dispatchPros({ type: "decrement" })}
              >
                Remove Pros
              </Button>
            </Flex>
            {pros.map((value, index) => {
              return <div key={index}>index</div>;
            })}
          </Card>
        </Box>
        <Box p={2} fontSize={4} width={1} color="black">
          <Card width={1} minHeight={500}>
            <Flex>
              <Button
                mx={5}
                className="pointer"
                bg="secondary"
                onClick={() => dispatchPros({ type: "increment" })}
              >
                Add Cons
              </Button>
              <Button
                mx={5}
                className="pointer"
                bg="primary"
                onClick={() => dispatchPros({ type: "decrement" })}
              >
                Remove Cons
              </Button>
            </Flex>
          </Card>
        </Box>
      </Flex>
    </>
  );
};
