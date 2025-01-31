import Card from "../components/Card";
import functionalBlocks from '../blocks.json';
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import BlockComponentsTable from "../components/functionalBlock/BlockComponentsTable";
import FunctionalBlockType from "../types/FunctionalBlockType";
import BlockNotes from "../components/functionalBlock/BlockNotes";
import { LeftChevronIcon } from "../assets/icons/icons";
import { Slide, ToastContainer, toast } from 'react-toastify';


const FunctionalBlock = () => {
  const {blockId} = useParams();
  console.log(functionalBlocks, parseInt(blockId || ''));

  const [block] = useState<FunctionalBlockType>(functionalBlocks.blocks?.[parseInt(blockId || '')]);
 

  const copySchematicToClipboard = () => {
    if(block && block.schematicUrl) {
      navigator.clipboard.writeText(block.schematicUrl);
      //Let user know the copy was successful
      toast.success("Copied!");
    }
   
  }


  return (
    <main className="page" id="functionalBlock">
      {!block ? <h1>Functional Block Not Found</h1> : 
      <>
        <ToastContainer autoClose={1500} theme="colored" position="top-center" transition={Slide}/>
        <section className="top-bar">
          <div className="row">
            <h1>{block.name}</h1>
            <button
              className="button primary"
              onClick={copySchematicToClipboard}
              disabled={!block?.schematicUrl}
              title={block?.schematicUrl ? "Copy Schematic URL to Clipboard" : "Schematic URL Not Found"}
            > 
              Copy to Clipboard
            </button>
          </div>
          <Link 
            to={`/`}
            className="flex align-center fit-content"
          > 
            <LeftChevronIcon className="primary"/>
            Back to List View
          </Link>
        </section>
        
        <section className="grid">
          <Card>
            <h2>Components</h2>
            <BlockComponentsTable block={block} />
          </Card>
          <section className="column">
            <Card>
              <h2>*Image*</h2>
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