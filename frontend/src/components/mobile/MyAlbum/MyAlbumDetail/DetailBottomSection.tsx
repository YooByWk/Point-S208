/** @jsxImportSource @emotion/react */

import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import { themeState } from '@/stores/common'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionToggleEventHandler,
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
} from '@fluentui/react-components'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useParams } from 'react-router-dom'
import SmallModal from '@/components/shared/SmallModal'
import ShareModal from './shareModal'
import { MailRead48Filled, ArrowCircleDown48Filled, Dismiss24Filled  } from '@fluentui/react-icons'


const DetailBottomSection = () => {
  const theme = useRecoilValue(themeState)
  const [openItems, setOpenItems] = useState(['0'])
  const handleToggle: AccordionToggleEventHandler<string> = (event, data) => {
    setOpenItems(data.openItems)
  }
  const params = useParams()
  console.log(params)

  const [isEmail, setIsEmail] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const handleEmailClick = () => {
      setIsEmail(!isEmail)
  }
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <hr></hr>
      <Spacing size={12} />
      <Flex justify="space-around">
        <Dialog modalType="alert" open={isModalOpen}>
          <DialogTrigger disableButtonEnhancement>
            <div onClick={() => {}}>
              <Button shape="circular" onClick={handleModalOpen}>
                명함 공유
              </Button>
            </div>
          </DialogTrigger>
          <DialogSurface css={surface}>
            <DialogBody css={body}>
              <DialogTitle>{'공유 방법 선택'}</DialogTitle>
              <DialogContent css={content}>
                <Spacing size={20} direction="vertical" />
                {!isEmail?
                  (<Flex direction="row" align="center" justify="center">
                    <DialogActions css={fui}>
                      
                      <div css={dismissCss}>
                        <DialogTrigger disableButtonEnhancement>
                        <Flex direction='column' align='center' justify='center'>
                          <Dismiss24Filled />
                        </Flex>
                        </DialogTrigger>
                      </div>
                      <DialogTrigger disableButtonEnhancement>
                      <Flex direction='column' align='center' justify='center' onClick={handleEmailClick}>
                        <MailRead48Filled />
                        <Text typography='t9'>이메일</Text>
                      </Flex>
                      </DialogTrigger>
                      <DialogTrigger disableButtonEnhancement>
                      <Flex direction='column' align='center' justify='center'>
                      <ArrowCircleDown48Filled />
                      <Text typography='t9'>파일 저장</Text>  
                      </Flex>
                      </DialogTrigger>
                    </DialogActions>
                  </Flex>) : (
                    <Flex direction="row" align="center" justify="center">
                      <DialogActions css={fui}>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="primary" onClick={() => {}}>

                            공유하기
                          </Button>
                        </DialogTrigger>
                        <DialogTrigger disableButtonEnhancement>
                          <Button appearance="secondary" onClick={() => {
                            handleModalOpen()
                            setIsEmail(!isEmail)
                          }}>
                            취소
                          </Button>
                        </DialogTrigger>
                      </DialogActions>
                    </Flex>
                  )
                }
              </DialogContent>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </Flex>
      <Spacing size={10} />
    </>
  )
}

export default DetailBottomSection

const Wrap = styled.div`
  display: flex;
  gap: 30px;
  margin: 0 20px 20px;
`

const Card = styled.div`
  width: 80px;
  height: 80px;
  border: 1px solid ${colors.themeText};
`

const People = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid ${colors.themeText};
  border-radius: 50px;
  margin-bottom: 5px;
`

// css

const containerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: ${colors.themeTextInverted};
  padding: 10px;
`

const itemStyle = (theme: string) => css`
  background-color: ${theme === 'dark' ? '#242424' : '#fafafa'};
  border-radius: 15px;
`

const fui = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`

const dismissCss =css`
  position: absolute;
  right: 0;
  top: 0;

`

const body = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 80vw;
  padding: 0;
  margin: 0;
`

const surface = css`

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 70vw;
`

const content = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  width: 80vw;
  padding: 0;
  margin: 0;
`
