import {useState, useEffect} from 'react'
import {AppBar, Box, Toolbar, Typography } from '@mui/material'
import WindowControl from './components/WindowControl'
import ApplicationControl from './components/ApplicationControl'
import ApplicationMenu from './components/ApplicationMenu'


const Header = () => {
  return (
    <AppBar position="fixed" sx={{ boxShadow: 'none', '-webkit-app-region': 'drag'}}>
      <Toolbar variant="dense" disableGutters sx={{ml: '5px', mr: '5px', userSelect: 'none'}}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ '-webkit-app-region': 'no-drag', userSelect: 'none' }}
        >
          MUI
        </Typography>
        <ApplicationMenu />
        <Box sx={{ flexGrow: 1}} ></Box>
        <ApplicationControl sx={{ display: 'flex', '-webkit-app-region': 'no-drag' }}/>
        <WindowControl sx={{ display: 'flex', '-webkit-app-region': 'no-drag' }}/>
      </Toolbar>
    </AppBar>
  )
}

export default Header