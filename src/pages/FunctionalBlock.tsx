import Card from "../components/Card";
import functionalBlocks from '../blocks.json';
import { useParams } from "react-router-dom";
import { useState } from "react";
import BlockComponentsTable from "../components/functionalBlock/BlockComponentsTable";
import FunctionalBlockType from "../types/FunctionalBlockType";
import BlockNotes from "../components/functionalBlock/BlockNotes";


const FunctionalBlock = () => {
  const {blockId} = useParams();
  console.log(functionalBlocks, parseInt(blockId || ''));

  const [block] = useState<FunctionalBlockType>(functionalBlocks.blocks?.[parseInt(blockId || '')]);
 
  return (
    <main className="page" id="functionalBlock">
      {!block ? <h1>Functional Block Not Found</h1> : 
      <>
        <div className="top-bar">
          <h1>{block.name}</h1>
        </div>
        
        <section className="grid">
          <Card>
            <h2>Components</h2>
            <BlockComponentsTable block={block} />
          </Card>
          <section className="column">
            <Card>
              <h2>Image</h2>
            </Card>
            <Card>
              <h2>Notes</h2>
              <BlockNotes block={block} />
            </Card>
          </section>
        </section>
      </>
      }
    </main>
  );
}
 
export default FunctionalBlock;