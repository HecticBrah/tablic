import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';

function Counter({ teamName, setCounterTotal, total }) {
    const increment = () => {
        setCounterTotal(total + 1);
    };

    const decrement = () => {
        if (total > 0) {
            setCounterTotal(total - 1);
        }
    };

    return (
        <div style={{ display: 'inline-block' }}>
            <h3>{total}</h3>

            <Button onClick={increment} color="success">
                <AddIcon sx={{ fontSize: 20 }} />
            </Button>
            <Button onClick={decrement} color="error">
                <RemoveIcon sx={{ fontSize: 20 }} />
            </Button>

            <h3>Team {teamName}</h3>
        </div>
    );
}

export default Counter;
