/** @jsxImportSource @emotion/react */

import { UserType } from "@/types/userType";
import Text from '@shared/Text'
import Flex from '@/components/shared/Flex'
import { css } from "@emotion/react";
import { tokens } from "@fluentui/react-components";
import Spacing from "@/components/shared/Spacing";
import {  
  CheckmarkCircle24Regular,
  Circle24Regular,
  Dismiss24Filled
} from '@fluentui/react-icons'

interface MemberThumbnailProps {
  user: UserType 
  // setSelectedMember: React.Dispatch<React.SetStateAction<UserType[] >>;
  onClick?: (e:any) => void;
  isSelected: boolean;
  onIconClick? : (e:any) => void;
}

const MemberThumbnail = ({user,  onClick,isSelected,onIconClick} : MemberThumbnailProps) => {

  console.log(isSelected,user.userId)
  
  if(!user) return null
  return (
    <div onClick={onClick} css={mainContCss}>
      <Flex direction="column" justify="center" align="" css={cont} >
        <Flex direction="column" justify="center" align="flex-start" >
          <Text typography="t6" textAlign="left" className="nameCss">{user.name}</Text>
          <Text typography="t8" textAlign="left">{user.email}</Text>
        </Flex>
      </Flex>
      <div onClick={onIconClick} css={iconCss}>{isSelected? <CheckmarkCircle24Regular/> : <Circle24Regular/>}</div>
      </div>
  );
};

export default MemberThumbnail;

const mainContCss = css`
  width: 100%;
  position: relative;
`
const iconCss = css`
  position: absolute;
  top: 0;
  right: 0;
`

const cont = css`
  background-color: ${tokens.colorNeutralBackground1Hover};
  border-radius: 15px;
  padding: 10px;
  width: 100%;
  margin-bottom:3%;
  .nameCss {
    width: 50%;
  }
`