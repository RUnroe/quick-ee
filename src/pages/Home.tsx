import Card from "../components/Card";
import FunctionalBlocksTable from "../components/functionalBlockList/FunctionalBlocksTable";
import functionalBlocks from '../blocks.json';

const Home = () => {
  return (
    <main className="page" id="home">
      <section className="top-bar">
        <h1>Functional Blocks</h1>
      </section>
      
      <section className="grid">
        <div>
          <h2>*Sort / Filter*</h2>
        </div>

        <Card>
          <FunctionalBlocksTable blocks={functionalBlocks.blocks} />
        </Card>
      </section>
    </main>
  );
}
 
export default Home;