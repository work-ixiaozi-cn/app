import { useState } from 'react'
import {Box, BoxTypeMap, BoxProps, IconButton } from '@mui/material'
import {CloseOutlined, Remove, ZoomInMap, ZoomOutMap } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'



const WindowControl: OverridableComponent<BoxTypeMap<{}, "div">> = (prop: BoxProps) =>{
  const [isMaximized, setIsMaximized] = useState<boolean>(false)
  window.onresize = async () => setIsMaximized(await window.electron.inject.isMaximized())

  return (
    <Box {...prop}>
      <IconButton
        size="small"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={() => window.electron?.inject?.minimize()}
      >
        <Remove />
      </IconButton>
      {
        isMaximized 
        ? <IconButton
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={() => window.electron?.inject?.restore()}
          >
            <ZoomInMap />
          </IconButton>
        : <IconButton
            size="small"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={() => window.electron?.inject?.maximize()}
          >
            <ZoomOutMap />
          </IconButton>
      }
      <IconButton
        size="small"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <CloseOutlined />
      </IconButton>
    </Box>
  )
}

export default WindowControl