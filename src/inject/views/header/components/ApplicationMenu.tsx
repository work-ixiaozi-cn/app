import {AppBar, Button, Container, Box, BoxTypeMap, BoxProps, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import {CloseOutlined, Remove, ZoomOutMap } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent';

const ApplicationMenu: OverridableComponent<BoxTypeMap<{}, "div">> = (prop: BoxProps) =>(
  <Box {...prop}>
    <Button
      size="small"
      color="inherit"
      aria-label="open drawer"
      sx={{ ml: 2,'-webkit-app-region': 'no-drag' }}
      disableRipple
    >
      <Typography sx={{ ml: 2,'-webkit-app-region': 'no-drag' }}>
        xxx
      </Typography>
    </Button>
    <Button
      size="small"
      color="inherit"
      aria-label="open drawer"
      sx={{ ml: 2,'-webkit-app-region': 'no-drag' }}
      disableRipple
    >
      <Typography>
        yyy
      </Typography>
    </Button>
  </Box>
)

export default ApplicationMenu