export default interface ComponentType {
  type?: string,
  genericDescription?: string,
  cost?: number,
  value?: string,
  tolerance?: string,
  footprints?: string[],
  suggestedPns?: string[],
  datasheetUrls?: string[],
  purchaseUrls?: string[],
  notes?: string[],
}