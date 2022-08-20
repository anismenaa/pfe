export interface bonSortieData {
  bonSortieId: string,
  departementId: string,
  date_sortie: Date,
  finalised: boolean,
  finalisedBy: string,
  items: itemBsData[]
}

export interface itemBsData {
  name: string,
  quantity: number,
}