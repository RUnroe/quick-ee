import Card from "../components/Card";
import functionalBlocks from '../blocks.json';
import { useParams } from "react-router-dom";
import { useState } from "react";
import BlockComponentsTable from "../components/functionalBlock/BlockComponentsTable";
import FunctionalBlockType from "../types/FunctionalBlockType";


const FunctionalBlock = () => {
  const {blockId} = useParams();
  console.log(functionalBlocks, parseInt(blockId || ''));

  const [block] = useState<FunctionalBlockType>(functionalBlocks.blocks?.[parseInt(blockId || '')]);
  console.log(block)
 
  return (
    <main className="page" id="functionalBlock">
      {!block ? <h1>Functional Block Not Found</h1> : 
      <>
        <h1>{block.name}</h1>

        <Card>
          <h2>Components</h2>
          <BlockComponentsTable block={block} />
        </Card>
        <Card>
          <h2>Image</h2>
        </Card>
        <Card>
          <h2>Notes</h2>
        </Card>
      </>
      }
    </main>
  );
}
 
export default FunctionalBlock;