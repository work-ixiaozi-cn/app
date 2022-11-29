import {FC} from 'react'
import puppeteer from 'puppeteer-core'
import { Button } from '@mui/material'

const MainHome: FC = () => {
  return (
    <div>
      <div className="Hello">
        MainHome
        <video width={'100%'} height={'100%'}></video>
        <Button>play</Button>
      </div>
    </div>
  )
}

export default MainHome