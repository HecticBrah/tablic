import { TextField } from '@mui/material';
import React, { useState } from 'react';
import Round from './Round';
import Button from '@mui/material/Button';
import useStateHook from './usestateHook';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

function Game() {
    const [isTeamsNamed, setTeamsNamed] = useState(false);
    const [teamName1, changeTeamName1, resetTeamName1, setTeamName1] = useStateHook('');
    const [teamName2, changeTeamName2, resetTeamName2, setTeamName2] = useStateHook('');
    const [numberOfWins, changeNumberOfWins, reseteNumberOfWins, setNumberOfWins] = useStateHook('');

    const [data, setData] = useState({});

    const restartGame = () => {
        setTeamsNamed(false);
        resetTeamName1('');
        resetTeamName2('');
        reseteNumberOfWins('');
    };

    const onNewGame = () => {
        if (teamName1.trim() > '' && teamName2.trim() > '') {
            setData({ team1name: teamName1, team2name: teamName2, numberofwins: numberOfWins });
            setTeamsNamed(true);
        }
    };

    return (
        <div>
            <Grid container display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                {isTeamsNamed ? (
                    <>
                        <Round data={data} setData={setData} restartGame={restartGame} />
                    </>
                ) : (
                    <>
                        <Stack spacing={2}>
                            <h1>Tablic</h1>
                            <TextField
                                id="outlined-basic"
                                label="Team #1 name"
                                variant="outlined"
                                value={teamName1}
                                required
                                onChange={changeTeamName1}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Team #2 name"
                                variant="outlined"
                                value={teamName2}
                                required
                                onChange={changeTeamName2}
                            />

                            <TextField
                                id="outlined-basic"
                                label="Number of wins"
                                variant="outlined"
                                type="number"
                                required
                                inputProps={{ min: 1 }}
                                value={numberOfWins}
                                onChange={changeNumberOfWins}
                            />
                            <Button variant="contained" color="error" onClick={onNewGame}>
                                Confirm teams
                            </Button>
                        </Stack>
                    </>
                )}
            </Grid>
        </div>
    );
}

export default Game;
