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