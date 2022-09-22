import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Counter from './Counter';
import Button from '@mui/material/Button';
import useStateHook from './usestateHook';
import Stack from '@mui/material/Stack';
import { saveData } from './Firebasefunctions';

function Round({ data, setData, restartGame }) {
    const [team1countertotal, setTeam1countertotal] = useState(0);
    const [team2countertotal, setTeam2countertotal] = useState(0);
    const [handpoints1, changeHandpoints1, reseteHandpoints1, setHandpoints1] = useStateHook(0);
    const [handpoints2, changeHandpoints2, reseteHandpoints2, setHandpoints2] = useStateHook(0);
    const [winTeam, setWinTeam] = useState({ isWin: false, team: '' });
    const [numberOfWins, setNumberOfWins] = useState([0, 0]);
    const [finalWinner, setFinalWinner] = useState({ isWin: false, team: '' });

    const addHand = () => {
        setTeam1countertotal(team1countertotal + parseInt(handpoints1));
        setTeam2countertotal(team2countertotal + parseInt(handpoints2));

        reseteHandpoints1();
        reseteHandpoints2();
    };

    const addRound = () => {
        if (winTeam.team === data.team1name) {
            setNumberOfWins([numberOfWins[0] + 1, numberOfWins[1]]);
        } else if (winTeam.team === data.team2name) {
            setNumberOfWins([numberOfWins[0], numberOfWins[1] + 1]);
        }

        setTeam1countertotal(0);
        setTeam2countertotal(0);

        setWinTeam({ isWin: false, team: '' });
    };

    useEffect(() => {
        if (team1countertotal >= 101) {
            setWinTeam({ isWin: true, team: data.team1name });
        } else if (team2countertotal >= 101) {
            setWinTeam({ isWin: true, team: data.team2name });
        }
    }, [team1countertotal, team2countertotal]);

    const onSaveData = (winner) => {
        const podaci = {
            team1name: data.team1name,
            team2name: data.team2name,
            numberOfWins: data.numberofwins,
            finalWinner: winner,
            team1score: numberOfWins[0],
            team2score: numberOfWins[1],
        };

        saveData(podaci);
    };

    useEffect(() => {
        if (numberOfWins[0] >= data.numberofwins) {
            setFinalWinner({ isWin: true, team: data.team1name });

            onSaveData(data.team1name);
        } else if (numberOfWins[1] >= data.numberofwins) {
            setFinalWinner({ isWin: true, team: data.team2name });
            onSaveData(data.team2name);
        }
    }, [numberOfWins]);

    return (
        <div>
            <div>
                <Stack spacing={2}>
                    <h1>Tablic</h1>
                    <h1>Needed number of wins: {data.numberofwins}</h1>
                    <h3>
                        Team 1: {numberOfWins[0]} vs Team 2: {numberOfWins[1]}
                    </h3>
                </Stack>
            </div>

            {finalWinner.isWin ? (
                <>
                    <h1>Winning team is: {finalWinner.team}</h1>
                    <Button variant="contained" color="error" onClick={restartGame}>
                        New game?
                    </Button>
                </>
            ) : (
                <>
                    <Stack spacing={2} direction="row">
                        {winTeam.isWin ? (
                            <Button variant="contained" color="error" onClick={addRound}>
                                Add a round
                            </Button>
                        ) : (
                            <Button variant="contained" color="error" onClick={addHand}>
                                Add a hand
                            </Button>
                        )}
                    </Stack>
                    <TextField
                        id="outlined-basic"
                        type="number"
                        variant="outlined"
                        inputProps={{ min: 0, max: 25 }}
                        value={handpoints1}
                        onChange={changeHandpoints1}
                    />
                    <TextField
                        id="outlined-basic"
                        type="number"
                        variant="outlined"
                        inputProps={{ min: 0, max: 25 }}
                        value={handpoints2}
                        onChange={changeHandpoints2}
                    />

                    <div>
                        <h3>Total</h3>
                        <Stack spacing={2} direction="row">
                            <Counter teamName={data.team1name} setCounterTotal={setTeam1countertotal} total={team1countertotal} />
                            {/* <div style={{ display: 'inline-block', borderLeft: '2px solid black', height: '100px' }} /> */}

                            <Counter teamName={data.team2name} setCounterTotal={setTeam2countertotal} total={team2countertotal} />
                        </Stack>
                        {winTeam.isWin ? <h1>Team {winTeam.team} wins the round</h1> : <></>}
                    </div>
                </>
            )}
        </div>
    );
}

export default Round;
