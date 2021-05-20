import React, { VFC } from 'react'
import Carousel from './components/Carousel'
import logo from './logo.svg'
import './App.css'

const App: VFC = () => (
  <div className="App">
    <header className="App-header">
      <Carousel
        itemChildren={[
          <img
            alt="2分の1の魔法"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3C1GPJO8-gRmfDdcJ7T-WH_ca5X_T3960sg&usqp=CAU"
          />,
          <img
            alt="塔の上のラプンツェル"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiod0bBKdimN0TGM820omJlZ7Wd4Qcrvux6g&usqp=CAU"
          />,
          <img
            alt="わんわん物語"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufq_ErshkXwelJA9ZyXJO_fpHMBeBsn1hQw&usqp=CAU"
          />,
          <img
            alt="ディズニーキャラクター"
            src="https://media1.tokyodisneyresort.jp/images/adventure/blog/img200415_1.jpg"
          />,
          <img
            alt="シンデレラ城"
            src="https://c01.castel.jp/cover?url=https%3A%2F%2Fcastel.jp%2Fimg%2Fup%2Fpicture_78525.jpg&h=500"
          />,
          <img
            alt="冬ディズニー"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF-iuwXGcgdnKJ4ic6usnAHE24W9Q1G0gPJA&usqp=CAU"
          />,
          <img
            alt="マーメイドラグーン"
            src="https://disneyreal.asumirai.info/images/eyecatch/v1/d32.jpg"
          />,
          <img
            alt="ミキミニ"
            src="https://www.tjnet.co.jp/wp-content/uploads/2019/10/disny_photo_1021.jpg"
          />,
        ]}
      />

      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> azwnd save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
)

export default App
