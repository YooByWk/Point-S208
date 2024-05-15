export type FilterType = {
  filterId : number;
  filterName : string;
}

export type FilterListType = FilterType[]


export type FilterNameState = {
  [filterId: number]: string
}

export type FilterNameAction = {
  type: 'SET_NAME'
  filterId: number
  name: string
}

export type EditFilterArgs = {
  userId: number;
  filterId: number;
  filterName: string;
};

export type ReadDeletefilterType = {
  userId: number | undefined
  filterId: number | undefined
} 
export type UpdatefilterType = {
  userId: number | undefined
  filterId: number | undefined
  filterName: string | undefined
}

export type CreateFilterType = {
  userId: number | undefined
  filterName: string | undefined
}

export type editTeamFilterType ={
  userId : number
  filterId : number
  filterName : string 
  teamAlbumId : number
}