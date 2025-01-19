import Card from "../components/Card";

const Home = () => {
  return (
    <main className="page" id="home">
      <h1>Home Page</h1>

      <Card>
        <h2>Card content</h2>
        <p>This is a paragraph in the card</p>
      </Card>
    </main>
  );
}
 
export default Home;