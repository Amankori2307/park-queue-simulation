import { useEffect, useRef, useState } from 'react';
import './App.css';
import Counter from './components/Counter';
import Table from './components/Table';
const MAX = 10;


function App() {
  const [list, setList] = useState([]);
  const [queue, setQueue] = useState([]);
  const randomId = useRef(10101129);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current++;
  })

  useEffect(() => {
    const addPeopleEvent = new Event("addPeople");
    const checkTicketEvent = new Event("checkTicket");

    const addPeopleInterval = setInterval(() => {
      document.dispatchEvent(addPeopleEvent);
    }, 500)

    const checkTicketInterval = setInterval(() => {
      document.dispatchEvent(checkTicketEvent);
    }, 1000)

    return () => {
      clearInterval(addPeopleInterval);
      clearInterval(checkTicketInterval);
    }
  }, [])

  useEffect(() => {
    const handleAddPeople = () => {
      const id = randomId.current++;
      setQueue((prevQueue) => [...prevQueue, id]);
    }

    const handleCheckTicket = () => {
      if (queue.length === 0 || list.length === MAX) return;
      setQueue((prevQueue) => {
        const item = prevQueue[0];
        setList((prevList) => [...prevList, item])
        return prevQueue.slice(1)
      })
    }

    document.addEventListener("addPeople", handleAddPeople);
    document.addEventListener("checkTicket", handleCheckTicket);

    return () => {
      document.removeEventListener("addPeople", handleAddPeople);
      document.removeEventListener("checkTicket", handleCheckTicket);
    }
  }, [queue.length, list.length])



  return (
    <div className="App">
      <h5>Render Count: {renderCount.current}</h5>
      <Counter count={queue.length} />
      <Table list={list} />
    </div>
  );
}

export default App;
