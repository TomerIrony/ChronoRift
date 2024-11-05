import { useMediaQuery, Flex, ChakraProvider, theme } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import Card, { CardAnswer } from "../components/Card"
import FailScreen from "../components/FailScreen"
import MidCircle from "../components/MidCircle"
import Scores from "../components/Scores"
import useMobileDetection from "../hooks/useMobileDetection"
import { CardType } from "../types/card-types"
import { GameStatus } from "../types/game-status-types"
import { Screens } from "../types/screen-types"
import jsonData from '../data.json'
import { gradientAnimation } from "../animations/gradientAnimation"


export const Game = () => {
  const initCards: CardType[] = jsonData

  // Main State
  const [streak, setStreak] = useState(0)
  const [allCards, setAllCards] = useState<CardType[]>([])
  const [leftCard, setLeftCard] = useState<CardType | undefined>()
  const [rightCard, setRightCard] = useState<CardType | undefined>()
  const [gameStatus, setGameStatus] = useState(GameStatus.VS)
  const [currentScreenToDisplay, setCurrentScreenToDisplay] = useState<Screens>(Screens.GAME)
  const isMobile = useMobileDetection()
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)")
  const [isAnimating, setIsAnimating] = useState(false);

  // Preload Images and Initialize Cards
  useEffect(() => {
    const shuffledCards = shuffleArray(initCards)

    // Preload images and only set the cards that successfully load
    const preloadImages = async () => {
      const loadedCards = await Promise.all(
        shuffledCards.map((card) => preloadImage(card))
      )
      const validCards = loadedCards.filter((card): card is CardType => card !== null)
      setAllCards(validCards)
      setLeftCard(validCards[0])
      setRightCard(validCards[1])
    }

    preloadImages()
  }, [initCards])

  // Save High Score
  useEffect(() => {
    const savedHighScore = parseInt(localStorage.getItem("highScore") || "0")
    if (streak > savedHighScore) {
      localStorage.setItem("highScore", streak.toString())
    }
  }, [streak])

  // Preload the next two images when `streak` changes
  useEffect(() => {
    const preloadNextImages = () => {
      const nextImages = [allCards[streak + 2], allCards[streak + 3]]
      nextImages.forEach((card) => {
        if (card?.image) {
          const img = new Image()
          img.src = card.image
        }
      })
    }
    preloadNextImages()
  }, [streak, allCards])

  // Image Preload Function
  const preloadImage = (card: CardType): Promise<CardType | null> => {
    return new Promise((resolve) => {
      if (!card.image) {
        resolve(null); // Resolve with null if image is undefined
        return;
      }
      
      const img = new Image();
      img.src = card.image;
      img.onload = () => resolve(card); // Return the card if image loads
      img.onerror = () => resolve(null); // Return null if image fails to load
    });
  }

  // Shuffle Array Function
  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array]
    let currentIndex = shuffledArray.length
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ]
    }
    return shuffledArray
  }

  // Play Again Handler
  const handleClickPlayAgain = () => {
    setStreak(0)
    setGameStatus(GameStatus.VS)
    setCurrentScreenToDisplay(Screens.GAME)
    const shuffledCards = shuffleArray(initCards)
    setAllCards(shuffledCards)
    setLeftCard(shuffledCards[0])
    setRightCard(shuffledCards[1])
  }

  // Answer Click Handler with Correct Answer Logic
  const handleAnswerClick = (isAnswerCorrect: boolean, isSame?: boolean) => {
    if (isSame) {
      setGameStatus(GameStatus.SAME)
      setIsAnimating(true); // Start the animation
      setTimeout(() => {
        setGameStatus(GameStatus.VS)
        setStreak((prev) => prev + 1)
        updateCardsForNextRound(streak + 1)
        setIsAnimating(false); // Reset the animation
      }, 1500)
      return
    }
    if (isAnswerCorrect) {
      setGameStatus(GameStatus.SUCCESS)
      setIsAnimating(true); // Start the animation
      setTimeout(() => {
        setGameStatus(GameStatus.VS)
        setStreak((prev) => prev + 1)
        updateCardsForNextRound(streak + 1)
        setIsAnimating(false); // Reset the animation
      }, 1500)
    } else {
      setGameStatus(GameStatus.FAIL)
      setTimeout(() => {
        setCurrentScreenToDisplay(Screens.FAIL)
      }, 1500)
    }
  }
  
  // Update Cards for the Next Round
  const updateCardsForNextRound = (nextStreak: number) => {
    if (nextStreak < allCards.length - 1) {
      // Normal case: update left and right cards with the next pair
      setLeftCard(rightCard)
      setRightCard(allCards[nextStreak + 1])
    } else if (nextStreak === allCards.length - 1) {
      // Last card: keep the current right card as the last one and set leftCard
      setLeftCard(rightCard)
      setRightCard(undefined) // No more right cards to compare
    } else {
      // If we reach here, it means we are past the last card
      setGameStatus(GameStatus.FAIL) // Or display a "Congratulations" screen
      setCurrentScreenToDisplay(Screens.FAIL)
    }
  }
  

  // Determine Correct Answer
  const getCorrectAnswer = () => {
    
    if (leftCard?.date && rightCard?.date) {
      const leftCardDate = new Date(leftCard.date)
      const rightCardDate = new Date(rightCard.date)
      
      if (leftCardDate > rightCardDate) {
        
        return CardAnswer.BEFORE
      }
      if (leftCardDate.toISOString() === rightCardDate.toISOString()) return CardAnswer.SAME
      return CardAnswer.AFTER
    }
    return CardAnswer.AFTER
  }

  // Card Holder Renderer
  const renderCardHolder = () => {
    return (
      <Flex position={'relative'} flexDir={isMobile || isSmallScreen ? 'column' : 'row'} w='100vw'>
        <Scores score={streak} />
        {leftCard && (
          <Flex
            as={Card}
            isLeftCard={true}
            card={leftCard}
            className={isAnimating ? "slideLeft" : ""}
            style={{
              animation: isAnimating ? "slideLeft 0.5s ease-out forwards" : "none",
              position: 'absolute',
            }}
          />
        )}
        <MidCircle status={gameStatus} />
        {rightCard && (
          <Flex
            as={Card}
            isLeftCard={false}
            card={rightCard}
            correctAnswer={getCorrectAnswer()}
            handleAnswerClick={handleAnswerClick}
            className={isAnimating ? "slideInFromRight" : ""}
            style={{
              animation: isAnimating ? "slideInFromRight 0.5s ease-out forwards" : "none",
              position: 'absolute',
            }}
          />
        )}
      </Flex>
    )
  }
  

  // Fail Screen Renderer with High Score Check
  const currentContentToRender = {
    [Screens.GAME]: renderCardHolder(),
    [Screens.FAIL]: (
      <FailScreen
        score={streak}
        highScore={parseInt(localStorage.getItem("highScore") || "0")}
        playAgainCallback={handleClickPlayAgain}
      />
    ),
  }

  return (
      <Flex textAlign="center" fontSize="xl"
      bgGradient="linear(to-br, #f2994a, #d8345f, #4a1a73, #20284a)"
      minH="100vh"
      bgSize="200% 200%"  
      animation={`${gradientAnimation} 8s ease infinite`}  >
        {currentContentToRender[currentScreenToDisplay]}
      </Flex>
  )
}
