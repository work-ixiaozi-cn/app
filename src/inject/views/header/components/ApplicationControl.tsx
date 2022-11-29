import {AppBar, Button, Container, Box, BoxTypeMap, BoxProps } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import {AbcOutlined } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'

const ApplicationControl: OverridableComponent<BoxTypeMap<{}, "div">> = (prop: BoxProps) =>(
  <Box {...prop}>
    <IconButton
      size="small"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      color="inherit"
    >
      <AbcOutlined />
    </IconButton>
  </Box>
)

export default ApplicationControl