/** @jsxImportSource @emotion/react */

import Text from '@shared/Text'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@/stores/user'
import Dimmed from '@/components/shared/Dimmed'
import Flex from '@/components/shared/Flex'
import { css } from '@emotion/react'
import { tokens } from '@fluentui/react-components'

import {
  CameraAdd48Regular,
  SlideTextPerson48Regular,
  Dismiss24Regular,
  Image48Regular,
} from '@fluentui/react-icons'
import Spacing from '@/components/shared/Spacing'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cameraState } from '@/stores/emptyCard'
import { isAddCardByInfoState } from '@/stores/album'
interface AddCardProps {
  isAddCard: boolean
  setIsAddCard: (isAddCard: boolean) => void
}

const WebAddCard = ({ isAddCard, setIsAddCard }: AddCardProps) => {
  const userId = useRecoilValue(userState).userId
  const setIsAddCardByInfo = useSetRecoilState(isAddCardByInfoState)

  const handleClose = () => {
    setIsAddCard(!isAddCard) // 닫기
  }

  const handleDirectInput = () => {
    console.log('직접 입력 클릭')
    setIsAddCard(!isAddCard) // 닫기
    setIsAddCardByInfo(true)
  }

  const handleImageInput = () => {
    console.log('이미지 등록 클릭')
  }

  return (
    <>
      <Dimmed>
        <Flex
          direction="column"
          justify="center"
          align="center"
          css={container}
        >
          <div className="in">
            <Dismiss24Regular
              className="X"
              onClick={handleClose}
              style={{ cursor: 'pointer' }}
            />
            <Text>명함 등록 방식</Text>
            <Spacing size={20} direction="vertical" />
            <Flex direction="row" justify="space-around" align="center">
              <Flex
                direction="column"
                justify="center"
                align="center"
                onClick={handleImageInput}
                style={{ cursor: 'pointer' }}
              >
                <Image48Regular />
                <Text typography="t7">이미지 등록</Text>
              </Flex>

              <Spacing size={20} direction="horizontal" />
              <Flex
                direction="column"
                justify="center"
                align="center"
                onClick={handleDirectInput}
                style={{ cursor: 'pointer' }}
              >
                <SlideTextPerson48Regular />
                <Text typography="t7">직접 입력</Text>
              </Flex>
            </Flex>
          </div>
        </Flex>
      </Dimmed>
    </>
  )
}

export default WebAddCard

const container = css`
  height: 100%;
  .in {
    position: relative;
    background-color: ${tokens.colorNeutralBackground1};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 300px;
    text-align: center;
  }
  .X {
    position: absolute;
    right: 10px;
  }
`
