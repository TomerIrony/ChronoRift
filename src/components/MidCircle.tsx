import { Box, Flex } from '@chakra-ui/layout';
import theme from '@chakra-ui/theme';
import React, { useEffect, useState } from 'react';
import { GameStatus } from '../types/game-status-types';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import { TiEquals } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { uiIsMobleSelector } from '../store/ui/selector';

interface MidCircleProps {
    status: GameStatus
}

function MidCircle(props: MidCircleProps) {

    const [startAnimation, setStartAnimation] = useState(false);
    const isMobile = useSelector(uiIsMobleSelector);

    useEffect(() => {
        if(props?.status === GameStatus.FAIL){
            setStartAnimation(true);
        }
        if(props?.status === GameStatus.SUCCESS){
            setStartAnimation(true);
        }
        if(props?.status === GameStatus.SAME){
            setStartAnimation(true);
        }
        if(props?.status === GameStatus.VS){
            setStartAnimation(false)
        }

    }, [props?.status])


    const renderContent = () : JSX.Element | "VS" | undefined => {
        if(props?.status === GameStatus.VS){
            return ( <Box fontSize={'3xl'} fontWeight={'bold'}>
            VS
            </Box>)
        }
        if(props?.status === GameStatus.FAIL){
            return <CloseIcon
            style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                transform: startAnimation ? 'translateY(0) scale(1.5)' : 'translateY(50%) scale(1)',
                opacity: startAnimation ? 1 : 0,
              }}
              color={theme.colors.red[500]}/>
        }
        if(props?.status === GameStatus.SUCCESS){
            return <CheckIcon
            style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                transform: startAnimation ? 'translateY(0) scale(1.5)' : 'translateY(50%) scale(1)',
                opacity: startAnimation ? 1 : 0,
              }}
              color={theme.colors.green[500]}/>
        }

        if(props?.status === GameStatus.SAME){
            return <TiEquals
            style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                transform: startAnimation ? 'translateY(0) scale(1.5)' : 'translateY(50%) scale(1)',
                opacity: startAnimation ? 1 : 0,
              }}
              color={theme.colors.green[500]}/>
        }
    }

    return (
        <Flex
        zIndex={1}
        justifyContent={'center'}
        alignItems={'center'} 
         position={'absolute'}
         w={isMobile ? '75px' :'100px'}
         h={isMobile ? '75px' :'100px'}
         color={theme.colors.black}
         backgroundColor={theme.colors.white}
         top="50%"
         left="50%"
         transform="translate(-50%, -50%)"
         borderRadius={'50%'}>
            {renderContent()}
          </Flex>
      )
}

export default MidCircle;