import "./App.css";
import Frame from "./components/Frame";
function App() {
  return (
    <div
      className="bg-cover relative absolute h-screen flex items-center justify-center"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <Frame />
      <div className=" absolute right-0 top-0 h-screen">
        <img src="/images/right-img.png" alt="" className=" h-full" />
      </div>
    </div>
  );
}
export default App;
