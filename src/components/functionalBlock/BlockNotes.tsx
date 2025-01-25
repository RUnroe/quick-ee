import ComponentType from "../../types/ComponentType";
import FunctionalBlockType from "../../types/FunctionalBlockType";

interface Props {
  block: FunctionalBlockType
}


const BlockNotes = ({block}: Props) => {
  const getAllNotes = (block: FunctionalBlockType) => {
    let allNotes: string[] = [];

    //Add Impl Notes from top level of functional block object
    if(block?.implNotes?.length) {
      allNotes = allNotes.concat(block.implNotes);
    }

    block?.essentialParts?.forEach((essentialPart: ComponentType) => {
      if(essentialPart?.notes?.length) {
      allNotes = allNotes.concat(essentialPart.notes);
      }
    });
    return allNotes;
  }
  return (  
    <ul>
      {getAllNotes(block).map((note: string, index: number) => (
        <li key={`global-note-${index}`}>{note}</li>
      ))}
    </ul>
  );
}
 
export default BlockNotes;