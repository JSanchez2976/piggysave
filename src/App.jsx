import SliceA from "./pages/OnBoarding/Slice"
import { AppRouter } from "./routes/AppRouter"
import piggyFirstSlice from "./assets/piggyFirstSlice.png"

function App() {
  return (
    <>
      {/*<AppRouter />*/}
      <SliceA text={"Welcome to PiggySave"} />
    </>
  )
}

export default App