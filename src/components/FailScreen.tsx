import { Button } from '@chakra-ui/button';
import { Flex, Text } from '@chakra-ui/layout';
import theme from '@chakra-ui/theme';
import React, { useEffect } from 'react';
import { localStorageService } from '../services/localStorage';

export interface FailScreenType {
    score: number;
    highScore: number; // Added highScore to props
    playAgainCallback: () => void;
}

function FailScreen(props: FailScreenType) {
    const gifs = [
        'https://media.tenor.com/mNSz9VgxKdUAAAAC/youtried-almost.gif',
        'https://media.tenor.com/NjDEFhIuhm4AAAAd/fall-off-lose-balance-fell-on-his-back.gif',
    ];
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    // Save current score to localStorage
    useEffect(() => {
       // localStorageService.saveScoreToLocalStorage(props.score);
    }, [props.score]);

    const playAgainButton = () => {
        return (
            <Button
                _hover={{ color: theme.colors.black, backgroundColor: theme.colors.white }}
                color={theme.colors.yellow[200]}
                backgroundColor={'transparent'}
                borderRadius={'50px'}
                padding={'25px'}
                size={'lg'}
                onClick={props.playAgainCallback}
                height={'55px'}
                width={'280px'}
                border={`1px solid ${theme.colors.white}`}
            >
                Play again
            </Button>
        );
    };

    return (
        <Flex justifyContent="center" alignItems="center" w="100vw" h="100vh">
            <div
                style={{
                    backgroundImage: `url(${gif})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    filter: 'brightness(0.6)',
                }}
            />
            <Flex flexDir={'column'} zIndex={1} color={theme.colors.white} alignItems="center">
                <Text fontSize={'2xl'}>You scored:</Text>
                <Text color={theme.colors.yellow[200]} fontSize={'8xl'}>
                    {props.score}
                </Text>
                <Text fontSize={'2xl'} mt={4}>
                    High Score:
                </Text>
                <Text color={theme.colors.yellow[200]} fontSize={'5xl'}>
                    {props?.score > props.highScore ? props?.score : props?.highScore}
                </Text>
                {playAgainButton()}
            </Flex>
        </Flex>
    );
}

export default FailScreen;
