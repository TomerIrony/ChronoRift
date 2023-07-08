import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Flex,
} from "@chakra-ui/react"
import Card, { CardAnswer } from "./components/Card"
import { useEffect, useState } from "react"
import { CardType } from "./types/card-types"
import MidCircle from "./components/MidCircle"
import { GameStatus } from "./types/game-status-types"
import { Screens } from "./types/screen-types"
import FailScreen from "./components/FailScreen"
import Scores from "./components/Scores"
import jsonData from './data.json'
import useMobileDetection from "./hooks/useMobileDetection"
import { useDispatch } from 'react-redux';




export const App = () =>{ 
const initCards : CardType[] = jsonData

  const [streak, setStreak] = useState(0);
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [leftCard,setLeftCard] = useState<CardType | undefined>();
  const [rightCard,setRightCard] = useState<CardType | undefined>();
  const [preLoadNextCard,setPreLoadNextCard] = useState<CardType | undefined>();
  const [gameStatus, setGameStatus] = useState(GameStatus.VS);
  const [currentScreenToDisplay, setCurrentScreenToDisplay] = useState<Screens>(Screens.GAME)
  const isMobile = useMobileDetection();

  useEffect(() => {
    setAllCards(shuffleArray(initCards))
  }, [initCards])

  useEffect(() => {
    setLeftCard(allCards[streak]);
    setRightCard(allCards[streak + 1]);
    setPreLoadNextCard(allCards[streak + 2])
  }, [streak, allCards]);

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
  
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Swap current element with randomly selected element
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }
  
    return shuffledArray;
  }


  const handleClickPlayAgain = () => {
    setStreak(0);
    setGameStatus(GameStatus.VS);
    setCurrentScreenToDisplay(Screens.GAME);
    setAllCards(shuffleArray(initCards))
  }

  const handleAnswerClick = (isAnswerCorrect: boolean, isSame?: boolean) => {
    if(isSame){
      setGameStatus(GameStatus.SAME);
      setTimeout(() => {
        setStreak((prev) => prev + 1);
        setGameStatus(GameStatus.VS)
      }, 1500);
      return
    }
    if(isAnswerCorrect){
      setGameStatus(GameStatus.SUCCESS);
      setTimeout(() => {
        setStreak((prev) => prev + 1);
        setGameStatus(GameStatus.VS)
      }, 1500);
    }
    else {
      setGameStatus(GameStatus.FAIL);
      setTimeout(() => {
        setCurrentScreenToDisplay(Screens.FAIL)
      }, 1500);
    }
  }

  

  const renderCardHolder = () => {
      let correctAnswer = CardAnswer.AFTER;
      if(!!leftCard?.date && !!rightCard?.date){
        const leftCardDate = new Date(leftCard?.date); 
        const rightCardDate = new Date(rightCard?.date);

  
        if(leftCardDate > rightCardDate){
          correctAnswer = CardAnswer.BEFORE
        }
        if(leftCardDate?.toISOString() === rightCardDate?.toISOString()){
        
          correctAnswer = CardAnswer.SAME
        }
      }
      
    return (
      <Flex position={'relative'} flexDir={isMobile ? 'column' : 'row'} w='100vw'>
        <Scores score={streak}/>
        {!!leftCard && <Card isLeftCard={true} card={leftCard}/>}
        <MidCircle status={gameStatus}/>
        {!!rightCard && 
        <Card isLeftCard={false} card={rightCard} correctAnswer={correctAnswer} handleAnswerClick={handleAnswerClick}/>}
        {!!preLoadNextCard &&
         <Card isLeftCard={false} card={preLoadNextCard} isPreLoadCard={true}/>}
      </Flex>
    )
  }

  const currentContentToRender = {
    [Screens.GAME]: renderCardHolder(),
    [Screens.FAIL]: <FailScreen score={streak} playAgainCallback={handleClickPlayAgain}/>
  }

  return (  <ChakraProvider theme={theme}>
      <Flex textAlign="center" fontSize="xl" minH="100vh" >
        {currentContentToRender[currentScreenToDisplay]}
      </Flex>
  </ChakraProvider>
)}
