import { Box, Flex } from '@chakra-ui/layout';
import { theme } from '@chakra-ui/theme';
import React, { useEffect, useState } from 'react';
import { localStorageService } from '../services/localStorage';

interface ScoresType {
    score?: number;

}

function Scores(props: ScoresType) {
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        const highscoreFromStorage = localStorageService.getHighScoreFromLocalStorage();
        setHighScore(highscoreFromStorage)
    }, [])

    return (
        <Flex fontWeight={'bold'} w={'90%'}
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
         color={theme.colors.white} zIndex={5} bottom={'1em'} position={'absolute'} justifyContent={'space-between'} alignItems={'center'}>
            <Box>
            {`High Score: ${highScore ?? 0}`}
            </Box>
            <Box>
                {`Score: ${props?.score ?? 0}`}
            </Box>
        </Flex>

    );
}

export default Scores;