import { useEffect, useState } from 'react'
import './App.css'
import { IoCloseSharp } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
const board = [{id:1, who: false},{id:2, who: false},{id:3, who: false},{id:4, who: false},{id:5, who: false},{id:6, who: false},{id:7, who: false},{id:8, who: false},
  {id:9, who: false }];
const winningComb = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
function App() {
  const [items, setItem] = useState(board);
  const [player, setPlayer] = useState('one');
  const [score, setScore] = useState({one: 0, two: 0});
  const resetBoard = () => {
    setItem(board)
  }
  const wining = () => {
    const wining = winningComb.find(comb => {
      const [a,b,c] = comb;
      if(items[a].who === player && items[b].who === player && items[c].who === player) {
        return player;
      }
    })
    if(wining) {
     resetBoard()
      if(player === 'one') setScore({...score, one: score.one +=1})
      else setScore({...score, two: score.two +=1})
    }
    if(!wining) {
      const a = items.every(a => a.who !== false)
      if(a) resetBoard();
    }
  }
  const changeBoard = (ids) => {
    setItem(items.map(item => {
      if(item.id === ids) {
      if(item.who === 'one' || item.who === 'two') {
        return item;
       }
       else {
        if(player === 'one') {
          setPlayer('two')
          return {...item, who: player}  
        }
        else {
          setPlayer('one')
          return {...item, who: player}
        }
       }
      }
      else {
        return item;
      }
    }))
  }
  useEffect(() => {
      wining()
  },[player])
  return (
    <>
    <p>One score: {score.one}</p>
    <p>Two score: {score.two}</p>
    <button onClick={resetBoard}>Reset Board</button>
      <ul className="tick_pole">
      {/* {item && item.map(a => (
        <li></li>
      ))} */}
      {items && items.map(a => (
        <li key={a.id} onClick={(e) => changeBoard(a.id)}>{
        a.who ==='one' && <IoCloseSharp></IoCloseSharp>
        }
        {a.who === 'two' && <FaRegCircle></FaRegCircle>}</li>
      ))}
      </ul>
    </>
  )
}

export default App
