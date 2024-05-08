/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import {
  ShareAndroid16Filled,
  ArrowSwap16Filled,
  Delete16Filled,
  Edit16Filled,
} from '@fluentui/react-icons'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import TextButton from '@shared/TextButton'
import Spacing from '@shared/Spacing'
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components'
import { colors } from '@styles/colorPalette'
import { useMutation } from '@tanstack/react-query'
import { deleteMyCard } from '@apis/card'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { userState } from '@stores/user'
import { isFrontState, isRealState } from '@/stores/card'

const WebTopBar = ({
  isFront,
  setIsFront,
  setIsCard,
  setEditOpen,
}: {
  isFront: boolean
  setIsFront: (isFront: boolean) => void
  setIsCard: (isCard: boolean) => void
  setEditOpen: (isOpen: boolean) => void
}) => {
  const userId = useRecoilValue(userState).userId
  const setFront = useSetRecoilState(isFrontState)
  const [isReal, setIsReal] = useRecoilState(isRealState)

  const { mutate } = useMutation({
    mutationKey: ['deleteMyCard'],
    mutationFn: deleteMyCard,
    onSuccess(result) {
      console.log('삭제 성공', result)
    },
    onError(error) {
      console.error('삭제 실패:', error)
    },
  })

  const handleOnClick = async () => {
    mutate({ userId })
    setIsCard(false)
  }

  return (
    <>
      <Flex justify="space-between">
        <Text typography="t7">내 명함</Text>
        <Flex>
          <TextButton>
            <ShareAndroid16Filled /> 공유
          </TextButton>
          <Spacing size={10} direction="horizontal" />
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <MenuButton shape="circular">
                <Text typography="t7">
                  <ArrowSwap16Filled /> 전환
                </Text>
              </MenuButton>
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    setIsFront(!isFront)
                    setFront(!isFront)
                  }}
                >
                  국/영문 전환
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setIsReal(!isReal)
                  }}
                >
                  디지털/실물 전환
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>

          <Spacing size={10} direction="horizontal" />
          <TextButton
            onClick={() => {
              setEditOpen(true)
            }}
          >
            <Edit16Filled /> 수정
          </TextButton>
          <Spacing size={10} direction="horizontal" />
          <Dialog modalType="alert">
            <DialogTrigger disableButtonEnhancement>
              <Button shape="circular">
                <Text typography="t7">
                  <Delete16Filled /> 삭제
                </Text>
              </Button>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>명함을 삭제하시겠습니까?</DialogTitle>
                <DialogActions>
                  <Button
                    shape="circular"
                    css={buttonStyles}
                    onClick={handleOnClick}
                  >
                    삭제
                  </Button>
                  <DialogTrigger disableButtonEnhancement>
                    <Button shape="circular" css={buttonStyles2}>
                      취소
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
        </Flex>
      </Flex>
    </>
  )
}

export default WebTopBar

const buttonStyles = css`
  background-color: #f00;
  color: white;
`
const buttonStyles2 = css`
  background-color: ${colors.poscoSilver};
  color: white;
`
