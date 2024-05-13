/** @jsxImportSource @emotion/react */
import { fetchTeamCardsList } from '@/apis/team'
import MyDigitalCard from '@/components/mobile/MyCard/MyDigitalCard'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { TeamListType } from '@/types/TeamListType'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'

const WebTeamCard = (props: { item: TeamListType }) => {
  const { item } = props

  const { data, isLoading } = useQuery({
    queryKey: ['fetchTeamCardsList', item.teamAlbumId],
    queryFn: () => fetchTeamCardsList(item.teamAlbumId, 0),
  })

  const dataLength = (num: number) => {
    return data && data.data_body.length > num
  }

  return (
    <>
      {!isLoading && (
        <>
          <Thumbnail>
            {dataLength(1) ? (
              <>
                <Third>
                  {dataLength(2) && (
                    <MyDigitalCard
                      cardInfo={data.data_body[2]}
                      scale={1}
                      border={true}
                    />
                  )}
                </Third>
                <Second>
                  {dataLength(1) && (
                    <MyDigitalCard
                      cardInfo={data.data_body[1]}
                      scale={1}
                      border={true}
                    />
                  )}
                </Second>
                <First>
                  {dataLength(0) && (
                    <MyDigitalCard
                      cardInfo={data.data_body[0]}
                      scale={1}
                      border={true}
                    />
                  )}
                </First>
              </>
            ) : (
              <Second>
                {dataLength(0) && (
                  <MyDigitalCard
                    cardInfo={data.data_body[0]}
                    scale={1}
                    border={true}
                  />
                )}
              </Second>
            )}
          </Thumbnail>
          <Flex direction="column" align="end">
            <Text typography="t4" bold={true}>
              {item.teamName}
            </Text>
            <Text typography="t6">{item.teamSize}명</Text>
            <Text typography="t8">{item.cardSize}개의 명함</Text>
          </Flex>
        </>
      )}
    </>
  )
}

export default WebTeamCard

// style

const Thumbnail = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
`

const First = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: left bottom;
  bottom: 0;
`

const Second = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: center;
  translate: -50% -50%;
  top: 50%;
  left: 50%;
`

const Third = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: top right;
  right: 0;
`
