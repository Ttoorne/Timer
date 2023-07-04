import React, { useState, useEffect } from "react";
import { Box, Button, Input, InputLabel, Typography } from "@mui/material";
import "./Main.css";

const Main = () => {
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [leftTime, setLeftTime] = useState(null);

  // handle input
  const handleDay = (e) => {
    if (e > 31) {
      alert("Введите корректное значение для дня(не больше 31).");
      return;
    }
    setDay(e);
  };

  const handleHour = (e) => {
    if (e > 24) {
      alert("Введите корректное значение для часов(не больше 24).");
      setHour(24);
      return;
    }
    setHour(e);
  };

  const handleMinute = (e) => {
    if (e > 60) {
      alert("Введите корректное значение для минут.");
      setMinute(60);
      return;
    }
    setMinute(e);
  };

  //button
  const handleSave = () => {
    const totalSeconds = day * 24 * 60 * 60 + hour * 60 * 60 + minute * 60;
    setLeftTime(totalSeconds);
  };

  useEffect(() => {
    if (leftTime === null) {
      return;
    }

    const interval = setInterval(() => {
      setLeftTime((prevRemainingTime) => {
        if (prevRemainingTime > 0) {
          return prevRemainingTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [leftTime]);

  const formatTime = (time) => {
    const days = Math.floor(time / (24 * 3600));
    const remainingSeconds = time % (24 * 3600);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    return `${days ? days : "0" + days}:${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "10% 0",
        textAlign: "center",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#fff",
          border: "3px solid rgb(55,55,55)",
          borderRadius: "15px",
          width: "25%",
          margin: "auto",
        }}
      >
        <Box sx={{ display: "flex", margin: "5% auto 0" }}>
          <Box sx={{ paddingRight: "10%" }}>
            <Typography variant="h6" sx={{ textAlign: "start" }}>
              Дни
            </Typography>
            <Input
              type="number"
              placeholder="Day"
              size="lg"
              variant="outlined"
              color="primary"
              value={day}
              onChange={(e) => handleDay(e.target.value)}
              inputProps={{
                min: 0,
                max: 31,
              }}
            />
          </Box>

          <Box sx={{ paddingRight: "10%" }}>
            <Typography variant="h6" sx={{ textAlign: "start" }}>
              Часы
            </Typography>

            <Input
              type="number"
              placeholder="Hour"
              size="lg"
              variant="outlined"
              color="primary"
              value={hour}
              onChange={(e) => handleHour(e.target.value)}
              inputProps={{
                min: 0,
                max: 24,
              }}
            />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ textAlign: "start" }}>
              Минуты
            </Typography>

            <Input
              type="number"
              placeholder="Minute"
              size="lg"
              variant="outlined"
              color="primary"
              value={minute}
              onChange={(e) => handleMinute(e.target.value)}
              inputProps={{
                min: 0,
                max: 60,
              }}
            />
          </Box>
        </Box>
        <Box sx={{ margin: "3% 0" }}>
          <Button sx={{ fontSize: "18px" }} onClick={handleSave}>
            Рассчитать
          </Button>
        </Box>
      </Box>
      {leftTime !== null && (
        <Box
          sx={{
            color: "rgb(55,55,55)",
            marginTop: "5%",
            fontSize: "22px",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Оставшееся время: <br />{" "}
          <p
            className="number"
            style={{
              color: "#00b300",
              textShadow: "0 0 5px #00b300",
              marginTop: "1%",
              fontSize: "64px",
            }}
          >
            {formatTime(leftTime)}
          </p>
        </Box>
      )}
    </Box>
  );
};

export default Main;
