import "./App.css";
import PromptCard from "./Components/PromptCard";

function App() {
  console.log('All Env Variables:', process.env);
  console.log('All Env Variables:', process.env.OPENAI_API);
  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <PromptCard />
    </div>
  );
}

export default App;
