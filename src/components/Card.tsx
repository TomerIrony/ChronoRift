import { Box, Flex, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { CardType } from '../types/card-types';
import { theme } from '@chakra-ui/theme';
import { Button } from '@chakra-ui/button';
import { useSelector } from 'react-redux';
import { uiIsMobleSelector } from '../store/ui/selector';

export enum CardAnswer {
    AFTER,
    BEFORE,
    SAME,
}

interface CardProps {
    card: CardType;
    correctAnswer?: CardAnswer;
    handleAnswerClick?: (isAnswerCorrect: boolean, isSame?: boolean) => void;
    isLeftCard: boolean;
    isPreLoadCard?: boolean;
}

function Card(props: CardProps) {
    const [renderCardAnswer, setRenderCardAnswer] = useState(false);
    const [showContainer, setShowContainer] = useState(false);
    const isMobile = useSelector(uiIsMobleSelector);

    useEffect(() => {
        setShowContainer(false);
        setRenderCardAnswer(false);
    }, [props?.card]);

    useEffect(() => {
        if (renderCardAnswer) {
            const timer = setTimeout(() => {
                setShowContainer(true);
            }, 300); // 0.3s delay
            return () => clearTimeout(timer);
        }
    }, [renderCardAnswer]);

    const { title, image, patch } = props?.card || {}; // Added fallback to an empty object

    const handleAnswerClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        isAnswerCorrect: boolean,
        isSame?: boolean
    ): void => {
        
        setRenderCardAnswer(true);
        if (props?.handleAnswerClick || isSame) {
            
            setTimeout(() => {
                if (isSame) {
                    
                    props.handleAnswerClick && props.handleAnswerClick(true, isSame);
                } else {
                    props.handleAnswerClick && props.handleAnswerClick(isAnswerCorrect);
                }
            }, 300); // 0.3s delay
        }
    };

    const renderLeftCardText = () => (
        <Text fontWeight={'bold'} color={theme.colors.yellow[200]} fontSize={isMobile ? '5xl' : '8xl'}>
            {patch}
        </Text>
    );

    const renderButton = (
        text: string,
        callback?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    ) => (
        <Button
            _hover={{ color: theme.colors.black, backgroundColor: theme.colors.white }}
            color={theme.colors.yellow[200]}
            backgroundColor={'transparent'}
            borderRadius={'50px'}
            padding={'25px'}
            size={'lg'}
            onClick={(e) => {
                if (callback) callback(e);
            }}
            height={'55px'}
            width={'280px'}
            border={`1px solid ${theme.colors.white}`}
        >
            {text}
        </Button>
    );

    const renderRightCardText = () => {
        const renderButtonsContainer = () => (
            <Flex
                marginTop={isMobile ? '20px' : '40px'}
                flexDir="column"
                gap="12px"
                style={{
                    transition: 'opacity 0.3s ease-out',
                    opacity: renderCardAnswer ? 0 : 1,
                    pointerEvents: renderCardAnswer ? 'none' : 'auto',
                }}
            >
                {renderButton('After', (e) => {
                    console.log(props?.correctAnswer, props);
                    
                    return handleAnswerClick(e, props.correctAnswer === CardAnswer.AFTER, props.correctAnswer === CardAnswer.SAME)
                }
                )}
                {renderButton('Before', (e) =>
                    handleAnswerClick(e, props.correctAnswer === CardAnswer.BEFORE, props.correctAnswer === CardAnswer.SAME)
                )}
            </Flex>
        );

        const renderAnswerAppearContainer = () => (
            <Flex
                style={{
                    opacity: showContainer ? 1 : 0,
                    display: showContainer ? 'flex' : 'none',
                    transition: 'opacity 0.3s ease-out',
                }}
                flexDir="column"
                gap="12px"
            >
                <Text color={theme.colors.yellow[100]} fontSize={isMobile ? '5xl' : '8xl'}>
                    {patch}
                </Text>
            </Flex>
        );

        return (
            <Box>
                {renderAnswerAppearContainer()}
                {renderButtonsContainer()}
            </Box>
        );
    };

    const renderText = () => (
        <Flex fontWeight={'bold'} fontSize={'2xl'} flexDir={'column'}>
            <Text>{title ?? 'Unknown Title'}</Text>
            <Text fontSize={'smaller'}>was introduced</Text>
            <Flex justifyContent={'center'}>
                {props.isLeftCard && renderLeftCardText()}
                {!props.isLeftCard && renderRightCardText()}
            </Flex>
        </Flex>
    );

    return (
        <Flex
            justifyContent="center"
            width={isMobile ? '100vw' : '50vw'}
            height={isMobile ? '50vh' : 'auto'}
            position={props?.isPreLoadCard ? 'absolute' : 'relative'}
            opacity={props?.isPreLoadCard ? 0 : 1}
            zIndex={props?.isPreLoadCard ? -1 : 'auto'}
        >
            <div
                style={{
                    backgroundImage: `url(${image ?? ''})`,
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
            <Flex
                style={{
                    position: 'relative',
                    zIndex: 1,
                    color: 'white',
                    marginTop: isMobile ? '5vh' : '30vh',
                }}
            >
                {renderText()}
            </Flex>
        </Flex>
    );
}

export default Card;
