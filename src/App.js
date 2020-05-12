import React, { useReducer, useState, useEffect } from "react";
import { Box, Flex, Button, Heading, Card } from "rebass";
import "./App.scss";
import { Input } from "@rebass/forms";

export const App = () => {
  const intRegex = /^\d+$/;
  const reducerPros = (state, action) => {
    const proArray = [...state];
    switch (action.type) {
      case "increment":
        proArray.push({ text: "", points: 1 });
        return proArray;
      case "decrement":
        if (proArray.length > 1) {
          proArray.pop();
        }
        return proArray;
      case "changePoints":
        if (intRegex.test(action.payload.points)) {
          proArray[action.payload.index].points = action.payload.points;
        } else if (!!!action.payload.points) {
          proArray[action.payload.index].points = "";
        }
        return proArray;
      case "changeText":
        proArray[action.payload.index].text = action.payload.text;
        return proArray;
    }
  };

  const reducerCons = (state, action) => {
    const consArray = [...state];
    switch (action.type) {
      case "increment":
        consArray.push({ text: "", points: 1 });
        return consArray;
      case "decrement":
        if (consArray.length > 1) {
          consArray.pop();
        }
        return consArray;
      case "changePoints":
        if (intRegex.test(action.payload.points)) {
          consArray[action.payload.index].points = action.payload.points;
        } else if (!!!action.payload.points) {
          consArray[action.payload.index].points = "";
        }
        return consArray;
      case "changeText":
        consArray[action.payload.index].text = action.payload.text;
        return consArray;
    }
  };

  const prosInitialState = JSON.parse(localStorage.getItem("pros")) || [
    { text: "", points: 1 },
  ];
  const consInitialState = JSON.parse(localStorage.getItem("cons")) || [
    { text: "", points: 1 },
  ];
  const [pros, dispatchPros] = useReducer(reducerPros, prosInitialState);
  const [cons, dispatchCons] = useReducer(reducerCons, consInitialState);
  const [result, setResult] = useState("");

  useEffect(() => {
    const allPros = pros.reduce((prev, current) => {
      return parseInt(prev) + parseInt(current.points);
    }, 0);
    const allCons = cons.reduce((prev, current) => {
      return parseInt(prev) + parseInt(current.points);
    }, 0);

    localStorage.setItem("pros", JSON.stringify(pros));
    localStorage.setItem("cons", JSON.stringify(cons));
    const calc = allPros - allCons;
    setResult(isNaN(calc) ? "Input integer value in points" : calc);
  }, [pros, cons]);

  return (
    <>
      <div className="container">
        <Heading py={2} fontSize={[5, 6, 7]} color="secondary">
          Pros and Cons 🤔
        </Heading>
      </div>
      <Flex>
        <Box p={2} fontSize={4} width={1} color="black">
          <Card width={1}>
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
            <Box height={400} overflow="auto">
              {pros.map((value, index) => {
                return (
                  <div key={index}>
                    <Flex>
                      <Input
                        width={1}
                        m={1}
                        value={value.text}
                        placeholder="Enter text"
                        onChange={(e) => {
                          dispatchPros({
                            type: "changeText",
                            payload: { index, text: e.target.value },
                          });
                        }}
                      />
                      <Input
                        width={1 / 2}
                        m={1}
                        value={value.points}
                        placeholder="Enter points"
                        onChange={(e) => {
                          dispatchPros({
                            type: "changePoints",
                            payload: { index, points: e.target.value },
                          });
                        }}
                      />
                    </Flex>
                  </div>
                );
              })}
            </Box>
          </Card>
        </Box>
        <Box p={2} fontSize={4} width={1} color="black">
          <Card width={1}>
            <Flex>
              <Button
                mx={5}
                className="pointer"
                bg="secondary"
                onClick={() => dispatchCons({ type: "increment" })}
              >
                Add Cons
              </Button>
              <Button
                mx={5}
                className="pointer"
                bg="primary"
                onClick={() => dispatchCons({ type: "decrement" })}
              >
                Remove Cons
              </Button>
            </Flex>
            {cons.map((value, index) => {
              return (
                <div key={index}>
                  <Flex>
                    <Input
                      width={1}
                      m={1}
                      value={value.text}
                      placeholder="Enter text"
                      onChange={(e) => {
                        dispatchCons({
                          type: "changeText",
                          payload: { index, text: e.target.value },
                        });
                      }}
                    />
                    <Input
                      width={1 / 2}
                      m={1}
                      value={value.points}
                      placeholder="Enter points"
                      onChange={(e) => {
                        dispatchCons({
                          type: "changePoints",
                          payload: { index, points: e.target.value },
                        });
                      }}
                    />
                  </Flex>
                </div>
              );
            })}
          </Card>
        </Box>
      </Flex>
      <div className="container">
        <Heading fontSize={[4, 5, 6]} color="primary">
          Result : {result}
        </Heading>
      </div>
    </>
  );
};
