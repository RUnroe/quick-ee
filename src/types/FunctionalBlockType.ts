import ComponentType from "./ComponentType";

export default interface FunctionalBlockType {
  _id?: string;
  name: string;
  schematicUrl?: string;
  layoutUrl?: string;
  implNotes?: string[];
  essentialParts?: ComponentType[];
  passives?: ComponentType[];
  powerOptions?: any[];
}


export interface DisplayFunctionalBlockType extends FunctionalBlockType {
  totalCost?: number,
  componentCount?: number,
}