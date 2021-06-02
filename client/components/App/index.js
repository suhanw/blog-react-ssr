import React from 'react'
import style from './style'

const App = () => (
    <>
        <div className={style.app}>Hello World</div>
        <button onClick={(e) => alert('Hello You!')}>Say Hello Back!</button>
    </>
)

export default App
