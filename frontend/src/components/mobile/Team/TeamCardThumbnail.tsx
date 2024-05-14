/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import MyDigitalCard from '@components/mobile/MyCard/MyDigitalCard'
import { useQuery } from '@tanstack/react-query'
import { fetchTeamCardsList } from '@/apis/team'
import styled from '@emotion/styled'
import Text from '@/components/shared/Text'

const TeamCardThumbnail: any = ({ teamAlbumId }: { teamAlbumId: any }) => {
  /* 팀 명함 정보*/
  const { data, isLoading } = useQuery({
    queryKey: ['fetchTeamCardsList', teamAlbumId],
    queryFn: () => fetchTeamCardsList(teamAlbumId, 0),
  })

  const dataLength = (num: number) => {
    return data && data.data_body.length > num
  }

  return (
    <div css={TeamCardThumbnailContainer}>
      {!isLoading && data && data.data_body.length ? (
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
      ) : (
        <Text typography="t9">등록된 명함이 없습니다</Text>
      )}
    </div>
  )
}

export default TeamCardThumbnail
const TeamCardThumbnailContainer = css`
  /* 세개의 카드가 겹친 모양 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`

// style

const Thumbnail = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
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
