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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components'

const WebTopBar = ({
  isFront,
  setIsFront,
}: {
  isFront: boolean
  setIsFront: (isFront: boolean) => void
}) => {
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
                <MenuItem onClick={() => setIsFront(!isFront)}>
                  국/영문 전환
                </MenuItem>
                <MenuItem>디지털/실물 전환</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>

          <Spacing size={10} direction="horizontal" />
          <TextButton>
            <Edit16Filled /> 수정
          </TextButton>
          <Spacing size={10} direction="horizontal" />
          <TextButton>
            <Delete16Filled /> 삭제
          </TextButton>
        </Flex>
      </Flex>
    </>
  )
}

export default WebTopBar
