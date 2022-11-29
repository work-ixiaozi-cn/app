import { ChangeEvent, FC, KeyboardEventHandler, useState, KeyboardEvent, ChangeEventHandler } from "react"
import {Box, BoxTypeMap, BoxProps, IconButton, Input, TextField, Stack, Avatar, Typography } from '@mui/material'
import {CloseOutlined, Remove, ZoomInMap, Delete } from '@mui/icons-material'

const SearchHome: FC = () => {
  const [value, setValue] = useState('')
  const [width, setWidth] = useState(24)
  const valueChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent) => {
    setValue(e.target.value)
    // setWidth((document.querySelector('#abc') as HTMLDivElement).offsetWidth+24)
  }
  const keyDown: KeyboardEventHandler<HTMLInputElement> = (event: KeyboardEvent) => {
    if(event.code == "Space" || event.code == "Enter") {
      // todo search
    }
  }
  const keyUp: KeyboardEventHandler<HTMLInputElement> = (event: KeyboardEvent) => {
    // setWidth((document.querySelector('#abc') as HTMLDivElement).offsetWidth+24)
  }
  window.onmouseup = ()=>{
    (document.querySelector('#input') as HTMLInputElement).focus()
  }
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{position: 'relative', ml: 1, mr: 1}}
      >
        <Input 
          id="input" 
          value={value} 
          placeholder="Hello,world!"
          disableUnderline
          onChange={valueChange}
          onKeyDown={keyDown}
          onKeyUp={keyUp}
          spellcheck="false"
          sx={{fontSize: 24, width: '100%', position: 'absolute', zIndex: 99, maxWidth: 700,}}
        />
        <Typography
          noWrap
          component="div"
          sx={{
            // position: 'absolute',
            // top: -999,
            // left: -999,
            '-webkit-app-region': 'no-drag', 
            userSelect: 'none', 
            fontSize: 24,
            minWidth: 24,
            maxWidth: 700,
            h:0,
            color: 'rgba(0,0,0,0)',
            zIndex: 9
          }}
        >
          {value}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="stretch"
          flex={1}
          width={width}
          sx={{zIndex: 999, '-webkit-app-region': 'drag'}}
        >
          <Stack
            flex={1}
          ></Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <IconButton color="primary" sx={{'-webkit-app-region': 'no-drag'}}>
              <Avatar>H</Avatar>
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SearchHome
